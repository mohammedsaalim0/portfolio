/**
 * ==========================================================================
 * SAALIM'S WORLD — CENTRAL PORTFOLIO CONFIGURATION
 * Verified Personal Information & 3D Spatial Landmarks for Mohammed Saalim
 * ==========================================================================
 */

window.SAALIM_CONFIG = {
    // 1. Personal & Contact Profile
    profile: {
        fullName: "Mohammed Saalim",
        headline: "Aspiring Full-Stack Developer | Computer Science Engineer",
        subHeadline: "Computer Science & Engineering Student, SSIT Tumakuru",
        location: "Tumakuru, Karnataka, India — 572101",
        email: "mohammedsaalimismil@gmail.com",
        phone: "+91 7975685763",
        linkjarUrl: "https://linkjar.to/149abba4/",
        
        // Education & Academics
        degree: "B.E. in Computer Science and Engineering",
        institution: "Sri Siddhartha Institute of Technology (SSIT)",
        institutionLocation: "Tumakuru, Karnataka, India",
        graduationBatch: "2027",
        cgpa: "7.44",
        cgpaNote: "Latest reported academic milestone (Batch 2027)",

        // Configurable Social / Document Placeholders (Never invent fake URLs)
        linkedinUrl: "", // Add actual LinkedIn profile URL here
        githubUrl: "",   // Add actual GitHub profile URL here
        resumeUrl: "",   // Add resume PDF file path or upload in Django admin

        // Official Fliplink Certificate Link
        certificateUrl: "https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D",
        
        // Featured Projects
        agroSenseLiveUrl: "https://agrosense-io-1.onrender.com/accounts/login/?next=/",
        agroSenseNotice: "Live demo requires authenticated credentials. Please use demo credentials if supplied or contact Mohammed Saalim."
    },

    // 2. Spatial 3D Landmarks on the Floating Island
    // Defines camera eye coordinates, target lookAt coordinates, and focal properties
    landmarks: {
        intro: {
            id: 'intro',
            label: 'Aerial Island Reveal',
            cameraPos: { x: 0, y: 75, z: 160 },
            targetPos: { x: 0, y: 15, z: 0 },
            scrollRange: [0.0, 0.10],
            timeOfDay: 'sunrise'
        },
        entranceGate: {
            id: 'gate',
            label: 'Location A: The Entrance Gate',
            cameraPos: { x: -5, y: 10, z: 75 },
            targetPos: { x: 0, y: 6, z: 45 },
            characterPos: { x: 0, y: 4, z: 50 },
            scrollRange: [0.10, 0.24],
            timeOfDay: 'morning'
        },
        developerHome: {
            id: 'home',
            label: 'Location B: Developer Home & Study',
            cameraPos: { x: -28, y: 14, z: 28 },
            targetPos: { x: -35, y: 10, z: 12 },
            characterPos: { x: -32, y: 8, z: 16 },
            scrollRange: [0.24, 0.40],
            timeOfDay: 'day'
        },
        skillsTower: {
            id: 'tower',
            label: 'Location C: The Skills Tower',
            cameraPos: { x: 18, y: 35, z: 15 },
            targetPos: { x: 0, y: 28, z: -5 },
            characterPos: { x: 2, y: 8, z: 6 },
            scrollRange: [0.40, 0.56],
            timeOfDay: 'day'
        },
        projectValley: {
            id: 'valley',
            label: 'Location D: The Project Valley',
            cameraPos: { x: 45, y: 18, z: -25 },
            targetPos: { x: 30, y: 8, z: -40 },
            characterPos: { x: 28, y: 6, z: -30 },
            scrollRange: [0.56, 0.74],
            timeOfDay: 'golden_hour'
        },
        achievementHall: {
            id: 'hall',
            label: 'Location E: The Achievement Hall',
            cameraPos: { x: -22, y: 16, z: -45 },
            targetPos: { x: -35, y: 11, z: -55 },
            characterPos: { x: -30, y: 8, z: -50 },
            scrollRange: [0.74, 0.86],
            timeOfDay: 'sunset'
        },
        contactLighthouse: {
            id: 'lighthouse',
            label: 'Location F: The Contact Lighthouse',
            cameraPos: { x: 8, y: 22, z: -90 },
            targetPos: { x: 0, y: 24, z: -115 },
            characterPos: { x: 0, y: 12, z: -100 },
            scrollRange: [0.86, 1.0],
            timeOfDay: 'twilight'
        }
    },

    // 3. Audio & Synthesis Configuration (Web Audio API)
    audio: {
        defaultMuted: true,
        masterGain: 0.35,
        windFilterFreq: 400,
        enableChimes: true
    },

    // 4. Graphics & Performance Presets
    performance: {
        high: {
            pixelRatio: Math.min(window.devicePixelRatio, 2),
            shadows: true,
            shadowMapSize: 2048,
            foliageCount: 450,
            particleCount: 150
        },
        medium: {
            pixelRatio: Math.min(window.devicePixelRatio, 1.5),
            shadows: true,
            shadowMapSize: 1024,
            foliageCount: 250,
            particleCount: 80
        },
        low: {
            pixelRatio: 1,
            shadows: false,
            shadowMapSize: 512,
            foliageCount: 100,
            particleCount: 40
        }
    }
};
