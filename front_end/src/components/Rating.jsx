import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'


const Rating = ({value, text, color = '#f7be4a'}) => {

  return (
    <div className="rating">
      { value >= 1 
        ? <FaStar style={{color}}/> 
        : value >= 0.5
        ? <FaStarHalfAlt style={{color}}/> 
        : <FaRegStar style={{color}}/>
      }
      { value >= 2 
        ? <FaStar style={{color}}/> 
        : value >= 1.5
        ? <FaStarHalfAlt style={{color}}/> 
        : <FaRegStar style={{color}}/>
      }
      { value >= 3 
        ? <FaStar style={{color}}/> 
        : value >= 2.5
        ? <FaStarHalfAlt style={{color}}/> 
        : <FaRegStar style={{color}}/>
      }
      { value >= 4 
        ? <FaStar style={{color}}/> 
        : value >= 3.5
        ? <FaStarHalfAlt style={{color}}/> 
        : <FaRegStar style={{color}}/>
      }
      { value >= 5 
        ? <FaStar style={{color}}/> 
        : value >= 4.5
        ? <FaStarHalfAlt style={{color}}/> 
        : <FaRegStar style={{color}}/>
      }
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
