import axios from "axios";
import React, { useEffect } from "react";
import { useState, FC } from "react";
import { Button } from "@material-ui/core";
import {Card, CardHeader, CardMedia, CardContent, Typography} from '@mui/material';
const MovieByRating:FC<any> = ({user}) => {

  const [movieData, setMovieData] = useState<any>([]);
  const [count, setCounter] = useState(0);


  // count < movieData.length ? movieData[count].thumbnailUrl : setCounter(0) && movieData[count].thumbnailUrl} 



  const watchCount = () => {
    // count < movieData.length && count > -1 ? setCounter(count) : setCounter(0);
    if (count > movieData.length - 1) {
      setCounter(0);
    } else if (count < 0) {
      setCounter(movieData.length - 1);
    }
  }

  const combinedFuncAdd = () => {
    if (count === movieData.length -1) {
      setCounter(0);
    } else {
      setCounter(count + 1)
    }
  };


  const combinedFuncSub = () => {
    if (count === 0) {
      setCounter(movieData.length - 1);
    } else {
      setCounter(count - 1);
    }
  };


  const getMovieData =  (rating: string) => {
    return axios.get(`api/movies/moviesByRating${rating}`)
    .then(({data}: any) => {
      let filteredArray = data.filter(function(movie: any) {
        return movie.linkEmbed !== null;
      })
      setMovieData(filteredArray);
    })
    .catch(() => console.log('failed to get movies'));
  };

  const saveMovie = () => {
    if(user) {
      axios({
        method: 'post',
        url: '/api/users/user-movies',
        data: {
          movieId: movieData[count].imDbId,
          userId: user.id
        }
      });
    }
  }

    useEffect(() => {watchCount()}, [count]);

  if (movieData.length === 0) {
    return (
  <div>
    <br></br>
    {/* <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('G')}}>Find G rated movies</Button> */}
    <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('PG')}}>Find PG rated movies</Button>
    <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}onClick={() => {getMovieData('PG-13')}}>Find PG-13 rated movies</Button>
    <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('R')}}>Find NC-17 rated movies</Button>
    <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('NC-17')}}>Find R rated movies</Button>
  </div>
    );


  } else {
    return (
      <div>
        <br></br>
        {/* <Button variant="contained" id="outlined-basic" color="primary" onClick={() => {getMovieData('G')}}>Find G rated movies</Button> */}
        <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('PG')}}>Find PG rated movies</Button>
        <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('PG-13')}}>Find PG-13 rated movies</Button>
        <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('R')}}>Find NC-17 rated movies</Button>
        <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {getMovieData('NC-17')}}>Find R rated movies</Button>
        <div>
        <br></br>
        <Button type="submit" onClick={() => {saveMovie()}} variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}}>Add movie to favorites</Button>
        </div>
        <br></br>
    <div>
      <Card
        variant='outlined'
        sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="194"
          src={movieData[count].thumbnailUrl}
          title="movie trailer"
        />
        <CardHeader
          title={movieData[count].title}
          subheader={movieData[count].year}
        />
        <CardContent>
          <Typography>
            {movieData[count].videoDescription}
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {combinedFuncAdd()}}>Show Next Movie</Button>
      <Button variant="contained" id="outlined-basic" style={{background: 'white', color: 'black'}} onClick={() => {combinedFuncSub()}}>Show Previous Movie</Button>
    </div>
      </div>
    )
  }
}

export default MovieByRating;