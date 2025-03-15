# SafeRoutes Database Schema

## Collections

### users
- id: string (auto-generated)
- email: string
- displayName: string (optional)
- createdAt: timestamp
- lastLogin: timestamp

### crimeReports
- id: string (auto-generated)
- userId: string (reference to users, optional for anonymous)
- location: {
    lat: number,
    lng: number
  }
- address: string
- title: string
- description: string
- category: string (enum: theft, assault, vandalism, etc.)
- severity: number (1-5)
- timestamp: timestamp
- reportedAt: timestamp
- isAnonymous: boolean
- status: string (pending, approved, rejected)

### safeRoutes
- id: string (auto-generated)
- userId: string (reference to users)
- startLocation: {
    lat: number,
    lng: number,
    address: string
  }
- endLocation: {
    lat: number,
    lng: number,
    address: string
  }
- waypoints: array of {
    lat: number,
    lng: number
  }
- distance: number
- duration: number
- safetyScore: number
- createdAt: timestamp

### crimeStats
- id: string (auto-generated)
- gridId: string (represents a geographic area)
- crimeCount: number
- reportCount: number
- lastUpdated: timestamp
- categories: {
    theft: number,
    assault: number,
    vandalism: number,
    other: number
  }
- timeDistribution: {
    morning: number,
    afternoon: number,
    evening: number,
    night: number
  }