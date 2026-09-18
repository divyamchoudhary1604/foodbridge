import "../styles/about.css";

/**
 * About Page
 *
 * Explains the FoodBridge platform:
 * - The problem (food waste)
 * - The solution (FoodBridge)
 * - Target users (Donors, NGOs, Volunteers, Admin)
 * - Technology stack
 * - Simple architecture diagram using CSS cards
 * - Team information
 */
function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        {/* Page Header */}
        <div className="page-header">
          <h1>About FoodBridge</h1>
          <p>Smart Food Rescue & Distribution Platform</p>
        </div>

        {/* ========== The Problem ========== */}
        <section className="about-section">
          <h2>🚨 The Problem</h2>
          <p>
            Every day, restaurants, college hostels, event organizers, and
            households generate large amounts of surplus edible food. At the
            same time, countless NGOs, shelters, and communities struggle to
            provide meals to those in need.
          </p>
          <p>
            The lack of an organized digital system results in delayed pickups,
            food going to waste, poor coordination between donors and receivers,
            and difficulty in tracking donations. This is a solvable problem.
          </p>
        </section>

        {/* ========== The Solution ========== */}
        <section className="about-section">
          <h2>💡 The Solution</h2>
          <p>
            <strong>FoodBridge</strong> is a web-based platform that connects
            surplus food donors directly with NGOs and volunteers. Donors post
            details about available food, NGOs browse and accept donations, and
            volunteers coordinate the pickup and delivery.
          </p>
          <p>
            The platform provides a simple, organized way to rescue food before
            it goes to waste — reducing hunger and environmental impact at the
            same time.
          </p>
        </section>

        {/* ========== Target Users ========== */}
        <section className="about-section">
          <h2>👥 Who Uses FoodBridge?</h2>
          <div className="users-grid">
            <div className="user-card">
              <div className="user-card-icon">🏪</div>
              <h3>Donors</h3>
              <p>
                Restaurants, hostels, event organizers, and households with
                surplus food to share.
              </p>
            </div>
            <div className="user-card">
              <div className="user-card-icon">🏢</div>
              <h3>NGOs</h3>
              <p>
                Shelters, orphanages, and community kitchens that need food
                for distribution.
              </p>
            </div>
            <div className="user-card">
              <div className="user-card-icon">🚴</div>
              <h3>Volunteers</h3>
              <p>
                Individuals who help pick up and deliver rescued food from
                donors to NGOs.
              </p>
            </div>
            <div className="user-card">
              <div className="user-card-icon">⚙️</div>
              <h3>Admin</h3>
              <p>
                Platform administrators who monitor activity, manage
                donations, and track platform health.
              </p>
            </div>
          </div>
        </section>

        {/* ========== Architecture Diagram ========== */}
        <section className="about-section">
          <h2>🏗️ How It Works – Architecture</h2>
          <div className="architecture-diagram">
            <h3>System Flow</h3>
            <div className="arch-flow">
              <div className="arch-box">
                <div className="arch-box-icon">🏪</div>
                <div className="arch-box-label">Donor</div>
              </div>
              <span className="arch-arrow">→</span>
              <div className="arch-box">
                <div className="arch-box-icon">🍽️</div>
                <div className="arch-box-label">FoodBridge</div>
              </div>
              <span className="arch-arrow">→</span>
              <div className="arch-box">
                <div className="arch-box-icon">🚴</div>
                <div className="arch-box-label">Volunteer</div>
              </div>
              <span className="arch-arrow">→</span>
              <div className="arch-box">
                <div className="arch-box-icon">🏢</div>
                <div className="arch-box-label">NGO</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== Technology Stack ========== */}
        <section className="about-section">
          <h2>🛠️ Technology Used</h2>
          <p>
            FoodBridge is built as a frontend prototype using modern web
            technologies:
          </p>
          <div className="tech-list">
            <span className="tech-tag">HTML5</span>
            <span className="tech-tag">CSS3</span>
            <span className="tech-tag">JavaScript ES6+</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">React Router</span>
            <span className="tech-tag">localStorage</span>
          </div>
        </section>

        {/* ========== Future Scope ========== */}
        <section className="about-section">
          <h2>🔮 Future Scope</h2>
          <p>
            In future versions, FoodBridge could include:
          </p>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              Real-time GPS tracking for pickups
            </li>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              NGO verification system
            </li>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              Push notifications for nearby donations
            </li>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              AI-based food expiry prediction
            </li>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              Backend server with database integration
            </li>
            <li style={{ marginBottom: "8px", color: "var(--medium-text)" }}>
              Mobile application for on-the-go volunteers
            </li>
          </ul>
        </section>

        {/* ========== Team Information ========== */}
        <section className="about-section">
          <div className="team-info">
            <h3>FoodBridge</h3>
            <p>
              "Reducing Food Waste, Feeding Lives."
            </p>
            <p>
              3rd Semester – Frontend Engineering Project
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
