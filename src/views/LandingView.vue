<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="text-gradient">From Couch to Cockpit</span>
              <br>Your Complete PPL Journey
            </h1>
            <p class="hero-subtitle">
              Track your Private Pilot License training with New Zealand's most comprehensive 
              flight training companion. Built for aspiring pilots and flight schools.
            </p>
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-number">27</div>
                <div class="stat-label">Progressive Lessons</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">Flight Hours Tracked</div>
              </div>
              <div class="stat">
                <div class="stat-number">6</div>
                <div class="stat-label">Theory Exams</div>
              </div>
            </div>
            <div class="hero-actions">
              <router-link to="/home" class="btn btn-primary btn-lg">
                🚀 Start Your Journey
              </router-link>
              <button @click="scrollToDemo" class="btn btn-secondary btn-lg">
                📺 See How It Works
              </button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="phone-mockup">
              <div class="phone-screen">
                <div class="screen-content">
                  <div class="demo-card">
                    <div class="demo-header">
                      <div class="demo-icon">✈️</div>
                      <div>
                        <div class="demo-title">Today's Focus</div>
                        <div class="demo-subtitle">Lesson 3: Taxi Operations</div>
                      </div>
                    </div>
                    <div class="demo-progress">
                      <div class="progress-bar-demo"></div>
                    </div>
                    <div class="demo-stats">
                      <div class="demo-stat">
                        <div class="demo-stat-number">12.5</div>
                        <div class="demo-stat-label">Hours</div>
                      </div>
                      <div class="demo-stat">
                        <div class="demo-stat-number">$3,240</div>
                        <div class="demo-stat-label">Spent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For Pilots Section -->
    <section class="features-section" id="for-pilots">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Perfect for Aspiring Pilots</h2>
          <p class="section-subtitle">Everything you need to stay organized and motivated throughout your PPL journey</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🗺️</div>
            <h3 class="feature-title">Structured Learning Path</h3>
            <p class="feature-description">
              Follow our proven 27-lesson curriculum designed specifically for New Zealand CAA Part 61 requirements. 
              No more guessing what comes next.
            </p>
            <ul class="feature-list">
              <li>✓ Progressive lesson structure</li>
              <li>✓ Clear preparation guidelines</li>
              <li>✓ Pre-solo to test preparation</li>
            </ul>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3 class="feature-title">Complete Progress Tracking</h3>
            <p class="feature-description">
              Monitor every aspect of your training with detailed flight hour logging, 
              theory exam progress, and achievement tracking.
            </p>
            <ul class="feature-list">
              <li>✓ Flight hours by type (dual, solo, XC)</li>
              <li>✓ Special skills (night, instrument)</li>
              <li>✓ Theory exam management</li>
            </ul>
          </div>

          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3 class="feature-title">Smart Budget Management</h3>
            <p class="feature-description">
              Keep your training costs under control with detailed expense tracking, 
              budget planning, and spending insights.
            </p>
            <ul class="feature-list">
              <li>✓ Real-time cost tracking</li>
              <li>✓ Budget vs actual analysis</li>
              <li>✓ Category breakdown</li>
            </ul>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">Training Phase Guidance</h3>
            <p class="feature-description">
              Always know what phase you're in and what to focus on next with our 
              intelligent training phase detection system.
            </p>
            <ul class="feature-list">
              <li>✓ Dynamic phase detection</li>
              <li>✓ Focus area guidance</li>
              <li>✓ Progress visualization</li>
            </ul>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3 class="feature-title">Regulatory Compliance</h3>
            <p class="feature-description">
              Stay on top of NZ-specific requirements including medical certificates, 
              theory exams, and minimum flight hours.
            </p>
            <ul class="feature-list">
              <li>✓ Medical certificate tracking</li>
              <li>✓ CAA Part 61 compliance</li>
              <li>✓ DL9 option support</li>
            </ul>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3 class="feature-title">Achievement System</h3>
            <p class="feature-description">
              Stay motivated with achievement badges that celebrate your milestones 
              from first flight to license completion.
            </p>
            <ul class="feature-list">
              <li>✓ First flight badges</li>
              <li>✓ Solo milestone rewards</li>
              <li>✓ Theory master achievements</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- For Flight Schools Section -->
    <section class="schools-section">
      <div class="container">
        <div class="schools-content">
          <div class="schools-text">
            <h2 class="section-title">Designed for Flight Schools</h2>
            <p class="section-subtitle">
              Help your students stay organized and engaged while reducing administrative overhead
            </p>
            
            <div class="school-benefits">
              <div class="benefit">
                <div class="benefit-icon">👥</div>
                <div class="benefit-content">
                  <h4>Student Engagement</h4>
                  <p>Keep students motivated with clear progress tracking and achievement rewards</p>
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">📈</div>
                <div class="benefit-content">
                  <h4>Structured Curriculum</h4>
                  <p>Pre-built lesson structure aligned with CAA Part 61 requirements</p>
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">💼</div>
                <div class="benefit-content">
                  <h4>Reduced Admin</h4>
                  <p>Students track their own progress, reducing instructor administrative work</p>
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🎯</div>
                <div class="benefit-content">
                  <h4>Better Outcomes</h4>
                  <p>Organized students complete training faster with fewer gaps or delays</p>
                </div>
              </div>
            </div>
            
            <div class="school-actions">
              <button class="btn btn-primary btn-lg">
                📞 Contact for School Licensing
              </button>
              <button class="btn btn-secondary btn-lg">
                📊 View Demo Dashboard
              </button>
            </div>
          </div>
          
          <div class="schools-visual">
            <div class="dashboard-preview">
              <div class="preview-header">
                <div class="preview-title">Flight School Dashboard</div>
                <div class="preview-badge">Coming Soon</div>
              </div>
              <div class="preview-content">
                <div class="preview-metric">
                  <div class="metric-label">Active Students</div>
                  <div class="metric-value">48</div>
                </div>
                <div class="preview-metric">
                  <div class="metric-label">Completion Rate</div>
                  <div class="metric-value">94%</div>
                </div>
                <div class="preview-metric">
                  <div class="metric-label">Avg. Time to PPL</div>
                  <div class="metric-value">8.2 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="demo-section" id="demo">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">See PPL Quest in Action</h2>
          <p class="section-subtitle">Follow along as we walk through the key features</p>
        </div>
        
        <div class="demo-showcase">
          <div class="demo-tabs">
            <button 
              v-for="tab in demoTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="demo-tab"
              :class="{ active: activeTab === tab.id }">
              {{ tab.icon }} {{ tab.name }}
            </button>
          </div>
          
          <div class="demo-content">
            <div v-if="activeTab === 'progress'" class="demo-panel">
              <h3>Track Your Complete Journey</h3>
              <p>Monitor flight hours, lessons completed, and training phases in real-time.</p>
              <div class="demo-image">
                <div class="mock-interface">
                  <div class="interface-header">Journey Progress</div>
                  <div class="interface-body">
                    <div class="progress-item">
                      <span>Pre-Solo Training</span>
                      <div class="progress-bar"><div class="progress-fill" style="width: 75%"></div></div>
                    </div>
                    <div class="progress-item">
                      <span>Flight Hours: 8.5 / 50</span>
                      <div class="progress-bar"><div class="progress-fill" style="width: 17%"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="activeTab === 'logging'" class="demo-panel">
              <h3>Comprehensive Flight Logging</h3>
              <p>Log every detail of your flights including costs, hours, and special conditions.</p>
              <div class="demo-image">
                <div class="mock-interface">
                  <div class="interface-header">Complete Lesson</div>
                  <div class="interface-body">
                    <div class="form-group">
                      <label>Flight Time: 1.5 hours</label>
                      <label>Type: Dual Instruction</label>
                    </div>
                    <div class="form-group">
                      <label>Total Cost: $445.00</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="activeTab === 'budget'" class="demo-panel">
              <h3>Smart Budget Management</h3>
              <p>Keep training costs under control with detailed expense tracking and budget analysis.</p>
              <div class="demo-image">
                <div class="mock-interface">
                  <div class="interface-header">Financial Overview</div>
                  <div class="interface-body">
                    <div class="budget-stat">Spent: $8,450</div>
                    <div class="budget-stat">Budget: $30,000</div>
                    <div class="budget-stat">Remaining: $21,550</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Start Your Pilot Journey?</h2>
          <p class="cta-subtitle">
            Join hundreds of New Zealand pilots who are using PPL Quest to achieve their flying dreams
          </p>
          <div class="cta-actions">
            <router-link to="/home" class="btn btn-primary btn-xl">
              🛫 Start Free Today
            </router-link>
            <p class="cta-note">No signup required • Works on any device • 100% Free</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>PPL Quest NZ</h4>
            <p>Your complete companion for Private Pilot License training in New Zealand.</p>
          </div>
          <div class="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#for-pilots">For Pilots</a></li>
              <li><a href="#demo">Demo</a></li>
              <li>Flight Schools</li>
              <li>Progress Tracking</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>CAA Part 61 Info</li>
              <li>Flight School Directory</li>
              <li>Theory Exam Guide</li>
              <li>Medical Certificate</li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Feedback</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 PPL Quest NZ. Built for the New Zealand aviation community.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Demo tab state
