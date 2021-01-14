import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ITEMS_PER_PAGE } from '../constants/generalConstants'

const SearchBox = ({route, history, isHeader = false, query = {} }) => {

  const [keyword, setKeyword] = useState(query.search || '')

  // Set Query params fallbacks
  const limit = query.limit || ITEMS_PER_PAGE
  const filters = query.filters || ''
  const page = 1

  const submitHandler = (e) => {
    e.preventDefault()
    history.push(`${route}/q?page=${page}&limit=${limit}&search=${keyword}&filters=${filters}`)
  }

  const onKeyUpValue = () => {}
  
  return (
    <Form onSubmit={submitHandler} className={isHeader ? '' : 'mb-3'} style={{'height': '35px'}} inline >
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpValue}
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