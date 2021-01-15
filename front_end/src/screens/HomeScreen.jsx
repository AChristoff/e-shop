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
import CategorySelect from '../components/CategorySelect'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({location, history}) => {
  // For pagination
  const query = queryString.parse(location.search)
  const { search, page: currentPage, limit, category } = query
  
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList )
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(search, currentPage, limit, category))
  }, [dispatch, search, currentPage, limit, category, history])

  return (
    <section className='d-flex flex-column h-100 products-page'>
      <Meta title='Products' />
      { !search
        ? <ProductCarousel /> 
        : <Link className='btn btn-light my-3' to='/' style={{'width': '110px'}}>
          Go Back
        </Link>}
      <Row className='d-flex'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='pt-1 d-flex justify-content-end'>
          <CategorySelect route={'/products'} query={query} history={history}/>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='mb-5'>
            {products.length ? products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            )) : (
              <Col>
                <h5 className='text-center mt-5'>No results found</h5>
                <p className='text-center mt-3'>Consider changing some of your criteria "Search Keyword" or "Category"</p>
              </Col>
            )}
          </Row>
          <Row className='mt-auto pt-4 border-top'>
            <Col>
              <PageSize route={'/products'} query={query} history={history} page={page}/>
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
