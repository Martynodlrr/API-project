import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal.js";
import * as sessionActions from "../../redux/session";
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
    if (password === confirmPassword) {
      setErrors({});
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
          if (res.errors) {
            for (const error of res.errors) {
              if (error.startsWith('Validation isEmail')) setErrors({ ...errors, emailValid: 'Invalid email' });
              if (error.startsWith('email must be unique')) setErrors({ ...errors, uniqueEmail: 'Email is already in use' });
              if (error.startsWith('Validation len on email failed')) setErrors({ ...errors, uniqueEmail: 'Email must be 3 - 256 characters long' });
              if (error.startsWith('Validation len on username')) setErrors({ ...errors, userName: 'Username must be 4 - 30 characters long' });
              if (error.startsWith('username must be unique')) setErrors({ ...errors, uniqueUsername: 'Username is already in use' });
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.emailValid && <p>{errors.emailValid}</p>}
        {errors.uniqueEmail && <p>{errors.uniqueEmail}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        {errors.uniqueUsername && <p>{errors.uniqueUsername}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormModal;
