import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/card';
import '../styles.css';
import swal from 'sweetalert';
import NavBar from '../components/navbar';
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getAllMovies();
  }, []);
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const getAllMovies = async () => {
    const url = 'http://localhost:3001/api/movies';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response Status ${response.status}`);
      const json = await response.json();
      setMovieSelected(json[3]);
      setMovies(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlerClick = (movie) => {
    setMovieSelected(movie);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    console.log('url video', movieSelected.video);
  };

  const handleTrailerClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      swal('ERROR', 'Access Denied\nGo to login', 'error');
      navigate('/login');
    } else {
      const url = 'http://localhost:3001/api/auth';
      try {
        const response = await fetch(url, {
          headers: {
            'x-auth-token': token,
          },
        });
        if(response.ok){
          return setShowTrailer(true);
        }else{
          const json = await response.json();
          if(json.msg==='token expired'){
            swal("ERROR", "Access Denied\nYour Token has expired\nYou have to be logged again", "error");
          }else if(json.msg==='invalid token'){
            swal("ERROR", "Access Denied\ninvalid token\nYou have to be logged again", "error");
          }else{
            swal("ERROR", "Access Denied\n server error trying to auth user", "error");
          }
        }
        localStorage.removeItem('token');

      } catch (error) {
        return res
          .status(500)
          .json({ msg: 'server error trying to auth user' });
      }
    }
  };
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className='container'>
      <NavBar />

      {movieSelected && (
        <div className='backdrop-container'>
          <div
            className='backdrop'
            style={{ backgroundImage: `url(${movieSelected.backdrop_path})` }}
          >
            <div
              className='poster'
              style={{ backgroundImage: `url(${movieSelected.poster_path})` }}
            ></div>

            {showTrailer && (
              <div className='trailer-container'>
                <span className='close-btn' onClick={handleCloseTrailer}>
                  &times;
                </span>
                <iframe
                  width='1000'
                  height='540'
                  src={`https://www.youtube.com/embed/${movieSelected.video}`}
                  title='YouTube video player'
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowfullscreen
                />
              </div>
            )}

            <div className='general-info'>
              <div className='inside-general-info'>
                <p className='title'>{movieSelected.title}</p>
                <div>
                  <p className='title-overview'>Overview</p>
                  <p className='overview'>{movieSelected.overview}</p>
                </div>
                <button className='trailer-btn' onClick={handleTrailerClick}>
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='cards-container'>
        {movies.map((item, index) => {
          return (
            <Card key={item._id} data={item} handlerClick={handlerClick} />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
