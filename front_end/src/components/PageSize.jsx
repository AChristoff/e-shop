import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_LIST } from '../constants/generalConstants'

const PageSize = ({ route = '', query = {}, history }) => {
  const [size, setSize] = useState(ITEMS_PER_PAGE_LIST)

   // Set Query params fallbacks
   const page = query.page || 1
   const search = query.search || ''
   const filters = query.filters || ''

  const handleChange = (e) => {
    e.preventDefault()
    history.push(`${route}/q?page=${page}&limit=${e.target.value}&search=${search}&filters=${filters}`)
  }
    
  return (
    <Form.Group controlId='limit' className='d-flex align-items-center' style={{width: '120px', 'margin-left': 'auto'}}>
      <Form.Label className='mb-0 mr-2 d-flex align-items-center'>Results</Form.Label>
      <Form.Control
        as='select'
        size='sm'
        value={query.limit}
        onChange={handleChange}
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
