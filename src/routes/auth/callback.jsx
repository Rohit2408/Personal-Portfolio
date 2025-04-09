"use client"

// Create this file at src/pages/auth/callback.jsx or wherever your routing system expects it
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()

      if (error) {
        console.error("Error during auth callback:", error.message)
        navigate("/login")
      } else {
        // Successfully authenticated
        navigate("/dashboard")
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your authentication.</p>
      </div>
    </div>
  )
}

export default AuthCallback
