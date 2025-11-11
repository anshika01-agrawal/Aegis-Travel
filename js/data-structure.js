// ===================================
// DATA STORAGE - SAMPLE STRUCTURE
// यह file दिखाती है कि production में data कैसे store होगा
// ===================================

// ===================================
// 1. ADMIN DATA STRUCTURE
// ===================================

const admins = [
    {
        id: 'ADM-001',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@tourism.gov.in',
        phone: '+91-9876543210',
        department: 'tourism',
        designation: 'Tourism Officer',
        badgeNumber: 'TO-2024-001',
        password: 'hashed_password_here', // Production में encrypted hoga
        role: 'admin',
        permissions: ['view_tourists', 'manage_alerts', 'generate_reports'],
        twoFactorEnabled: true,
        registeredOn: '2024-01-15',
        lastLogin: '2024-11-11 09:30:00',
        status: 'active'
    },
    {
        id: 'ADM-002',
        name: 'Priya Sharma',
        email: 'priya.sharma@police.gov.in',
        phone: '+91-9876543211',
        department: 'police',
        designation: 'DSP',
        badgeNumber: 'PL-2024-045',
        password: 'hashed_password_here',
        role: 'police_admin',
        permissions: ['view_tourists', 'manage_alerts', 'generate_efir', 'emergency_response'],
        twoFactorEnabled: true,
        registeredOn: '2024-02-01',
        lastLogin: '2024-11-11 10:15:00',
        status: 'active'
    },
    {
        id: 'ADM-003',
        name: 'Amit Patel',
        email: 'amit.patel@emergency.gov.in',
        phone: '+91-9876543212',
        department: 'emergency',
        designation: 'Emergency Coordinator',
        badgeNumber: 'EM-2024-012',
        password: 'hashed_password_here',
        role: 'emergency_admin',
        permissions: ['view_tourists', 'emergency_response', 'coordinate_rescue'],
        twoFactorEnabled: true,
        registeredOn: '2024-03-10',
        lastLogin: '2024-11-10 18:45:00',
        status: 'active'
    }
];

// ===================================
// 2. TOURIST DATA STRUCTURE
// ===================================

const tourists = [
    {
        id: 'TG-2024-1234',
        digitalIdHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Blockchain address
        name: 'John Doe',
        age: 28,
        gender: 'Male',
        nationality: 'USA',
        passport: 'US123456789',
        email: 'john.doe@email.com',
        phone: '+1-555-0123',
        emergencyContact: {
            name: 'Jane Doe',
            relation: 'Wife',
            phone: '+1-555-0124'
        },
        currentLocation: {
            lat: 25.5788,
            lng: 91.8933,
            address: 'Shillong, Meghalaya',
            timestamp: '2024-11-11 10:30:00'
        },
        itinerary: [
            { destination: 'Shillong', startDate: '2024-11-10', endDate: '2024-11-12' },
            { destination: 'Kaziranga', startDate: '2024-11-13', endDate: '2024-11-15' }
        ],
        safetyScore: 98,
        trackingEnabled: true,
        deviceInfo: {
            deviceId: 'DEV-001',
            batteryLevel: 85,
            lastSync: '2024-11-11 10:30:00'
        },
        registeredAt: 'Guwahati International Airport',
        registrationDate: '2024-11-10 14:30:00',
        validUntil: '2024-11-16 23:59:59',
        status: 'active'
    },
    {
        id: 'TG-2024-5678',
        digitalIdHash: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        name: 'Sarah Smith',
        age: 32,
        gender: 'Female',
        nationality: 'UK',
        passport: 'GB987654321',
        email: 'sarah.smith@email.com',
        phone: '+44-7700-900123',
        emergencyContact: {
            name: 'Michael Smith',
            relation: 'Husband',
            phone: '+44-7700-900124'
        },
        currentLocation: {
            lat: 26.2006,
            lng: 92.9376,
            address: 'Kaziranga National Park, Assam',
            timestamp: '2024-11-11 10:25:00'
        },
        itinerary: [
            { destination: 'Kaziranga', startDate: '2024-11-09', endDate: '2024-11-13' }
        ],
        safetyScore: 75,
        trackingEnabled: true,
        deviceInfo: {
            deviceId: 'DEV-002',
            batteryLevel: 45,
            lastSync: '2024-11-11 10:25:00'
        },
        registeredAt: 'Hotel Infinity, Kaziranga',
        registrationDate: '2024-11-09 16:00:00',
        validUntil: '2024-11-13 23:59:59',
        status: 'alert' // Geo-fence violation
    },
    {
        id: 'TG-2024-9012',
        digitalIdHash: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        name: 'Raj Kumar',
        age: 45,
        gender: 'Male',
        nationality: 'India',
        aadhaar: 'XXXX-XXXX-1234',
        email: 'raj.kumar@email.com',
        phone: '+91-9876543213',
        emergencyContact: {
            name: 'Sunita Kumar',
            relation: 'Wife',
            phone: '+91-9876543214'
        },
        currentLocation: {
            lat: 27.3314,
            lng: 88.6138,
            address: 'Tawang, Arunachal Pradesh',
            timestamp: '2024-11-11 10:15:00'
        },
        itinerary: [
            { destination: 'Tawang', startDate: '2024-11-08', endDate: '2024-11-14' }
        ],
        safetyScore: 92,
        trackingEnabled: true,
        deviceInfo: {
            deviceId: 'DEV-003',
            batteryLevel: 70,
            lastSync: '2024-11-11 10:15:00'
        },
        registeredAt: 'Tezpur Check Post',
        registrationDate: '2024-11-08 11:00:00',
        validUntil: '2024-11-14 23:59:59',
        status: 'active'
    }
];

