import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const PageSize = ({ route, pageSize = 3, pageNumber = '', keyword = '', history }) => {
  const [size, setSize] = useState(4)

  const handleChange = (e) => {
    console.log(e.target.value);
    setSize(e.target.value)
    if (keyword.trim()) {
      history.push(`${route}?search=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    } else {
      route = route.replace('/search/', '')
      history.push(`${route}/${pageSize}/${e.target.value}`)
    }
  }
    
  return (
    <Form.Control
      as='select'
      size='sm'
      value={4}
      onChange={handleChange}
    >
      {[...Array(4).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </Form.Control>
  )
}

export default PageSize
