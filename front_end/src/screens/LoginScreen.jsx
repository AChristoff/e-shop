import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, loginGoogle } from '../actions/userActions'
import GoogleLogin from 'react-google-login'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleClientId, setGoogleClientId] = useState('')
  const [googleTokenId, setGoogleTokenId] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    (async () => {
      const { data: googleClientId } = await axios.get('/api/config/google')
      setGoogleClientId(googleClientId)
    })()

    if(googleTokenId) {
      dispatch(loginGoogle(googleTokenId))
    }

    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect, googleClientId, googleTokenId, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const responseGoogle = (res) => {
    setGoogleTokenId(res.tokenId);
  }

  return (
    <>
      <h1 className='text-center'>Sign In</h1>
      <div class='justify-content-md-center row'>
        <div class='col-md-6'>
          {googleClientId ? (
            <GoogleLogin
              clientId={googleClientId}
              buttonText='Sign In with Google'
              className='text-center mb-3 px-2 py-1 w-100 justify-content-center'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <FormContainer>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className='mt-5'>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='w-100'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
