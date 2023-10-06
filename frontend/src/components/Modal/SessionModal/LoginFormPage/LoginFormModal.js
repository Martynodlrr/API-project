import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";

import * as sessionActions from '../../../../redux/session.js';
import * as spotActions from '../../../../redux/spots.js';
import { useModal } from '../../context/Modal.js';
import Button from '@mui/material/Button';

import "./LoginForm.css";

function LoginFormModal({ theme }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(res => {
        if (res.user) {
          dispatch(spotActions.fetchUserSpots());
          closeModal();
        }
        setErrors(res);
      });
  };

  const signInDemo = () => {
    dispatch(sessionActions.login({
      "credential": "demo@user.io",
      "password": "password"
    }))
      .then(res => {
        if (res.user) {
          dispatch(spotActions.fetchUserSpots());
          closeModal();
        }
      });
  }

  return (
    <>
      <h1 className='heading'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='input-container'>
            <TextField
              type="text"
              value={credential}
              onChange={e => setCredential(e.target.value)}
              label="UserName or Email"
              variant="standard"
              required
              fullWidth
              sx={{
                '& label.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
              }}
            />

            <TextField
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              variant="standard"
              required
              fullWidth
              sx={{
                '& label.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
              }}
            />
          </div>
          <div className='error-container'>
            {errors.message && (
              <p className='error'>The provided credentials were invalid</p>
            )}
          </div>
          <div className='action-container'>
            <Button
              type="submit"
              disabled={credential.length < 4 || password.length < 6}
              variant="contained"
              style={{ backgroundColor: theme.palette.primary.main, }}
            >
              Log In
            </Button>
            <Button
              onClick={signInDemo}
              variant="outlined"
              id='demo-button'
              style={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main
              }}
            >
              Demo Sign In
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginFormModal;
