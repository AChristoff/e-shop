import React, { useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import PageSize from '../components/PageSize'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({location}) => {
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
    <section className='d-flex flex-column h-100 products-page'>
      <Meta title='Products' />
      { !Object.keys(query).length 
        ? <ProductCarousel /> 
        : <Link className='btn btn-light my-3' to='/' style={{'width': '110px'}}>
          Go Back
        </Link>}
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='mb-5'>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row className='mt-auto pt-4 border-top'>
            <Col>
              <Route render={({history}) => <PageSize route={'/products'} query={query} history={history}/>} />
            </Col>
            <Col className='d-flex'>
              <Paginate route={'/products'} query={query} pages={pages} page={page}/>
            </Col>
          </Row>
        </>
      )}
    </section>
  )
}

export default HomeScreen
