// ===================================
// LOCAL STORAGE DATA MANAGER
// Browser की localStorage में data store करने के लिए
// (Simple demo - Production में database use करें)
// ===================================

class DataManager {
    constructor() {
        this.initializeData();
    }

    // Initialize default data if not exists
    initializeData() {
        if (!localStorage.getItem('aegis_admins')) {
            this.setAdmins(this.getDefaultAdmins());
        }
        if (!localStorage.getItem('aegis_tourists')) {
            this.setTourists(this.getDefaultTourists());
        }
        if (!localStorage.getItem('aegis_alerts')) {
            this.setAlerts(this.getDefaultAlerts());
        }
    }

    // ===================================
    // DEFAULT DATA
    // ===================================

    getDefaultAdmins() {
        return [
            {
                id: 'ADM-001',
                adminId: 'admin001',
                password: 'admin123', // Plain text for demo - Production में hashed hoga
                name: 'Rajesh Kumar',
                email: 'rajesh.kumar@tourism.gov.in',
                phone: '+91-9876543210',
                department: 'tourism',
                designation: 'Tourism Officer',
                role: 'admin',
                lastLogin: null,
                createdAt: '2024-01-15'
            },
            {
                id: 'ADM-002',
                adminId: 'police001',
                password: 'police123',
                name: 'Priya Sharma',
                email: 'priya.sharma@police.gov.in',
                phone: '+91-9876543211',
                department: 'police',
                designation: 'DSP',
                role: 'police_admin',
                lastLogin: null,
                createdAt: '2024-02-01'
            }
        ];
    }

    getDefaultTourists() {
        return [
            {
                id: 'TG-2024-1234',
                name: 'John Doe',
                email: 'john.doe@email.com',
                phone: '+1-555-0123',
                nationality: 'USA',
                currentLocation: { lat: 25.5788, lng: 91.8933, address: 'Shillong' },
                safetyScore: 98,
                status: 'active',
                registeredAt: '2024-11-10 14:30:00'
            },
            {
                id: 'TG-2024-5678',
                name: 'Sarah Smith',
                email: 'sarah.smith@email.com',
                phone: '+44-7700-900123',
                nationality: 'UK',
                currentLocation: { lat: 26.2006, lng: 92.9376, address: 'Kaziranga' },
                safetyScore: 75,
                status: 'alert',
                registeredAt: '2024-11-09 16:00:00'
            }
        ];
    }

    getDefaultAlerts() {
        return [
            {
                id: 'ALT-001',
                touristId: 'TG-2024-1234',
                touristName: 'John Doe',
                type: 'panic_button',
                severity: 'critical',
                timestamp: new Date().toISOString(),
                status: 'active'
            },
            {
                id: 'ALT-002',
                touristId: 'TG-2024-5678',
                touristName: 'Sarah Smith',
                type: 'geofence_violation',
                severity: 'high',
                timestamp: new Date().toISOString(),
                status: 'active'
            }
        ];
    }

    // ===================================
    // ADMIN OPERATIONS
    // ===================================

    getAdmins() {
        return JSON.parse(localStorage.getItem('aegis_admins') || '[]');
    }

    setAdmins(admins) {
        localStorage.setItem('aegis_admins', JSON.stringify(admins));
    }

    validateAdmin(adminId, password) {
        const admins = this.getAdmins();
        return admins.find(admin => 
            admin.adminId === adminId && admin.password === password
        );
    }

    updateAdminLastLogin(adminId) {
        const admins = this.getAdmins();
        const admin = admins.find(a => a.adminId === adminId);
        if (admin) {
            admin.lastLogin = new Date().toISOString();
            this.setAdmins(admins);
        }
    }

    // ===================================
    // TOURIST OPERATIONS
    // ===================================

    getTourists() {
        return JSON.parse(localStorage.getItem('aegis_tourists') || '[]');
    }

    setTourists(tourists) {
        localStorage.setItem('aegis_tourists', JSON.stringify(tourists));
    }

    getTouristById(id) {
        const tourists = this.getTourists();
        return tourists.find(t => t.id === id);
    }

    updateTouristLocation(touristId, lat, lng, address) {
        const tourists = this.getTourists();
        const tourist = tourists.find(t => t.id === touristId);
        if (tourist) {
            tourist.currentLocation = { lat, lng, address };
            this.setTourists(tourists);
        }
    }

    // ===================================
    // ALERT OPERATIONS
    // ===================================

    getAlerts() {
        return JSON.parse(localStorage.getItem('aegis_alerts') || '[]');
    }

    setAlerts(alerts) {
        localStorage.setItem('aegis_alerts', JSON.stringify(alerts));
    }

    addAlert(alert) {
        const alerts = this.getAlerts();
        alerts.unshift(alert); // Add to beginning
        this.setAlerts(alerts);
    }

    getActiveAlerts() {
        return this.getAlerts().filter(a => a.status === 'active');
    }

    resolveAlert(alertId) {
        const alerts = this.getAlerts();
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'resolved';
            alert.resolvedAt = new Date().toISOString();
            this.setAlerts(alerts);
        }
    }

    // ===================================
    // ANALYTICS
    // ===================================

    getAnalytics() {
        const tourists = this.getTourists();
        const alerts = this.getAlerts();

        return {
            totalTourists: tourists.length,
            activeTourists: tourists.filter(t => t.status === 'active').length,
            totalAlerts: alerts.length,
            activeAlerts: alerts.filter(a => a.status === 'active').length,
            averageSafetyScore: this.calculateAverageSafetyScore(tourists)
        };
    }

    calculateAverageSafetyScore(tourists) {
        if (tourists.length === 0) return 0;
        const sum = tourists.reduce((acc, t) => acc + t.safetyScore, 0);
        return (sum / tourists.length).toFixed(1);
    }

    // ===================================
    // SESSION MANAGEMENT
    // ===================================

    setCurrentAdmin(admin) {
        localStorage.setItem('current_admin', JSON.stringify(admin));
    }

    getCurrentAdmin() {
        const admin = localStorage.getItem('current_admin');
        return admin ? JSON.parse(admin) : null;
    }

    logout() {
        localStorage.removeItem('current_admin');
    }

    isLoggedIn() {
        return this.getCurrentAdmin() !== null;
    }

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    clearAllData() {
        localStorage.removeItem('aegis_admins');
        localStorage.removeItem('aegis_tourists');
        localStorage.removeItem('aegis_alerts');
        localStorage.removeItem('current_admin');
    }

    resetToDefaults() {
        this.clearAllData();
        this.initializeData();
    }

    exportData() {
        return {
            admins: this.getAdmins(),
            tourists: this.getTourists(),
            alerts: this.getAlerts()
        };
    }

    importData(data) {
        if (data.admins) this.setAdmins(data.admins);
        if (data.tourists) this.setTourists(data.tourists);
        if (data.alerts) this.setAlerts(data.alerts);
    }
}

// Create global instance
const dataManager = new DataManager();

// Make it available globally
window.dataManager = dataManager;

// ===================================
// USAGE EXAMPLES
// ===================================

/*
// Login validation
const admin = dataManager.validateAdmin('admin001', 'admin123');
if (admin) {
    dataManager.setCurrentAdmin(admin);
    dataManager.updateAdminLastLogin(admin.adminId);
    console.log('Login successful!');
}

// Get tourists
const tourists = dataManager.getTourists();
console.log('All tourists:', tourists);

// Get active alerts
const activeAlerts = dataManager.getActiveAlerts();
console.log('Active alerts:', activeAlerts);

// Get analytics
const analytics = dataManager.getAnalytics();
console.log('Analytics:', analytics);

// Update tourist location
dataManager.updateTouristLocation('TG-2024-1234', 25.5800, 91.8950, 'New Location');

// Add new alert
dataManager.addAlert({
    id: 'ALT-' + Date.now(),
    touristId: 'TG-2024-1234',
    touristName: 'John Doe',
    type: 'low_battery',
    severity: 'low',
    timestamp: new Date().toISOString(),
    status: 'active'
});

// Resolve alert
dataManager.resolveAlert('ALT-001');

// Check if logged in
if (dataManager.isLoggedIn()) {
    const currentAdmin = dataManager.getCurrentAdmin();
    console.log('Current admin:', currentAdmin);
}

// Export all data
const allData = dataManager.exportData();
console.log('Exported data:', allData);

// Reset to defaults
dataManager.resetToDefaults();
*/

console.log('✅ DataManager initialized - Use window.dataManager to access');
console.log('📊 Demo admin credentials:');
console.log('   Admin ID: admin001, Password: admin123');
console.log('   Admin ID: police001, Password: police123');