// ===================================
// 3. ALERTS DATA STRUCTURE
// ===================================

const alerts = [
    {
        id: 'ALT-001',
        touristId: 'TG-2024-1234',
        touristName: 'John Doe',
        type: 'panic_button',
        severity: 'critical',
        location: {
            lat: 25.5788,
            lng: 91.8933,
            address: 'Dense Forest Area, Near Shillong'
        },
        timestamp: '2024-11-11 10:28:00',
        description: 'Panic button activated by tourist',
        status: 'active',
        assignedTo: 'ADM-002', // Priya Sharma (Police)
        responseTime: null,
        resolution: null
    },
    {
        id: 'ALT-002',
        touristId: 'TG-2024-5678',
        touristName: 'Sarah Smith',
        type: 'geofence_violation',
        severity: 'high',
        location: {
            lat: 26.2006,
            lng: 92.9376,
            address: 'Restricted Zone, Kaziranga'
        },
        timestamp: '2024-11-11 10:25:00',
        description: 'Tourist entered high-risk restricted zone',
        status: 'active',
        assignedTo: 'ADM-001',
        responseTime: null,
        resolution: null
    },
    {
        id: 'ALT-003',
        touristId: 'TG-2024-9012',
        touristName: 'Raj Kumar',
        type: 'inactivity',
        severity: 'medium',
        location: {
            lat: 27.3314,
            lng: 88.6138,
            address: 'Last known: Tawang Monastery'
        },
        timestamp: '2024-11-11 10:15:00',
        description: 'No movement detected for 2 hours',
        status: 'active',
        assignedTo: 'ADM-003',
        responseTime: null,
        resolution: null
    }
];

// ===================================
// 4. E-FIR DATA STRUCTURE
// ===================================

const efirs = [
    {
        firNumber: 'FIR-2024-001',
        touristId: 'TG-2024-1234',
        touristName: 'John Doe',
        incidentType: 'missing_person',
        filedBy: 'ADM-002',
        filedDate: '2024-11-10 18:30:00',
        location: 'Shillong, Meghalaya',
        description: 'Tourist reported missing after trekking expedition',
        status: 'resolved',
        resolution: 'Tourist found safe. Was lost in forest for 4 hours.',
        resolvedDate: '2024-11-10 22:45:00',
        evidence: [
            'GPS tracking data',
            'Last known location photos',
            'Communication logs'
        ]
    }
];

// ===================================
// 5. ANALYTICS DATA STRUCTURE
// ===================================

const analytics = {
    totalTourists: 1234,
    activeTourists: 1156,
    totalAlerts: 850,
    activeAlerts: 12,
    averageSafetyScore: 94.5,
    averageResponseTime: 1.8, // minutes
    successRate: 99.8, // percentage
    
    touristsByLocation: [
        { location: 'Shillong', count: 350 },
        { location: 'Kaziranga', count: 285 },
        { location: 'Tawang', count: 220 },
        { location: 'Gangtok', count: 180 },
        { location: 'Cherrapunji', count: 125 }
    ],
    
    alertsByType: [
        { type: 'geofence_violation', count: 8 },
        { type: 'panic_button', count: 3 },
        { type: 'inactivity', count: 5 },
        { type: 'route_deviation', count: 4 },
        { type: 'low_battery', count: 2 }
    ],
    
    responsePerformance: {
        avgResponseTime: 1.8,
        resolutionRate: 99.2,
        uptime: 99.9
    }
};

// ===================================
// 6. SYSTEM CONFIGURATION
// ===================================

const systemConfig = {
    geofenceZones: [
        {
            id: 'GZ-001',
            name: 'Kaziranga Restricted Area',
            type: 'high_risk',
            coordinates: [
                { lat: 26.2006, lng: 92.9376 },
                { lat: 26.2100, lng: 92.9400 },
                { lat: 26.2050, lng: 92.9500 }
            ],
            alertLevel: 'critical'
        },
        {
            id: 'GZ-002',
            name: 'Dense Forest Zone',
            type: 'medium_risk',
            coordinates: [
                { lat: 25.5700, lng: 91.8800 },
                { lat: 25.5800, lng: 91.8900 }
            ],
            alertLevel: 'high'
        }
    ],
    
    safetyThresholds: {
        inactivityMinutes: 120,
        lowBatteryPercent: 20,
        deviationMeters: 500,
        criticalResponseTime: 5 // minutes
    }
};

// ===================================
// EXPORT (for use in other files)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        admins,
        tourists,
        alerts,
        efirs,
        analytics,
        systemConfig
    };
}
