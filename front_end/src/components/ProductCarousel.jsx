import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import PriceFormatter from './PriceFormatter'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  },[dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pause='hover' interval="500000" className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.images[0]} alt={product.name} className='carousel-image' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h6 className='text-light bg-dark ml-auto p-2 carousel-description' style={{'margin-bottom': '25%', 'margin-right': '-60px', 'width': '40%'}}>{product.description}</h6>
              <h2 className='text-light bg-dark mx-auto mb-3 p-2 carousel-title'>
                {product.name} <span className='text-muted'>for&nbsp;
                <PriceFormatter price={product.price} /></span>
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