const activeTab = ref('progress')
const demoTabs = [
  { id: 'progress', name: 'Progress Tracking', icon: '📊' },
  { id: 'logging', name: 'Flight Logging', icon: '✈️' },
  { id: 'budget', name: 'Budget Management', icon: '💰' }
]

// Smooth scroll to demo section
const scrollToDemo = () => {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--gradient-primary), var(--gradient-secondary));
  color: white;
  padding: 80px 0 120px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.text-gradient {
  background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 40px;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fbbf24;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 4px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Phone Mockup */
.phone-mockup {
  max-width: 300px;
  margin: 0 auto;
  position: relative;
}

.phone-screen {
  background: #000;
  border-radius: 32px;
  padding: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.screen-content {
  background: var(--bg-primary);
  border-radius: 24px;
  padding: 24px 16px;
  min-height: 400px;
}

.demo-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 20px;
  border: var(--glass-border);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.demo-icon {
  font-size: 24px;
}

.demo-title {
  font-weight: 600;
  color: var(--text-primary);
}

.demo-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.demo-progress {
  margin-bottom: 16px;
}

.progress-bar-demo {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.progress-bar-demo::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 65%;
  background: var(--gradient-primary);
  border-radius: 3px;
}

.demo-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.demo-stat {
  text-align: center;
}

.demo-stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.demo-stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Features Section */
.features-section {
  padding: 120px 0;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.feature-card {
  background: var(--bg-primary);
  border: var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 24px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.feature-description {
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-size: 0.875rem;
}

/* Schools Section */
.schools-section {
  padding: 120px 0;
  background: var(--bg-primary);
}

.schools-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.school-benefits {
  margin: 40px 0;
}

.benefit {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.benefit-content h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.benefit-content p {
  color: var(--text-secondary);
  line-height: 1.5;
}

.school-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.dashboard-preview {
  background: var(--bg-secondary);
  border: var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.preview-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 24px;
}

.preview-title {
  font-weight: 600;
  color: var(--text-primary);
}

.preview-badge {
  background: var(--gradient-primary);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.preview-content {
  display: grid;
  gap: 16px;
}

.preview-metric {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: 8px;
}

.metric-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Demo Section */
.demo-section {
  padding: 120px 0;
  background: var(--bg-secondary);
}

.demo-showcase {
  max-width: 800px;
  margin: 0 auto;
}

.demo-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  justify-content: center;
}

.demo-tab {
  padding: 12px 24px;
  border: var(--glass-border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.demo-tab.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
}

.demo-panel {
  text-align: center;
}

.demo-panel h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.demo-panel p {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.mock-interface {
  background: var(--bg-primary);
  border: var(--glass-border);
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
}

.interface-header {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: var(--glass-border);
}

.interface-body {
  display: grid;
  gap: 16px;
}

.progress-item {
  display: flex;
  justify-content: between;
  align-items: center;
  gap: 16px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.budget-stat {
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-primary);
}

/* CTA Section */
.cta-section {
  padding: 120px 0;
  background: linear-gradient(135deg, var(--gradient-primary), var(--gradient-secondary));
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-note {
  margin-top: 16px;
  opacity: 0.8;
  font-size: 0.875rem;
}

/* Footer */
.landing-footer {
  background: var(--bg-tertiary);
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  border-top: var(--glass-border);
  padding-top: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .schools-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .school-actions {
    flex-direction: column;
  }
  
  .demo-tabs {
    flex-direction: column;
    align-items: stretch;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.btn-xl {
  padding: 16px 32px;
  font-size: 1.125rem;
}
</style>