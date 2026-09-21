import "../styles/about.css";

function About() {
  return (
    <main className="about-page">
      <div className="about-container">

        <div className="page-header">
          <h1>About FoodBridge</h1>
          <p>Smart Food Rescue & Distribution Platform</p>
        </div>

        <section className="about-section">
          <h2>🚨 The Problem</h2>

          <p>
            Restaurants, hostels, events, and households generate surplus
            edible food, while many NGOs and communities need food.
          </p>

          <p>
            Without proper coordination, food gets wasted and pickups become
            difficult to manage.
          </p>
        </section>

        <section className="about-section">
          <h2>💡 The Solution</h2>

          <p>
            <strong>FoodBridge</strong> connects food donors with NGOs and
            volunteers.
          </p>

          <p>
            Donors post food, NGOs accept it, and volunteers help with pickup
            and delivery.
          </p>
        </section>

        <section className="about-section">
          <h2>👥 Who Uses FoodBridge?</h2>

          <div className="users-grid">

            <div className="user-card">
              <div className="user-card-icon">🏪</div>
              <h3>Donors</h3>
              <p>People and organizations with extra food.</p>
            </div>

            <div className="user-card">
              <div className="user-card-icon">🏢</div>
              <h3>NGOs</h3>
              <p>Organizations that distribute food to people in need.</p>
            </div>

            <div className="user-card">
              <div className="user-card-icon">🚴</div>
              <h3>Volunteers</h3>
              <p>People who help collect and deliver food.</p>
            </div>

            <div className="user-card">
              <div className="user-card-icon">⚙️</div>
              <h3>Admin</h3>
              <p>People who manage the platform and donations.</p>
            </div>

          </div>
        </section>

        <section className="about-section">
          <h2>🏗️ How It Works</h2>

          <div className="architecture-diagram">
            <h3>System Flow</h3>

            <div className="arch-flow">

              <div className="arch-box">
                <div className="arch-box-icon">🏪</div>
                <div>Donor</div>
              </div>

              <span>→</span>

              <div className="arch-box">
                <div className="arch-box-icon">🍽️</div>
                <div>FoodBridge</div>
              </div>

              <span>→</span>

              <div className="arch-box">
                <div className="arch-box-icon">🚴</div>
                <div>Volunteer</div>
              </div>

              <span>→</span>

              <div className="arch-box">
                <div className="arch-box-icon">🏢</div>
                <div>NGO</div>
              </div>

            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🛠️ Technology Used</h2>

          <p>FoodBridge uses:</p>

          <div className="tech-list">
            <span className="tech-tag">HTML5</span>
            <span className="tech-tag">CSS3</span>
            <span className="tech-tag">JavaScript</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">React Router</span>
            <span className="tech-tag">localStorage</span>
          </div>
        </section>

        <section className="about-section">
          <h2>🔮 Future Scope</h2>

          <p>Future features could include:</p>

          <ul>
            <li>Real-time GPS tracking</li>
            <li>NGO verification</li>
            <li>Push notifications</li>
            <li>AI-based food expiry prediction</li>
            <li>Backend and database</li>
            <li>Mobile application</li>
          </ul>
        </section>

        <section className="about-section">
          <div className="team-info">
            <h3>FoodBridge</h3>
            <p>Reducing Food Waste, Feeding Lives.</p>
          </div>
        </section>

      </div>
    </main>
  );
}

export default About;