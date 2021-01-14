import { useState } from 'react'
import { Form } from 'react-bootstrap'

const PageSize = ({ route = '', query = {}, history }) => {
  const [size, setSize] = useState([2,4,6,8])

  const handleChange = (e) => {
    e.preventDefault()
    history.push(`${route}/q?page=${query.page}&limit=${e.target.value}&search=${query.search}&filters=${query.filters}`)
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
