import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
const Card = (props) => {
  console.log(props.data.poster_path);
  const handleCardClick = () => {
    props.handlerClick(props.data)
  }
  return (
    <div className='card'>
      <img src={props.data.poster_path} alt='#' onClick={handleCardClick}></img>
      <p>{props.data.title}</p>
    </div>
  );
};
export default Card;
