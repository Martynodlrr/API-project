import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import * as sessionActions from '../../../../redux/session.js';
import * as spotActions from '../../../../redux/spots.js';
import { useModal } from '../../context/Modal.js';

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      history.push("/");
    }
  }, [sessionUser, history]);

  if (sessionUser) return <Redirect to="/" />

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
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            placeholder='UserName or Email'
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        {errors.message && (
          <p>The provided credentials were invalid</p>
        )}
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button onClick={signInDemo}>Demo Sign In</button>
      </form>
    </>
  );
};

export default LoginFormModal;
