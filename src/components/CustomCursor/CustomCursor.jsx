import { useEffect } from 'react';
import './CustomCursor.css'

function CustomCursor() {
  useEffect(() => {
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor_outline');
    document.body.appendChild(cursorOutline);

    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;

      const hoveredElement = document.elementFromPoint(posX, posY);

      if (hoveredElement && hoveredElement.classList) {
        if (
          hoveredElement.classList.contains('contact-btn') ||
          hoveredElement.classList.contains('close-btn') ||
          hoveredElement.classList.contains('heading')
        ) {
          cursorOutline.style.backgroundColor = 'white';
        } else {
          cursorOutline.style.backgroundColor = '#02d866';
        }
      }

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 0, fill: 'forwards' }
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cursorOutline.remove();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}

export default CustomCursor;
