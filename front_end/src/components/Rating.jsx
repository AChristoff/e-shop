import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Rating = ({value, text, color = '#f7be4a'}) => {

  const createRating = () => {
    let rating = []
  
    for (let i = 0; i < 5; i++) {
      rating.push(
        <span key={i}>
          {value >= i + 1 
            ? <FaStar style={{color}}/> 
            : value >= i + 0.5
            ? <FaStarHalfAlt style={{color}}/> 
            : <FaRegStar style={{color}}/>
          }
        </span>
      )
    }
    return rating
  }

  return (
    <div className="rating">
      {createRating()}
      <span>{text && text}</span>
    </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
