import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

const CategorySelect = ({ route = '', query = {}, history }) => {

  const categoryMap = {
    1: 'Phones',
    2: 'Computers',
    3: 'Headphones',
    4: 'Cameras',
    5: 'TVs',
    6: 'Gaming',
  }

  const [category, setCategory] = useState(query.category)

  // Set Query params fallbacks
  const page = query.page || 1
  const search = query.search || ''
  const limit = query.limit || ''

  useEffect(() => {
    history.push(`${route}/q?page=${page}&limit=${limit}&search=${search}&category=${category}`)
  },[history, route, page, limit, search, category])

  return (
    <Form.Group controlId='rating' className='d-flex align-items-center mb-3 mb-0'>
      <Form.Label className='m-0 mr-3'>Category</Form.Label>
      <Form.Control
        as='select'
        value={query.category}
        style={{'height': '35px'}}
        className='p-2'
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=''>Select...</option>
        {Object.keys(categoryMap).map((x) => (
          <option value={x}>{categoryMap[x]}</option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default CategorySelect
