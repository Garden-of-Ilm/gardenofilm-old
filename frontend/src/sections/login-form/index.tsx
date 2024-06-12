import React, { useState } from "react";
import LoginFormStyles from "./login-form.module.css";
import { ErrorInfoIcon } from "@/icons";
import { useAuthContext } from "@/guard/AuthContext";

export default function LoginForm() {
  const { login, error } = useAuthContext();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(formValues.email, formValues.password);
  };

  return (
    <div className={LoginFormStyles.login}>
      <form className={LoginFormStyles.loginForm} onSubmit={handleSubmit}>
        <p>Admin login</p>

        <input
          placeholder="Enter your email..."
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />

        <input
          placeholder="Enter your admin password..."
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
        />

        <button
          disabled={!formValues.email || !formValues.password}
          type="submit"
        >
          <span>Login</span>
        </button>
      </form>

      {error && (
        <div className={LoginFormStyles.loginAlert}>
          <ErrorInfoIcon />
          {error}
        </div>
      )}
    </div>
  );
}
