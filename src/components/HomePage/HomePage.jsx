import "./HomePage.css"
import AnimatedLetters from "../AnimatedLetters/AnimatedLetters"
import { useEffect, useState } from "react"
import { faJava, faCss3, faPython, faHtml5, faJsSquare, faReact } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HomePage = () => {
  const [letterClass, setLetterClass] = useState("text-animate")

  const nameArray = ["", "R", "o", "h", "i", "t", ","]
  const jobArray = ["w", "e", "b", " ", "d", "e", "v", "e", "l", "o", "p", "e", "r", "."]

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover")
    }, 4000)
  }, [])

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>&apos;m </span>
          <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={16} />
          <br />
          <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={23} />
        </h1>
        <h2>Front End Developer / Javascript</h2>
      </div>
      <div className="stage-cube-cont">
        <div className="cubespinner">
          <div className="face1">
            <FontAwesomeIcon icon={faJava} color="#DD0031" />
          </div>
          <div className="face2">
            <FontAwesomeIcon icon={faHtml5} color="#F06529" />
          </div>
          <div className="face3">
            <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
          </div>
          <div className="face4">
            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
          </div>
          <div className="face5">
            <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
          </div>
          <div className="face6">
            <FontAwesomeIcon icon={faPython} color="#EC4D28" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
