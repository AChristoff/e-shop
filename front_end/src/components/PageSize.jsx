import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_LIST } from '../constants/generalConstants'

const PageSize = ({ route = '', query = {}, history, page = 1 }) => {
  const size = ITEMS_PER_PAGE_LIST

  const [limit, setLimit] = useState(query.limit || ITEMS_PER_PAGE) 

  // Set Query params fallbacks
  const search = query.search || ''
  const category = query.category || ''

  useEffect(() => {
    history.push(`${route}/q?page=${page}&limit=${limit}&search=${search}&category=${category}`)
  },[history, route, page, limit, search, category])
    
  return (
    <Form.Group controlId='limit' className='d-flex align-items-center mr-auto' style={{width: '120px'}}>
      <Form.Label className='mb-0 mr-2 d-flex align-items-center'>Results</Form.Label>
      <Form.Control
        as='select'
        size='sm'
        value={limit || ITEMS_PER_PAGE}
        onChange={(e) => setLimit(e.target.value)}
      >
        {size.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default PageSize
