import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ITEMS_PER_PAGE } from '../constants/generalConstants'

const SearchBox = ({route, history, isHeader = false, query = {} }) => {

  const [search, setKeyword] = useState(query.search || '')
  // Set Query params fallbacks
  const limit = query.limit || ITEMS_PER_PAGE
  const category = query.category || ''
  const page = 1

  const submitHandler = (e) => {
    e.preventDefault()
    history.push(`${route}/q?page=${page}&limit=${limit}&search=${search}&category=${category}`)
  }
 
  return (
    <Form onSubmit={submitHandler} className={isHeader ? '' : 'mb-3 d-flex'} inline >
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        value={search || ''}
        placeholder='Search Product'
        className={isHeader ? 'mr-sm-2 ml-lg-5 h-100 my-1' : 'mr-2 h-100 mb-2'}
        style={{'max-height': '35px'}}  
      ></Form.Control>
      <Button type='submit' variant={isHeader ? 'outline-success' : 'primary'} className='search-button btn-sm my-1 w-sm-100'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox