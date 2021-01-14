import { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'
import queryString from 'query-string'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'
import PageSize from '../components/PageSize'
import PriceFormatter from '../components/PriceFormatter'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, location }) => {
  // For pagination
  const query = queryString.parse(location.search)
  let { search, page: currentPage, limit } = query

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    } 

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts(search, currentPage, limit))
    }


  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, search, currentPage, limit])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='text-center'>
          <h1>Products</h1>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='align-items-center'>
            <Col>
              <Route render={({history}) => <SearchBox route='/admin/productlist' history={history} query={query}/>} />
            </Col>
            <Col className='text-right'>
              <Button className='btn-sm my-3' onClick={createProductHandler}>
                <FaPlus /> Create Product
              </Button>
            </Col>
          </Row>
          <Table striped border hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <PriceFormatter price={product.price} />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button
                        className='btn-sm border border-dark'
                        variant='light'
                      >
                        <FaEdit style={{ 'font-size': '1.5em' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm border border-danger'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ 'font-size': '1.5em' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col>
              <Paginate route={'/admin/productlist'} query={query} pages={pages} page={page} />
            </Col>
            <Col>
            <Route render={({history}) => <PageSize route={'/admin/productlist'} query={query} history={history}/>} />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductListScreen
