import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({route, history, isHeader = false}) => {

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(route + keyword)
    } else {
      route = route.replace('/search/', '')
      history.push(route)
    }
  }

  const onKeyUpValue = () => {}
  
  return (
    <Form onSubmit={submitHandler} className={isHeader ? '' : 'mb-3'} inline >
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpValue}
        placeholder='Search Product'
        className={isHeader ? 'mr-sm-2 ml-sm-5' : 'mr-sm-2'}
        style={{height: '35px'}}
      ></Form.Control>
      <Button type='submit' variant={isHeader ? 'outline-success' : 'primary'} className='btn-sm'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox