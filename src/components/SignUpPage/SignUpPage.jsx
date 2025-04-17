import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import toast from "react-hot-toast"
import "./SignUpPage.css"

// Export this function at the top level of the file, before the component
export const handleGoogleAuthCallback = async (session) => {
  try {
    if (!session || !session.user) {
      throw new Error("No user data found")
    }

    const user = session.user

    // Check if user with this email already exists in profiles
    const { data: existingUserData, error: existingUserError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", user.email)
      .single()

    if (existingUserError && existingUserError.code !== "PGRST116") {
      // PGRST116 means no rows returned, which is what we want
      throw existingUserError
    }

    if (existingUserData) {
      // User already exists
      toast.error("Email already exists. Please log in.")
      return { success: false, message: "Email already exists" }
    }

    // Create new profile for the user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
    })

    if (profileError) {
      throw profileError
    }

    toast.success("Signup Successful! Please login.")
    return { success: true, message: "Signup successful" }
  } catch (error) {
    console.error("Google auth callback error:", error.message)
    toast.error(error.message || "Authentication failed. Please try again.")
    return { success: false, message: error.message }
  }
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSigninClick = (e) => {
    e.preventDefault()
    navigate("/login")
  }

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/Personal-Portfolio/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }

      if (!data) {
        throw new Error("Authentication failed")
      }

      // For Google sign-up, we need to check if the user already exists
      // This will be handled in the auth callback component since we need to wait for the OAuth redirect

      // The actual email check and profile creation will happen in the AuthCallback component
      // We're just initiating the OAuth flow here
    } catch (error) {
      console.error(`${provider} login error:`, error.message)
      toast.error(error.message || `${provider} login failed. Please try again!`)
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      })

      if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.")
          navigate("/login")
          return
        } else {
          throw error
        }
      }

      const user = data.user
      const session = data.session

      if (user) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          full_name: name,
        })

        if (profileError) {
          console.error("Profile creation error:", profileError.message)
          toast.error("Failed to create profile.")
        }
      }

      if (session) {
        // User is logged in (email confirmation disabled)
        toast.success("Signup successful! You are now logged in.")
        navigate("/dashboard")
      } else {
        // Email confirmation is enabled
        toast.success("Signup successful! Please check your email to confirm.")
      }
    } catch (error) {
      console.error("Signup error:", error.message)
      toast.error(error.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container signup-container">
      <div className="header">
        <h1 className="logo">Portfolio.</h1>
      </div>

      <div className="main-content">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>

          <form className="form" onSubmit={handleSignUp}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <div className="social-section">
              <p className="social-text">Or sign up using</p>
              <div className="social-buttons">
                <button type="button" className="social-button" onClick={() => handleSocialLogin("google")}>
                  <FaGoogle size={24} />
                </button>
              </div>
            </div>
          </form>

          <div className="signin-section">
            <p className="signin-text">
              Already have an account?{" "}
              <a href="#" onClick={handleSigninClick} className="signin-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
