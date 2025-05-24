import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainCards.css';

function MainCards(props) {
  const { data } = props;
  const navigate = useNavigate();

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const imageUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : 'https://via.placeholder.com/200x300';
  const rating = Math.round(data.vote_average * 10);

  let circleColor = '#21d07a';
  if (rating < 70 && rating >= 40) circleColor = '#ffcc00';
  if (rating < 40) circleColor = '#ff4444';

  return (
    <div className="card main-card" onClick={() => handleNavigate(data.id)}>
      <div className="image-container">
        <img src={imageUrl} className="card-img-top" alt={data.title} />
        <div className="rating-circle" style={{ backgroundColor: circleColor }}>
          {rating}%
        </div>
      </div>
      <div className="card-body">
        <div className="content-left">
          <h5 className="card-title" style={{color:'#1e2129'}}>{data.title}</h5>
          <p className="card-text" style={{color:'#1e2129'}} >{data.release_date}</p>
        </div>
        <div className="content-right">
          <span className="heart-icon">♡</span>
        </div>
      </div>
    </div>
  );
}

export default MainCards;