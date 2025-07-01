# PPL Quest NZ 🛩️

A comprehensive gamified web application to guide aspiring pilots through the complete journey to obtaining their Private Pilot License (PPL) in New Zealand. Built specifically for NZ's unique regulatory framework including DL9 medical options, optional night flying, and specialized mountain terrain training.

## 🎯 Mission

Transform the complex 50-hour PPL(A) training program into an engaging, trackable adventure with clear milestones, cost management, and NZ-specific regulatory guidance. Total investment: NZ$25,000-35,000 over 12-24 months.

## 🚀 Tech Stack

- **Vue 3** - Composition API with reactive state management
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning-fast development and optimized production builds
- **Custom CSS** - Mobile-first design system with aviation theming
- **Pinia** - State management for user progress and achievements

## ✨ Core Features

### 🎮 **Gamified Progress System**
- **27 Progressive Lessons** tracked through 5 distinct training phases
- **12 Achievement Badges** including First Flight, Solo Wings, Mountain Flyer
- **Experience Points** for completed lessons, theory exams, and milestones
- **Leaderboards** for training organizations and peer comparison

### 📊 **Comprehensive Flight Tracking**
- **50-Hour Breakdown**: 15h dual, 15h solo, 10h cross-country, 5h instrument, 5h terrain awareness
- **Lesson Progression** through structured syllabus with instructor endorsements
- **Solo Flight Management** with route endorsements and weather approval
- **Cross-Country Planning** with navigation and flight planning tools

### 🏆 **Achievement System**
- **Foundation Phase**: First Flight, Controls Master, Radio Operator, Pattern Pilot
- **Circuit Phase**: Solo Wings, Emergency Ace, Precision Pilot
- **Navigation Phase**: Navigator Bronze/Silver/Gold, Weather Master
- **Advanced Phase**: Mountain Flyer, Instrument Pilot, Test Ready
- **Certification**: Licensed Pilot, Currency Maintainer

### 📚 **Theory Exam Management**
- **Six Subjects**: Air Law, Navigation, Technical Knowledge, Human Factors, Meteorology, Radio
- **ASPEQ Integration** for practice tests and exam booking
- **Progress Tracking** with 70% pass threshold monitoring
- **Retest Management** with three-attempt policy tracking

### 💰 **Financial Planning**
- **Cost Breakdown**: Training fees, medical certificates, theory exams, flight testing
- **DL9 vs Class 2 Medical** cost comparison (save NZ$300-800)
- **Student Loan Integration** for eligible NZ$35,000 funding
- **Budget Tracking** with expense categories and forecasting

### 🏥 **Medical Certificate Management**
- **Class 2 Medical** full privileges tracking with validity periods
- **DL9 Medical** streamlined process with passenger endorsement requirements
- **Renewal Reminders** based on age-specific validity (5yr/2yr/1yr)
- **CAA MyAviation Integration** for digital submissions

### 📋 **Regulatory Compliance**
- **Fit and Proper Person** assessment guidance and tracking
- **CAA 1373 Logbook** requirements with electronic logbook preparation
- **Student Documentation** management including endorsements
- **BFR Currency** tracking for ongoing compliance

### 🗺️ **NZ-Specific Features**
- **Mountain Flying Training** emphasis with low-level operations below 500ft AGL
- **Terrain Awareness** specialized for NZ's challenging geography
- **Optional Night Flying** with separate 5-hour endorsement tracking
- **TTMRA Benefits** for Australia license conversion
- **Weather Dependencies** planning for NZ conditions

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run type checking
npm run build

# Lint and format code
npm run lint && npm run format
```

## 📁 Project Architecture

```
src/
├── components/           # Reusable Vue components
│   ├── achievements/     # Badge and milestone components
│   ├── flight-tracking/  # Hours logging and progress
│   ├── theory/          # Exam management components
│   ├── medical/         # Certificate tracking
│   └── shared/          # Common UI components
├── views/               # Page-level route components
│   ├── Dashboard.vue    # Main pilot dashboard
│   ├── Journey.vue      # Training phases visualization
│   ├── Theory.vue       # Exam preparation and tracking
│   ├── Medical.vue      # Certificate management
│   └── Finances.vue     # Cost tracking and planning
├── stores/              # Pinia state management
│   ├── user.ts         # User profile and progress
│   ├── flights.ts      # Flight hours and lessons
│   ├── achievements.ts # Badge and milestone system
│   └── finances.ts     # Cost tracking
├── types/               # TypeScript definitions
├── utils/               # Helper functions and constants
└── assets/styles/       # CSS design system
```

## 🎯 Target Users

- **Student Pilots** beginning their PPL journey in New Zealand
- **Training Organizations** seeking progress tracking tools
- **Flight Instructors** monitoring student advancement
- **Aviation Enthusiasts** exploring pilot training requirements

## 🌟 Unique Value Proposition

Unlike generic flight training apps, PPL Quest NZ is specifically designed for New Zealand's regulatory environment, incorporating DL9 medical pathways, optional night flying, mandatory terrain awareness training, and the comprehensive 27-lesson progressive syllabus required by CAA Part 61.

## 📈 Development Roadmap

Currently in active development with Vue 3 foundation complete. See project todos for detailed feature implementation timeline.

## 🤝 Contributing

Built with modern web technologies following Vue 3 best practices, TypeScript standards, and mobile-first responsive design principles.