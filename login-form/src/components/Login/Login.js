import React, { useState } from 'react'
import Card from './UI/Card'
import { Row, Col } from 'react-bootstrap'
// import Icon from 'react-icons-kit'
import { BsPersonCircle } from 'react-icons/bs'
import { GiPadlockOpen, GiPadlock } from 'react-icons/gi'

import useInput from '../../hooks/use-input'

const Login = () => {

  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const  numbers = /[0-9]/g;
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valuChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset:resetUsername

  } = useInput(value => value !== '' && value.length >5 && value.match(upperCaseLetters))

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valuChangeHandler:passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset:resetPassword

  } = useInput(value => value !== '' &&  value.length >8 && value.match(lowerCaseLetters) && value.match(upperCaseLetters) && value.match(numbers) )

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(GiPadlock);

  let formIsValid = false;

  if (usernameIsValid && passwordIsValid) {
    formIsValid =true
  }


  // show pass
  const showHandler = () => {
 if (type==='password'){
      setIcon(GiPadlockOpen);
      setType('text')
   } else {
      setIcon(GiPadlock)
      setType('password')
   }
  }


 const sendData = async() => {
  // console.log(value);
  const response =await fetch('https://mylogiform-default-rtdb.firebaseio.com/value.json', {
      method: 'POST',
      body: JSON.stringify({username,password, title: 'Send data' }),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const data =await response.json()
      console.log(data);

}
  const submitForm = (e) => {

    e.preventDefault()

    if (!usernameIsValid) {
      return;
    }
    console.log(username, password);

    resetUsername()
    resetPassword()

  }


  return (

   <Card>
      <Row>
        <Col>
          <BsPersonCircle className='person mt-4 h-75' />
        </Col>
      </Row>
       <h3 className='login'>Login</h3>
      <form className='text-light mt-5' onSubmit={submitForm}>
        <Row>
          <Col className='position-relative'>

            <div>
              <BsPersonCircle className='username' />
            <input type='text' placeholder='Username' className='input p-2 mb-3 w-75 text-center'
              value={username} onChange={usernameChangeHandler} onBlur={usernameBlurHandler}
              maxLength='12'
            style= {{border:usernameHasError? '2px solid red' :''}}
            />
              </div>
            {usernameHasError &&
              (<p className='text-danger'>username must be more than 5 letters includ upperCaseLetters & lowerCaseLetters .</p>
              )}

          </Col>
        </Row>
         <Row>
          <Col  >
            {/* <GiPadlockOpen className='password' onClick={showHandler}/>
             */}


            <div className='position-relative'>
              <span className='password' onClick={showHandler}>{icon}</span>


               <input type={type} placeholder='Password' className='input p-2 mb-3  w-75 text-center'
              value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}
              maxLength='12'
                style={{ border: passwordHasError ? '2px solid red' : '' }}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
               </div>

              {passwordHasError &&
              (<p className='text-danger'>password must be more than 8 numbers includ upperCaseLetters & lowerCaseLetters & numbers.</p>)}

          </Col>
        </Row>

        <Row className=' mt-2 mx-4'>
          <Col className='mt-2'  >
            <input className='input' type='checkbox' />
            <label className='label ps-1'>Remember me</label>
          </Col>
          <Col   >
            <a href='#' type='button' className='forgot btn btn-link'>Forgot password?</a>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col>
            <button className='loginbtn  btn-outline-light w-25 p-2'
              disabled={!formIsValid}
              onClick={sendData}
            >Login</button>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col>
            <span>Don't have an account?<br></br>
             <a href='#' className='btn btn-link'>Sign Up</a>
             </span>
          </Col>
        </Row>

      </form>
   </Card>

  )
}

export default Login
