// ===================================
// ADMIN DASHBOARD JAVASCRIPT
// ===================================

// Initialize Map
let map;
let markers = [];

function initMap() {
    // Center of Northeast India (Shillong)
    map = L.map('live-map').setView([25.5788, 91.8933], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Sample tourist locations
    const touristLocations = [
        { lat: 25.5788, lng: 91.8933, name: 'John Doe', status: 'safe', id: 'TG-2024-1234' },
        { lat: 26.2006, lng: 92.9376, name: 'Sarah Smith', status: 'warning', id: 'TG-2024-5678' },
        { lat: 27.3314, lng: 88.6138, name: 'Raj Kumar', status: 'safe', id: 'TG-2024-9012' },
        { lat: 27.1004, lng: 93.6167, name: 'Lisa Chen', status: 'safe', id: 'TG-2024-3456' },
        { lat: 26.1584, lng: 91.7698, name: 'David Lee', status: 'danger', id: 'TG-2024-7890' }
    ];

    // Add markers
    touristLocations.forEach(location => {
        const markerColor = location.status === 'safe' ? 'green' : 
                           location.status === 'warning' ? 'orange' : 'red';
        
        const marker = L.circleMarker([location.lat, location.lng], {
            radius: 8,
            fillColor: markerColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        marker.bindPopup(`
            <strong>${location.name}</strong><br>
            ID: ${location.id}<br>
            Status: ${location.status.toUpperCase()}
        `);

        markers.push(marker);

        // Animate marker
        setInterval(() => {
            marker.setRadius(marker.getRadius() === 8 ? 12 : 8);
        }, 1000);
    });
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('live-map')) {
        initMap();
    }
});

// Mobile Menu Toggle
const btnMenu = document.querySelector('.btn-menu');
const sidebar = document.querySelector('.sidebar');

if (btnMenu) {
    btnMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Real-time Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update if clock element exists
    const clockElement = document.querySelector('.dashboard-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Simulated Real-time Updates
function simulateRealTimeUpdates() {
    // Update active tourists count
    const activeTourists = document.querySelector('.stat-card:nth-child(1) h3');
    if (activeTourists) {
        setInterval(() => {
            const current = parseInt(activeTourists.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(1000, current + change);
            activeTourists.textContent = newValue.toLocaleString();
        }, 5000);
    }

    // Update alert count
    const alertCount = document.querySelector('.stat-card:nth-child(2) h3');
    if (alertCount) {
        setInterval(() => {
            const current = parseInt(alertCount.textContent);
            const newValue = Math.max(0, current + (Math.random() > 0.7 ? 1 : -1));
            alertCount.textContent = newValue;
        }, 8000);
    }
}

simulateRealTimeUpdates();

// Alert Response Buttons
document.querySelectorAll('.btn-respond').forEach(btn => {
    btn.addEventListener('click', function() {
        const alertItem = this.closest('.alert-item');
        const touristId = alertItem.querySelector('p').textContent;
        
        if (confirm(`Respond to alert for ${touristId}?`)) {
            alertItem.style.opacity = '0.5';
            this.textContent = 'Responding...';
            this.disabled = true;
            
            setTimeout(() => {
                alertItem.remove();
                showNotification('Response team dispatched successfully!', 'success');
            }, 2000);
        }
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
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
`;
document.head.appendChild(style);

// Search Functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.tourists-table tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Auto-refresh data
setInterval(() => {
    console.log('Auto-refreshing dashboard data...');
    // In production, this would fetch new data from API
}, 30000); // Every 30 seconds

// Console welcome
console.log('%c🛡️ Aegis Travel Admin Dashboard', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDashboard loaded successfully', 'color: #10b981; font-size: 14px;');
