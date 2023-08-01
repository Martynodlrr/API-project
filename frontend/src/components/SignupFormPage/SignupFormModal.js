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
          if (res.errors) {
            for (const error of res.errors) {
              setErrors(prevErrors => {
                if (error.startsWith('Validation isEmail')) return { ...prevErrors, emailValid: 'Invalid email' };
                if (error.startsWith('email must be unique')) return { ...prevErrors, uniqueEmail: 'Email is already in use' };
                if (error.startsWith('Validation len on email failed')) return { ...prevErrors, uniqueEmail: 'Email must be 3 - 256 characters long' };
                if (error.startsWith('Validation len on username failed')) return { ...prevErrors, userName: 'Username must be 4 - 30 characters long' };
                if (error.startsWith('username must be unique')) return { ...prevErrors, uniqueUsername: 'Username is already in use' };
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
    console.log(errors)

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
        {errors.emailValid && <p>{errors.emailValid}</p> || errors.uniqueEmail && <p>{errors.uniqueEmail}</p>}
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
        {errors.emailUsername && <p>{errors.emailUsername}</p>}
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
      </form>
    </>
  );
};

export default SignupFormModal;
