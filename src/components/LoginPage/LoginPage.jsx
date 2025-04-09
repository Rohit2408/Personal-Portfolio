import { useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import toast from "react-hot-toast"
import { supabase } from "../../lib/supabase"
import "./LoginPage.css"

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      onLogin(true)
      navigate("/dashboard")
    } catch (err) {
      console.error("Error logging in:", err)
      setError("Invalid email or password")
      toast.error("Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUpClick = () => {
    navigate("/signup")
  }

  const handleGoogleLogin = async() => {
    try {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/Personal-Portfolio/auth/callback`,
            },
        })
        if(error) {
            toast.error("Google login failed!")
            console.error("OAuth error: ", error)
        }
        else {
            const { data: session } = await supabase.auth.getSession()
        }
        if(session) {
            onLogin(true)
            navigate("/dashboard")
        }
    }
    catch (err) {
        toast.error("Unexpected error during google login!")
        console.error(err);
    }
  }


  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <h1 className="login-brand">Portfolio.</h1>

        <div className="login-form-container">
          <h2 className="login-title">Log In</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label className="login-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="login-input-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              type="submit"
              className="login-button login-button-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login Now"}
            </button>

            <button type="button" className="login-button login-button-google" onClick={handleGoogleLogin}>
              <FaGoogle size={20} />
              <span>Login with Google</span>
            </button>

            <p className="login-forgot">
              Forgot Password?{" "}
              <button onClick={handleForgotPassword} className="forgot-password-link">
                Click here
              </button>
            </p>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="login-right-content">
          <h2 className="login-right-title">Start Your Portfolio</h2>
          <p className="login-right-text">Your journey begins here!</p>
          <button onClick={handleSignUpClick} className="login-signup-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
