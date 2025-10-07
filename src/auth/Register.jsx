import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ name, email, password });
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={onRegister}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        {error && <output>{error}</output>}
        <button>Register</button>
      </form>
      <Link to="/login" className="login-link">Already have an account? Log in here.</Link>
    </>
  );
}
