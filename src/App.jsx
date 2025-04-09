import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/NavBar/Navbar"
import BarLoader from "react-spinners/BarLoader"
import ParticleAnimation from "./components/ParticleCanvas/ParticleCanvas"
import CustomCursor from "./components/CustomCursor/CustomCursor"
import SignUpPage from "./components/SignUpPage/SignUpPage"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import LoginPage from "./components/LoginPage/loginPage"
import AuthCallback from "./routes/auth/callback"
import Home from "./routes/Home"
import About from "./routes/About"
import Project from "./routes/Project"
import Contact from "./routes/Contact"

function App() {
  const [loading, setLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = windowWidth < 768
  const authRoutes = ["/", "/signup", "/forgot-password", "/auth/callback"]

  return (
    <div className={`App ${isLoggedIn ? "authenticated-page" : ""}`}>
      <Toaster position="top-center" />
      {loading ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <BarLoader
            color="#02d688"
            loading={loading}
            height={4}
            width={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {isLoggedIn && <Navbar />}
          {!loading && !authRoutes.includes(location.pathname) && (
                <div className="particle-wrapper">
                    <ParticleAnimation />
                </div>
            )}
          <div className="content-container">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/" element={<LoginPage onLogin={setIsLoggedIn} />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/project" element={<Project />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
            {!isMobile && isLoggedIn && <CustomCursor />}
          </div>
        </>
      )}
    </div>
  )
}

export default App
