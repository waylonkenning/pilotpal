# NZ Private Pilot Journey

A gamified web application that guides aspiring pilots through their Private Pilot Licence (Aeroplane) journey in New Zealand. Transform the complex 50+ hour training requirement into an engaging, milestone-based experience aligned with CAA regulations.

## Executive Summary

**NZ Private Pilot Journey** uses progressive achievement systems and visual progress tracking to make flight training more engaging. The app provides clear visual pathways from zero experience to licensed pilot, with real-time progress tracking, motivational badge systems, and cost estimation tools.

### Key Features
- 🎯 **Interactive Journey Map** - Visual timeline with training phases and milestones
- 🏆 **Achievement System** - 27 flight badges + theory mastery badges
- 📊 **Progress Tracking** - Hours logging, theory exams, document checklist
- 💰 **Cost Tracking** - Running expenses with budget comparison
- 📱 **Mobile Responsive** - Designed for use at flight schools

## Project Configuration

### Repository
- **GitHub**: https://github.com/waylonkenning/pilotpal
- **Production URL**: https://pilotpal-two.vercel.app/

### Tech Stack
```
Frontend:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form + Zod validation
- Lucide Icons

Testing & Deployment:
- Playwright (E2E testing)
- Vercel (deployment platform)
- Local Storage (data persistence)
```

## Development Workflow

This project follows a structured development workflow as defined in `CLAUDE.md`:

1. **Update todo list** - Use TodoWrite to plan and track all tasks
2. **Create e2e tests** - Write end-to-end tests for new features before implementation
3. **Code the feature** - Implement according to tests and requirements
4. **Run e2e tests locally** - Verify tests pass before committing
5. **Git commit** - Commit with descriptive messages
6. **Git push** - Push to remote repository
7. **Wait for Vercel deployment** - Allow deployment to complete
8. **Run e2e tests on deployed version** - Verify production functionality
9. **Update README** - Document new features once tested and deployed

## MVP Development Phases

### Phase 1 (MVP) - Core Journey
- [ ] Basic dashboard with progress overview
- [ ] Flight hours logging
- [ ] Journey timeline visualization
- [ ] Core achievement badges (First Flight, Solo, Licensed)
- [ ] Local storage setup

### Phase 2 - Enhanced Tracking
- [ ] All 27 lesson badges
- [ ] Theory exam tracking
- [ ] Expense tracking
- [ ] Progress statistics

### Phase 3 - Advanced Features
- [ ] Streak tracking
- [ ] Social sharing cards
- [ ] Advanced analytics
- [ ] Study resources integration

## Training Phases

The app visualizes five key training phases:

1. **Foundation Phase** (0-15 hours) - Basic aircraft control, first solo prep
2. **Circuit Phase** (15-25 hours) - Pattern work mastery, emergency procedures
3. **Navigation Phase** (25-40 hours) - Cross-country skills, weather decisions
4. **Advanced Phase** (40-50 hours) - Instrument basics, test preparation
5. **Certification Phase** - Theory exams, flight test readiness

## Achievement Categories

### 🛫 Flight Milestones (27 badges)
From First Flight to Licensed Pilot, each badge represents a real training milestone.

### 📚 Theory Mastery (6 badges)
Air Law, Navigation, Technical Knowledge, Human Factors, Meteorology, Radio Telephony.

### ⏱️ Hours Accumulation
Progressive badges at 10, 25, 50, and 100+ hours.

### ⭐ Special Achievements
Night rating, medical clearance, budget milestones, speed learning.

## Data Architecture

```typescript
interface UserProgress {
  id: string
  startDate: Date
  lastUpdated: Date
  profile: {
    name: string
    targetCompletionDate?: Date
    medicalType: 'class2' | 'dl9' | null
  }
  flightHours: {
    dual: number
    solo: number
    crossCountry: number
    total: number
  }
  theoryExams: {
    airLaw: ExamStatus
    navigation: ExamStatus
    // ... other subjects
  }
  achievements: Achievement[]
  expenses: Expense[]
}
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/waylonkenning/pilotpal.git
cd pilotpal

# Install dependencies (when Next.js setup is complete)
npm install

# Start development server
npm run dev

# Run E2E tests
npm run test:e2e
```

## Data Privacy

- All data stored client-side using localStorage
- No external API calls or user authentication required
- Export/import functionality for data backup
- Complete user control over personal data

## Contributing

Please follow the development workflow outlined in `CLAUDE.md` for all contributions. All features require E2E tests and comprehensive documentation before deployment.