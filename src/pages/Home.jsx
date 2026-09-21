import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <main>

      <section className="hero">
        <div className="hero-content">

          <span className="hero-badge">
            🌱 Smart Food Rescue Platform
          </span>

          <h1 className="hero-title">
            Give Surplus Food a{" "}
            <span className="highlight">Second Chance.</span>
          </h1>

          <p className="hero-subtitle">
            Connecting surplus food with NGOs and volunteers before it goes
            to waste.
          </p>

          <div className="hero-buttons">
            <Link to="/donate" className="primary-button">
              🍲 Donate Food
            </Link>

            <Link to="/food" className="secondary-button">
              🔍 Find Donations
            </Link>
          </div>

        </div>
      </section>

      <section className="flow-animation-section">

        <h2 className="section-title">
          How FoodBridge Connects
        </h2>

        <p className="section-subtitle">
          Watch how surplus food moves from donor to those in need
        </p>

        <div className="flow-container">

          <span className="food-package">🍱</span>

          <div className="flow-step">
            <div className="flow-icon donor-icon">🏪</div>
            <span className="flow-label">Donor</span>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-step">
            <div className="flow-icon bridge-icon">🍽️</div>
            <span className="flow-label">FoodBridge</span>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-step">
            <div className="flow-icon volunteer-icon">🚴</div>
            <span className="flow-label">Volunteer</span>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-step">
            <div className="flow-icon ngo-icon">🏢</div>
            <span className="flow-label">NGO</span>
          </div>

        </div>
      </section>

      <section className="how-it-works">

        <h2 className="section-title">
          How It Works
        </h2>

        <p className="section-subtitle">
          Four simple steps to rescue surplus food
        </p>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📝</div>
            <h3>Post Surplus Food</h3>
            <p>
              Donors post details about their surplus food.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🔔</div>
            <h3>NGOs Get Notified</h3>
            <p>
              NGOs browse and accept available donations.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🚴</div>
            <h3>Volunteer Picks Up</h3>
            <p>
              Volunteers collect and deliver the food.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">😊</div>
            <h3>Lives Are Fed</h3>
            <p>
              Food reaches people who need it.
            </p>
          </div>

        </div>
      </section>

      <section className="why-section">

        <h2 className="section-title">
          Why FoodBridge?
        </h2>

        <p className="section-subtitle">
          Making food rescue simple, fast, and organized
        </p>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-card-icon">⚡</div>
            <h3>Fast Coordination</h3>
            <p>
              Connect donors with NGOs quickly.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">📊</div>
            <h3>Track Impact</h3>
            <p>
              Track food saved and meals rescued.
            </p>
          </div>

          <div className="why-card">
            <div className="why-card-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>
              Donors, NGOs, and volunteers work together.
            </p>
          </div>

        </div>
      </section>

      <section className="impact-section">

        <h2 className="section-title">
          Our Impact
        </h2>

        <p className="section-subtitle">
          Together, we are making a difference
        </p>

        <div className="impact-grid">

          <div className="impact-card">
            <div className="impact-number">1,200+</div>
            <div>Meals Rescued</div>
          </div>

          <div className="impact-card">
            <div className="impact-number">85+</div>
            <div>Active Donors</div>
          </div>

          <div className="impact-card">
            <div className="impact-number">32</div>
            <div>Partner NGOs</div>
          </div>

          <div className="impact-card">
            <div className="impact-number">150+</div>
            <div>Volunteers</div>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;