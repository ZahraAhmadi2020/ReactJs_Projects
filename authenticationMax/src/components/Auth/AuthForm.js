import { useContext, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext)
  const emailInoutRef = useRef()
  const passInputRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredEmail = emailInoutRef.current.value;
    const enteredpass = passInputRef.current.value;
    setIsLoading(true)
    let url;
    if (isLogin) {
      url = 'kkk'

    } else {
      url = 'kkkk'


    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredpass,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }

      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()

        } else {
          return res.json().then(data => {
            // console.log(data);

            let errorMessage = 'Authentication failed';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          })
        }
      })
      .then(data => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/');
      })
      .catch(err => { alert(err.rMessage); })

  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInoutRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
