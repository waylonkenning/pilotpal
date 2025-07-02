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

## ✨ Implemented Features

### 🎮 **"Couch to PPL" Gamified System** ✅
- **Linear Lesson Progression** - 27 structured lessons that must be completed in order (like Couch to 5K)
- **12 Achievement Badges** - First Flight, Controls Master, Circuit Master, Solo Wings, etc.
- **Celebration Modals** - Duolingo-style celebrations for lesson completion and badge unlocks
- **Progress Visualization** - Clear tracking of lessons completed (X of 27) with progress bars

### 📊 **Comprehensive Flight Tracking** ✅
- **Flight Hours Logging** - Track dual, solo, cross-country, instrument, terrain awareness, night hours
- **Lesson Completion System** - Log hours, costs, and notes for each lesson
- **50-Hour Requirements** - Automatic tracking toward PPL minimums
- **Financial Tracking** - Running total of training costs with cost-per-hour calculations

### 🏆 **Achievement Badge System** ✅
- **4 Categories**: Foundation, Skills, Knowledge, Special badges
- **Real-time Unlocking** - Badges unlock automatically when requirements are met
- **Badge Gallery** - Dedicated achievements page with earned/locked status
- **Achievement Celebrations** - Animated modals when badges are unlocked

### 📚 **Theory Exam Management** ✅
- **Six NZ Subjects** - Air Law, Navigation, Technical Knowledge, Human Factors, Meteorology, Radio Telephony
- **Pass Tracking** - 70% minimum pass threshold with attempt history
- **Retest Policy** - Up to 3 attempts within 3 months tracking
- **Exam Details** - Subject coverage, study recommendations, format information

### 🏥 **Medical Certificate System** ✅
- **Class 2 vs DL9 Comparison** - Cost comparison ($420-$1070 vs Save $300-$800)
- **Certificate Tracking** - Issue date, expiry date, validity status
- **Solo Flight Unlocking** - Medical certificate unlocks solo progression
- **NZ-Specific Options** - Driver License medical pathway

### 📋 **Regulatory Compliance Tracking** ✅
- **Fit and Proper Person** - Section 80 CAA Act 2023 compliance tracking
- **Medical Requirements** - Required before solo flight with expiry tracking
- **Theory Requirements** - All 6 subjects must be passed for license
- **Upcoming Requirements** - Dashboard alerts for next regulatory steps

### 🗺️ **NZ-Specific Features** ✅
- **Terrain Awareness Training** - 5-hour NZ mountain flying requirement
- **Optional Night Flying** - Separate 5-hour endorsement tracking
- **CAA Part 61 Compliance** - Built around NZ regulations
- **Cost-Effective Pathways** - DL9 medical option highlighted

### 📚 **Educational Content System** ✅
- **Comprehensive Education Center** - Dedicated `/education` page with complete PPL pathway overview
- **Contextual Help System** - Help buttons and panels throughout all major views
- **Regulatory Guidance** - CAA Part 61 requirements, medical certificate options (Class 2 vs DL9)
- **Theory Exam Guide** - All 6 subjects explained with study resources and exam format details
- **Flight Hours Education** - NZ-specific requirements including terrain awareness and controlled airspace
- **Flight Test Preparation** - FPP guidance with oral exam, practical test, and document requirements
- **Cost & Timeline Information** - Comprehensive cost breakdowns and training timeline estimates
- **Study Resources** - Official CAA links, regulatory documents, and recommended reading
- **School Selection Guide** - Criteria for choosing flight schools and questions to ask

### 📈 **Advanced Progress Visualization** ✅
- **Interactive Journey Timeline** - Phase completion with hover tooltips and milestone tracking
- **Visual Progress Charts** - Circular progress wheels for flight hours and achievements
- **Lesson Completion Map** - 27 interactive lesson nodes with visual completion status
- **Budget vs Spending Charts** - Real-time financial tracking with category breakdowns
- **Requirements Status Grid** - Visual indicators for medical, theory, and regulatory compliance

### 👤 **User Profile Management** ✅ NEW!
- **Comprehensive Profile System** - Personal information, contact details, emergency contacts
- **Training Preferences** - Preferred training days, pace selection, flight school preferences
- **CAA MyAviation Integration** - Connect official CAA account for automatic compliance sync
- **Data Persistence** - Profile information saved locally with cross-session reliability
- **Emergency Contact Management** - Required contacts for flight training safety compliance
- **Mobile-Responsive Forms** - Touch-friendly profile management on all devices

## 🚧 Remaining Low-Priority Features

- **Setback Handling** - Lesson repetition and theory exam retakes
- **Motivational Content** - Streak tracking and encouragement system

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
├── views/                    # Main application pages
│   ├── HomeView.vue         # ✅ Welcome & onboarding flow
│   ├── DashboardView.vue    # ✅ Main pilot dashboard with "Today's Focus"
│   ├── AchievementsView.vue # ✅ Badge gallery with categories
│   ├── RequirementsView.vue # ✅ Regulatory compliance tracking
│   ├── TheoryExamsView.vue  # ✅ Theory exam management
│   ├── JourneyView.vue      # ✅ Training phases visualization
│   ├── FinancialView.vue    # ✅ Budget and expense tracking
│   ├── EducationCenterView.vue # ✅ Educational content and resources
│   └── UserProfileView.vue  # ✅ User profile and CAA integration
├── types/                   # ✅ Complete TypeScript definitions
│   └── index.ts            # User progress, achievements, theory exams
├── router/                  # ✅ Vue Router configuration
│   └── index.ts            # All routes including new requirement pages
├── assets/styles/           # ✅ Mobile-first CSS design system
│   └── main.css            # Aviation-themed utilities and modal styling
└── e2e/                    # ✅ Comprehensive end-to-end tests
    ├── couch-to-ppl.spec.ts      # Core journey functionality (17 tests)
    ├── achievement-system.spec.ts # Badge system testing (8 tests)
    └── regulatory-tracking.spec.ts # Requirements compliance (15 tests)
```

### 🧪 Testing Coverage
- **64 E2E Tests** covering complete user journeys
- **Production Validated** - All core features tested on live deployment
- **Test-Driven Development** following CLAUDE.md workflow

## 🎯 Target Users

- **Student Pilots** beginning their PPL journey in New Zealand
- **Training Organizations** seeking progress tracking tools
- **Flight Instructors** monitoring student advancement
- **Aviation Enthusiasts** exploring pilot training requirements

## 🌟 Unique Value Proposition

Unlike generic flight training apps, PPL Quest NZ is specifically designed for New Zealand's regulatory environment, incorporating DL9 medical pathways, optional night flying, mandatory terrain awareness training, and the comprehensive 27-lesson progressive syllabus required by CAA Part 61.

## 📈 Development Status

**Current Phase**: Core MVP Complete ✅

### ✅ Completed (Deployed & Production Tested)
- **User Onboarding Flow** - "Couch to PPL" concept introduction
- **Linear Lesson Progression** - 27-lesson structured path with completion tracking
- **Achievement Badge System** - 12 badges across 4 categories with celebrations
- **Flight Hours Tracking** - Complete logging system for all hour types
- **Regulatory Requirements** - Medical certificates, FPP, theory exams
- **Theory Exam Management** - All 6 NZ subjects with attempt tracking
- **Dashboard Integration** - "Today's Focus" lesson display with navigation
- **Mobile-Responsive Design** - Works seamlessly on all device sizes

### 🚧 Next Sprint Priorities
1. **Enhanced Financial Tracking** - Detailed budgeting and expense categorization
2. **Progress Visualization** - Interactive charts and milestone timelines  
3. **Educational Content** - Regulatory explanations and study resources

### 🏗️ Technical Foundation
- **Vue 3 + TypeScript** - Modern, type-safe development
- **Test-Driven Development** - 64 E2E tests ensuring quality
- **Production Ready** - Deployed on Vercel with CI/CD pipeline
- **CLAUDE.md Workflow** - Structured development process followed

## 🛠️ Development & Testing

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server
```

### Testing & Validation
```bash
# Individual test types
npm run test:type   # TypeScript type checking (catches build errors)
npm run lint        # ESLint code quality checks  
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests

# Combined validation (matches Vercel build)
npm run test:build  # TypeScript + Build verification
npm run test:all    # Complete test suite

# Pre-commit validation
./scripts/pre-commit-check.sh  # Run before committing
```

### CLAUDE.md Workflow
This project follows a strict development workflow documented in `CLAUDE.md`:
1. Plan tasks with TodoWrite
2. Create E2E tests first (TDD approach)
3. Implement features to pass tests
4. **Run comprehensive local validation** (prevents Vercel build failures)
5. Commit with descriptive messages
6. Verify production deployment
7. Update documentation

### CI/CD Pipeline
- **GitHub Actions** - Automated testing on every push
- **TypeScript Checking** - Catches type errors before deployment  
- **ESLint Validation** - Enforces code quality standards
- **E2E Testing** - Verifies functionality across browsers
- **Vercel Deployment** - Automatic production deployments

## 🤝 Contributing

Built with modern web technologies following Vue 3 best practices, TypeScript standards, and mobile-first responsive design principles. All contributions must pass the comprehensive test suite including TypeScript validation, ESLint checks, unit tests, and E2E tests.