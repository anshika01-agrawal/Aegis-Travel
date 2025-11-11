# Backend API Setup Guide
# यह file बताती है कि production में backend कैसे बनाएं

## 🔧 CURRENT STATUS
- ✅ Frontend ready (HTML, CSS, JS)
- ❌ Backend API नहीं है (currently demo mode)
- ❌ Database नहीं है (data hardcoded)
- ❌ Authentication नहीं है (any password works)

## 🚀 PRODUCTION SETUP KAISE KAREIN

### Option 1: Node.js Backend (Recommended)

#### Step 1: Install Node.js
```bash
# Check if installed
node --version
npm --version

# If not installed, download from nodejs.org
```

#### Step 2: Create Backend Folder
```bash
mkdir backend
cd backend
npm init -y
```

#### Step 3: Install Dependencies
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

#### Step 4: Create server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/aegis-travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
    adminId: String,
    name: String,
    email: String,
    password: String, // Hashed
    department: String,
    role: String,
    createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', AdminSchema);

// Tourist Schema
const TouristSchema = new mongoose.Schema({
    touristId: String,
    name: String,
    email: String,
    digitalIdHash: String,
    currentLocation: {
        lat: Number,
        lng: Number,
        timestamp: Date
    },
    safetyScore: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

const Tourist = mongoose.model('Tourist', TouristSchema);

// Alert Schema
const AlertSchema = new mongoose.Schema({
    touristId: String,
    type: String,
    severity: String,
    location: Object,
    status: String,
    timestamp: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', AlertSchema);

// ===================================
// ROUTES
// ===================================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { adminId, password, otp } = req.body;
        
        // Find admin
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Verify password
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Verify OTP (implement your OTP logic)
        // if (otp !== verifiedOTP) { return res.status(401).json... }
        
        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin.adminId, role: admin.role },
            'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            token,
            admin: {
                id: admin.adminId,
                name: admin.name,
                department: admin.department
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Tourists
app.get('/api/tourists', async (req, res) => {
    try {
        const tourists = await Tourist.find({ status: 'active' });
        res.json({ success: true, tourists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Active Alerts
app.get('/api/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find({ status: 'active' })
            .sort({ timestamp: -1 });
        res.json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Alert (Panic Button)
app.post('/api/alerts', async (req, res) => {
    try {
        const { touristId, type, location } = req.body;
        
        const alert = new Alert({
            touristId,
            type,
            severity: 'critical',
            location,
            status: 'active'
        });
        
        await alert.save();
        
        // Send notifications (implement your notification logic)
        
        res.json({ success: true, alert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Tourist Location
app.post('/api/tourists/:id/location', async (req, res) => {
    try {
        const { lat, lng } = req.body;
        
        const tourist = await Tourist.findOneAndUpdate(
            { touristId: req.params.id },
            {
                currentLocation: {
                    lat,
                    lng,
                    timestamp: new Date()
                }
            },
            { new: true }
        );
        
        res.json({ success: true, tourist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Dashboard Analytics
app.get('/api/analytics', async (req, res) => {
    try {
        const totalTourists = await Tourist.countDocuments();
        const activeTourists = await Tourist.countDocuments({ status: 'active' });
        const activeAlerts = await Alert.countDocuments({ status: 'active' });
        
        res.json({
            success: true,
            analytics: {
                totalTourists,
                activeTourists,
                activeAlerts,
                averageSafetyScore: 94.5
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```

#### Step 5: Run Server
```bash
node server.js
```

---

### Option 2: Python Backend (Alternative)

#### Create with Flask
```bash
pip install flask flask-cors pymongo bcrypt pyjwt
```

#### Create app.py
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['aegis_travel']

# Admin Login Route
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    admin_id = data.get('adminId')
    password = data.get('password')
    
    # Find admin in database
    admin = db.admins.find_one({'adminId': admin_id})
    
    if not admin:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Verify password
    if bcrypt.checkpw(password.encode('utf-8'), admin['password']):
        # Generate JWT token
        token = jwt.encode({
            'adminId': admin_id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, 'your-secret-key', algorithm='HS256')
        
        return jsonify({
            'success': True,
            'token': token,
            'admin': {
                'id': admin['adminId'],
                'name': admin['name'],
                'department': admin['department']
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

# Get Tourists
@app.route('/api/tourists', methods=['GET'])
def get_tourists():
    tourists = list(db.tourists.find({'status': 'active'}))
    # Convert ObjectId to string
    for tourist in tourists:
        tourist['_id'] = str(tourist['_id'])
    return jsonify({'success': True, 'tourists': tourists})

# Run Server
if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## 📊 DATABASE SETUP

### MongoDB (Recommended)

#### Install MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Download from mongodb.com
```

#### Create Database & Collections
```javascript
use aegis_travel

db.createCollection('admins')
db.createCollection('tourists')
db.createCollection('alerts')
db.createCollection('efirs')

// Insert sample admin
db.admins.insertOne({
    adminId: 'ADM-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@tourism.gov.in',
    password: '$2a$10$hashed_password_here',
    department: 'tourism',
    role: 'admin',
    createdAt: new Date()
})
```

### PostgreSQL (Alternative)

```sql
-- Create Database
CREATE DATABASE aegis_travel;

-- Create Tables
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    admin_id VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    department VARCHAR(50),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tourists (
    id SERIAL PRIMARY KEY,
    tourist_id VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    email VARCHAR(100),
    digital_id_hash VARCHAR(255),
    safety_score INTEGER,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    tourist_id VARCHAR(50),
    alert_type VARCHAR(50),
    severity VARCHAR(20),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 AUTHENTICATION SETUP

### Hash Password Example
```javascript
// Node.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

// Usage
const hashedPassword = await hashPassword('admin123');
```

### Verify Password
```javascript
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

---

## 🌐 BLOCKCHAIN INTEGRATION

### Ethereum Smart Contract (for Digital IDs)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TouristIdentity {
    struct Tourist {
        string touristId;
        string name;
        string nationality;
        uint256 registrationDate;
        uint256 validUntil;
        bool isActive;
    }
    
    mapping(address => Tourist) public tourists;
    
    function registerTourist(
        string memory _touristId,
        string memory _name,
        string memory _nationality,
        uint256 _validUntil
    ) public {
        tourists[msg.sender] = Tourist({
            touristId: _touristId,
            name: _name,
            nationality: _nationality,
            registrationDate: block.timestamp,
            validUntil: _validUntil,
            isActive: true
        });
    }
}
```

---

## 📱 CONNECT FRONTEND TO BACKEND

### Update login.js to use API
```javascript
// Replace demo login with real API call
fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        adminId: adminId,
        password: password,
        otp: otp
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        // Store token
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        
        // Redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        showError(data.error);
    }
})
.catch(error => {
    showError('Connection failed: ' + error.message);
});
```

---

## 🚀 DEPLOYMENT

### Deploy Backend
- **Heroku**: Free tier available
- **AWS**: EC2 or Lambda
- **DigitalOcean**: Droplets
- **Railway.app**: Modern deployment

### Deploy Database
- **MongoDB Atlas**: Free cloud MongoDB
- **AWS RDS**: For PostgreSQL
- **Supabase**: Free PostgreSQL with API

---

## 📝 QUICK START FOR PRODUCTION

1. **Choose your stack**: Node.js + MongoDB (easiest)
2. **Install dependencies**: `npm install`
3. **Setup database**: MongoDB Atlas (free)
4. **Create .env file**:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
```
5. **Update frontend**: Connect to API endpoints
6. **Deploy**: Heroku (backend) + GitHub Pages (frontend)

---

## ❓ NEED HELP?

Bataiye kaunsa option choose karna hai:
1. Node.js backend setup?
2. Python Flask setup?
3. Complete production deployment?
4. Blockchain integration?

Main step-by-step help karunga! 😊
