import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  const onKeyUpValue = () => {}
  
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='keyword'
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={onKeyUpValue}
        placeholder='Search Product'
        className='mr-sm-2 ml-sm-5'
        style={{height: '35px'}}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='btn-sm'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox