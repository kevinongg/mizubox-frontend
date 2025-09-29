import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const HomePage = () => {
  const { token } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to Mizubox</h1>
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
  );
};
export default HomePage;
