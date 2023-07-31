import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import * as sessionActions from "../../redux/session";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(res => {
        if (res.user) closeModal();
        setErrors(res);
      });
  };

  const signInDemo = () => {
    dispatch(sessionActions.login({
        "credential": "demo@user.io",
        "password": "password"
    }));
    closeModal();
}

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && (
          <p>{errors.message}</p>
        )}
        <button type="submit">Log In</button>
        <button onClick={signInDemo}>Demo Sign In</button>
      </form>
    </>
  );
};

export default LoginFormModal;
