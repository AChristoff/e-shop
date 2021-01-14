import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({match, location}) => {
  // For pagination
  const query = queryString.parse(location.search)
  const { search, page: currentPage, limit } = query
  
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList )
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(search, currentPage, limit))
  }, [dispatch, search, currentPage, limit])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate route={''} query={query} pages={pages} page={page}/>
        </>
      )}
    </>
  )
}

export default HomeScreen
