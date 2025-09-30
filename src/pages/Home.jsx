
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className=" hero-section">
        <h1>Welcome to Mizubox</h1>
        <img 
        src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBqbng0cnYxMXY5bDd2M3RlNG9uaXYxaWx4NjkxdWF6eGI1M28wdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NVMeGBYDhyo/giphy.gif" alt="Sushi prepration" 
        className="hero-gif" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">FRESS SUSHI <br/>DELIVERED</h1>
            <p className="hero-subtitle">Experience the art of Omakase at home <br/>Try it with<br/>
              $0 Delivery Fee.
              </p>
              <button className="hero-button" onClick={() => navigate('/omakase-box')}>Order Now</button>
            <p className="hero-disclaimer">
              *First-time customers only. $15 min/$200 max order. Valid for a limited time
            </p>
          </div>
        </div>
      </div>

     
      <div className="home-container">
      
      <p>
        Your personalized Omakase box experience, crafted from the freshest
        ingredients
      </p>

      {!token ? (
        <p>
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/register">create an account</Link> to get started
        </p>
      ) : (
        <p>
          Head over to your <Link to="/orders">Dashboard</Link> to see your
          orders
        </p>
      )}
    </div>
    </div>
  );
};

export default HomePage;
