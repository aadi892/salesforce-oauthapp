import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth/login`;
  };

  return (
    <div className="login-container">
      <p>Login with your Salesforce account to continue.</p>
      <button onClick={handleLogin} className="login-button">
        Login with Salesforce
      </button>
    </div>
  );
};

export default Login;
