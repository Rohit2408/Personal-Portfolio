import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CardComponent.css';

function CardComponent() {
    return (
        <div className='cards'>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    alt="flappy bird"
                    height="140"
                    image="https://www.wired.com/images_blogs/gamelife/2014/02/title.jpg" 
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Flappy Bird
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Python
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{color:'black'}}>Code<a href='https://github.com/Rohit2408/FlappyBird' target='__blank' /><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="github" style={{marginLeft: '10px'}} /></Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    alt="myWeather"
                    height="140"
<<<<<<< HEAD
                    image="https://tutorialzine.com/media/2012/05/jquery-geolocation-weather-app.jpg" 
=======
                    image="https://drive.google.com/file/d/1ZE0OrFWr8yPHRtbZDwZNhGTd6JWXGiti/view?usp=sharing" 
>>>>>>> e2ccf4d31bf8d1d10005720e59ecf67b69d2693f
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        myWeather App
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        HTML, CSS, JS
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{color:'black'}}>Code<a href='https://github.com/Rohit2408/myWeather' target='__blank' /><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="github" style={{marginLeft: '10px'}} /></Button>
                    <Button size="small" style={{color:'black'}}>Live Demo<a href='https://rohit2408.github.io/myWeather/' /><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/external-link.png" alt="external-link" style={{marginLeft: '10px'}} /></Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardComponent;
