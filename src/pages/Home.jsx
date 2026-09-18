import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import "../styles/home.css";

/**
 * Home Page (Landing Page)
 *
 * Sections:
 * 1. Hero section with CTA buttons
 * 2. Animated FoodBridge concept flow (CSS keyframes)
 * 3. How It Works (4 steps)
 * 4. Featured Donations (first 3 available)
 * 5. Why FoodBridge (3 reasons)
 * 6. Impact statistics
 *
 * Props:
 * - foods: array of all food donations (to show featured ones)
 */
function Home({ foods }) {
  // Get the first 3 available donations to display as featured
  const featuredFoods = foods
    .filter((food) => food.status === "Available")
    .slice(0, 3);

  return (
    <main>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🌱 Smart Food Rescue Platform</span>
          <h1 className="hero-title">
            Give Surplus Food a{" "}
            <span className="highlight">Second Chance.</span>
          </h1>
          <p className="hero-subtitle">
            Connecting surplus food with NGOs and volunteers before it goes to
            waste. Join FoodBridge and help reduce food waste in your community.
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

      {/* ========== ANIMATED FLOW SECTION ========== */}
      {/* This section shows how FoodBridge works using a CSS animation */}
      <section className="flow-animation-section">
        <div className="container">
          <h2 className="section-title">How FoodBridge Connects</h2>
          <p className="section-subtitle">
            Watch how surplus food moves from donor to those in need
          </p>
        </div>

        <div className="flow-container">
          {/* Animated food package that moves from donor to NGO */}
          <div className="food-package" aria-hidden="true">
            🎁
          </div>

          {/* Step 1: Donor */}
          <div className="flow-step">
            <div className="flow-icon donor-icon">🏪</div>
            <span className="flow-label">Donor</span>
          </div>

          <span className="flow-arrow" aria-hidden="true">→</span>

          {/* Step 2: FoodBridge */}
          <div className="flow-step">
            <div className="flow-icon bridge-icon">🍽️</div>
            <span className="flow-label">FoodBridge</span>
          </div>

          <span className="flow-arrow" aria-hidden="true">→</span>

          {/* Step 3: Volunteer */}
          <div className="flow-step">
            <div className="flow-icon volunteer-icon">🚴</div>
            <span className="flow-label">Volunteer</span>
          </div>

          <span className="flow-arrow" aria-hidden="true">→</span>

          {/* Step 4: NGO */}
          <div className="flow-step">
            <div className="flow-icon ngo-icon">🏢</div>
            <span className="flow-label">NGO</span>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Four simple steps to rescue surplus food
          </p>
        </div>
        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📝</div>
            <h3>Post Surplus Food</h3>
            <p>
              Restaurants, hostels, or households post details about surplus
              food including type, quantity, and pickup location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🔔</div>
            <h3>NGOs Get Notified</h3>
            <p>
              Nearby NGOs and shelters can browse available donations and accept
              food that matches their needs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🚴</div>
            <h3>Volunteer Picks Up</h3>
            <p>
              Volunteers coordinate the pickup and transport the food safely
              from the donor to the NGO location.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">😊</div>
            <h3>Lives Are Fed</h3>
            <p>
              The rescued food reaches people in need. Less waste, more meals,
              stronger communities.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FEATURED DONATIONS ========== */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Donations</h2>
          <p className="section-subtitle">
            Browse recently posted surplus food available for rescue
          </p>
        </div>
        <div className="featured-grid">
          {featuredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link to="/food" className="secondary-button">
            View All Donations →
          </Link>
        </div>
      </section>

      {/* ========== WHY FOODBRIDGE ========== */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why FoodBridge?</h2>
          <p className="section-subtitle">
            Making food rescue simple, fast, and organized
          </p>
        </div>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-card-icon">⚡</div>
            <h3>Fast Coordination</h3>
            <p>
              Connect donors with NGOs instantly. No more phone calls or delayed
              responses. Post food and get it rescued quickly.
            </p>
          </div>
          <div className="why-card">
            <div className="why-card-icon">📊</div>
            <h3>Track Impact</h3>
            <p>
              See real-time statistics on meals rescued, food saved, and
              communities served through the platform dashboard.
            </p>
          </div>
          <div className="why-card">
            <div className="why-card-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>
              Built for donors, NGOs, and volunteers to work together. Everyone
              plays a role in reducing food waste.
            </p>
          </div>
        </div>
      </section>

      {/* ========== IMPACT SECTION ========== */}
      <section className="impact-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">
            Together, we are making a difference
          </p>
        </div>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-number">1,200+</div>
            <div className="impact-label">Meals Rescued</div>
          </div>
          <div className="impact-card">
            <div className="impact-number">85+</div>
            <div className="impact-label">Active Donors</div>
          </div>
          <div className="impact-card">
            <div className="impact-number">32</div>
            <div className="impact-label">Partner NGOs</div>
          </div>
          <div className="impact-card">
            <div className="impact-number">150+</div>
            <div className="impact-label">Volunteers</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
