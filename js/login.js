// ===================================
// LOGIN PAGE JAVASCRIPT
// ===================================

// Password Toggle
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Tourist Login Form
const touristLoginForm = document.getElementById('touristLoginForm');
if (touristLoginForm) {
    touristLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const touristId = document.getElementById('touristId').value;
        const password = document.getElementById('password').value;
        
        // Demo login - in production, this would be API call
        if (touristId && password) {
            showLoading('Verifying credentials...');
            
            setTimeout(() => {
                hideLoading();
                showSuccess('Login successful! Redirecting...');
                
                setTimeout(() => {
                    window.location.href = 'tourist-dashboard.html';
                }, 1500);
            }, 1500);
        }
    });
}

// Admin Login Form
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const department = document.getElementById('department').value;
        const adminId = document.getElementById('adminId').value;
        const password = document.getElementById('adminPassword').value;
        const otp = document.getElementById('otp').value;
        
        if (department && adminId && password) {
            if (!otp) {
                showError('Please enter the OTP sent to your mobile');
                return;
            }
            
            showLoading('Verifying credentials and OTP...');
            
            setTimeout(() => {
                hideLoading();
                showSuccess('Login successful! Redirecting to dashboard...');
                
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            }, 2000);
        }
    });
}

// Loading Overlay
function showLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Notification Functions
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    const bgColor = type === 'success' ? '#10b981' : 
                    type === 'error' ? '#ef4444' : 
                    '#6366f1';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .loading-content {
        background: white;
        padding: 40px 60px;
        border-radius: 16px;
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f4f6;
        border-top: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-content p {
        color: #475569;
        font-weight: 600;
        font-size: 16px;
    }
`;
document.head.appendChild(style);

// OTP Auto-fill simulation
const otpInput = document.getElementById('otp');
if (otpInput) {
    otpInput.addEventListener('focus', function() {
        // Simulate OTP received (for demo)
        setTimeout(() => {
            if (!this.value) {
                this.value = '123456';
                showSuccess('OTP received and auto-filled!');
            }
        }, 2000);
    });
}

// Biometric Login (Demo)
document.querySelectorAll('.btn-alt').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        
        if (text.includes('Biometric')) {
            showLoading('Waiting for biometric authentication...');
            setTimeout(() => {
                hideLoading();
                showError('Biometric authentication not available on this device');
            }, 2000);
        } else if (text.includes('QR')) {
            showLoading('Opening camera for QR scan...');
            setTimeout(() => {
                hideLoading();
                showError('QR scanner not available in demo mode');
            }, 2000);
        }
    });
});

console.log('%c🛡️ Aegis Travel Login', 'color: #6366f1; font-size: 18px; font-weight: bold;');
