import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPassInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler = () => {

    const enteredNewPass = newPassInputRef.current.value;


    fetch('gg',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPass,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer abc'
        }
      }).then(res => {
        history.replace('/')
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPassInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
