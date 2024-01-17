import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css'; 

function ContactPage() {
  const [showContact, setShowContact] = useState(true);
  const navigate = useNavigate();    

  const handleClose = () => {
    setShowContact(false);
    setTimeout(() => {
        navigate('/');
    }, 2)
  };

  return (
    <div className={`contact-page ${showContact ? 'show' : ''}`}>
      <div className={`content ${showContact ? 'slide-down' : ''}`}>
        <h1>Let&apos;s Talk</h1>
        <p>mondalrohit4033@gmail.com</p>
        <div className='contact-button'>
            <a href='https://www.linkedin.com/in/rohit-mondal-6b55581b7/' target='__blank'>
                <button>
                    LinkedIn
                </button>
            </a>
            <a href='https://github.com/Rohit2408' target='__blank'>
                <button>GitHub</button>
            </a>
        </div>
        <button className="close-btn" onClick={handleClose}>
          <h3>Close</h3>
        </button>
      </div>
    </div>
  );
}

export default ContactPage;
