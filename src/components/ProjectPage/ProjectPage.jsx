import CardComponent from './CardComponent';
import './ProjectPage.css';

function ProjectPage() {
  return (
    <div className='project'>
      <div className='heading'>
        <h1>Recent Work</h1>
      </div>
      <CardComponent />
    </div>
  );
}

export default ProjectPage;
