import { useModal } from "../../context/Modal.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as sessionActions from "../../../../redux/session.js";

import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(res => {
          console.log(res)
          if (res.message === 'user already exists') {
            setErrors({ user: 'Email or User Name already in use' });
            return;
          }
          if (res.errors) {
            for (const error of res.errors) {
              setErrors(prevErrors => {
                if (error.startsWith('Validation isEmail')) return { ...prevErrors, emailValid: 'Invalid email' };
                if (error.startsWith('Validation len on email failed')) return { ...prevErrors, uniqueEmail: 'Email must be 3 - 256 characters long' };
                if (error.startsWith('Validation len on username failed')) return { ...prevErrors, userName: 'Username must be 4 - 30 characters long' };
                if (error.startsWith('Cannot be an email.')) return { ...prevErrors, emailUsername: 'Username cannot be a email' };
                return prevErrors;
              });
            }
          } else {
            closeModal();
          }
        });
    } else {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }
  };

  return (
    <>
      <h1 className="formTitle">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          {errors.user && <p className="error">{errors.user}</p>}
        <label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
        </label>
        {errors.emailValid && <p className="error">{errors.emailValid}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
            required
            />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        {errors.emailUsername && <p className="error">{errors.emailUsername}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            />
        </label>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
          )}
        <button type="submit" disabled={
          !email ||
          !username ||
          !firstName ||
          !lastName ||
          !password ||
          username.length < 4 ||
          password.length < 6
        }
        >Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignupFormModal;
