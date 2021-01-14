import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import PriceFormatter from './PriceFormatter'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{'height': '390px'}}>
      <Link to={`/product/${product._id}`} className='overflow-hidden' style={{'height': '13em', position: 'relative'}}>
        <Card.Img src={product.images[0]} variant='top' style={{position: 'absolute', 'top': '50%', 'left': '50%', transform: 'translate(-50%, -50%)'}}/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          <PriceFormatter price={product.price} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
