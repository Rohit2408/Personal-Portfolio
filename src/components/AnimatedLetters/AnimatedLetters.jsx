import PropTypes from 'prop-types'
import './AnimatedLetters.scss'

const AnimatedLetters = ({ letterClass, strArray, idx }) => {

  return (
    <span>
      {strArray.map((char, i) => (
        <span key={char + i} className={`${letterClass} _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  )
}

AnimatedLetters.propTypes = {
    letterClass: PropTypes.string.isRequired,
    strArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    idx: PropTypes.number.isRequired,
  };
  

export default AnimatedLetters