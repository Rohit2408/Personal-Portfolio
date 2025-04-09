import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import ParticleAnimation from './components/ParticleCanvas/ParticleCanvas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/Personal-Portfolio'>
    <App />
    <ParticleAnimation />
  </BrowserRouter>,
)
