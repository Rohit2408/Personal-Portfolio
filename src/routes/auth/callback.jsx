import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import toast from "react-hot-toast"
import { handleGoogleAuthCallback } from "../../components/SignUpPage/SignUpPage"

const AuthCallback = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!session) {
          throw new Error("No session found")
        }

        // Check if this is a new user (sign up) or existing user (sign in)
        const { data: existingUser } = await supabase.from("profiles").select("id").eq("id", session.user.id).single()

        if (!existingUser) {
          // This is a new user signing up with Google
          const result = await handleGoogleAuthCallback(session)

          if (result.success) {
            // Successful sign up
            navigate("/login")
          } else {
            // Failed sign up (likely email already exists)
            navigate("/login")
          }
        } else {
          // This is an existing user signing in
          toast.success("Login successful!")
          navigate("/dashboard")
        }
      } catch (error) {
        console.error("Auth callback error:", error.message)
        toast.error(error.message || "Authentication failed. Please try again.")
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div
      className="auth-callback-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <div
        className="auth-callback-content"
        style={{
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <h2>Processing your authentication...</h2>
        {loading && (
          <div
            className="loading-spinner"
            style={{
              margin: "20px auto",
              width: "50px",
              height: "50px",
              border: "5px solid rgba(255, 255, 255, 0.1)",
              borderTopColor: "#02d688",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        )}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default AuthCallback
