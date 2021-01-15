import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ITEMS_PER_PAGE } from '../constants/generalConstants'

const SearchBox = ({route, history, isHeader = false, query = {} }) => {

  const [search, setKeyword] = useState(query.search || '')
  console.log(query.search);
  // Set Query params fallbacks
  const limit = query.limit || ITEMS_PER_PAGE
  const category = query.category || ''
  const page = 1

  const submitHandler = (e) => {
    e.preventDefault()
    history.push(`${route}/q?page=${page}&limit=${limit}&search=${search}&category=${category}`)
  }
 
  return (
    <Form onSubmit={submitHandler} className={isHeader ? '' : 'mb-3'} style={{'height': '35px'}} inline >
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        value={search || ''}
        placeholder='Search Product'
        className={isHeader ? 'mr-sm-2 ml-sm-5 h-100' : 'mr-sm-2 h-100'}
      ></Form.Control>
      <Button type='submit' variant={isHeader ? 'outline-success' : 'primary'} className='btn-sm'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox