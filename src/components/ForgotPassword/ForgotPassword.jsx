import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Lock } from "lucide-react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !newPassword || !confirmPassword) {
      setIsSuccess(false);
      setMessage("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match");
      return;
    }
    setIsSuccess(true);
    setMessage("Password has been reset successfully!");
  };

  const handleSigninClick = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  const handleBackToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-left">
        <h1 className="forgot-password-brand">Portfolio.</h1>

        <div className="forgot-password-form-container">
          <button onClick={handleSigninClick} className="back-button">
            <ArrowLeft size={20} />
            Back to Login
          </button>

          <h2 className="forgot-password-title">Forgot Password?</h2>
          <p className="forgot-password-subtitle">
            Enter your username and create a new password
          </p>

          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="forgot-password-input-group">
              <label className="forgot-password-label">Email</label>
              <div className="input-with-icon">
                <User size={20} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="forgot-password-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="forgot-password-input-group">
              <label className="forgot-password-label">New Password</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="forgot-password-input"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="forgot-password-input-group">
              <label className="forgot-password-label">Confirm New Password</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="forgot-password-input"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {message && (
              <p className={`forgot-password-message ${isSuccess ? "success" : "error"}`}>
                {message}
              </p>
            )}

            <button type="submit" className="forgot-password-button">
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <div className="forgot-password-right">
        <div className="forgot-password-right-content">
          <h2 className="forgot-password-right-title">Don't have an account?</h2>
          <p className="forgot-password-right-text">Register yourself and get started!</p>
          <button onClick={handleBackToSignUp} className="forgot-password-login-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
