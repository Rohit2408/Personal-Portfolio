import './AboutPage.css';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import TextSphere from './TextSphere.jsx';

function AboutPage() {
  return (
    <div className="about">
      <div className='story'>
        <h1 className="heading1">My Story</h1>
        <h1 className="heading2">About</h1>
        <div className="partition-container">
          <div className="partition-left">
            <p className="about-text">I am a Front-End Developer skilled in <u>React.js</u>, <u>Node.js</u>, <u>Bootstrap</u> for designing webpages. Committed to a user-friendly design and efficient development, I am a versatile developer equipped to drive digital growth.</p>
          </div>
          <div className="partition-right">
            <TextSphere />
          </div>
        </div>
      </div>
      <div className='skills'>
        <div className='card-container'>
          <div className='card-row'>
            <Card className='about-card' > 
              <CardBody>
                <div className='heading'>
                  <CardTitle>Bachelor of Computer Science and Engineering</CardTitle>
                  <img width="70" height="70" src="https://img.icons8.com/pastel-glyph/64/000000/graduation-cap--v3.png" alt="graduation-cap--v3" style={{marginLeft:'100px'}}/>
                </div> 
                <div className='body'>
                  <CardText style={{marginLeft:'-0.938rem'}}>Web Developer & Designer</CardText>
                  <CardText style={{marginLeft: '-0.938rem'}}>August 2021</CardText>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
