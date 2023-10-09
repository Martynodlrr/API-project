import { useModal } from "../../context/Modal.js";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReactGa from 'react-ga';

import * as sessionActions from "../../../../redux/session.js";

function SignupFormModal({ theme }) {
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

    ReactGa.event({
      category: 'User',
      action: 'Signed up',
    });

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
      <h1 className="heading">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='input-container'>
            {errors.user && <p className="error">{errors.user}</p>}
            {errors.emailValid && <p className="error">{errors.emailValid}</p>}

            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email"
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
              value={username}
              onChange={e => setUsername(e.target.value)}
              label="Username"
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
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              label="First Name"
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
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              label="Last Name"
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              type="password"
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
            {errors.password && <p className="error">{errors.password}</p>}

            <TextField
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              type="password"
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
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <div className='action-container'>

              <Button
                type="submit"
                disabled={!email || !username || !firstName || !lastName || !password || username.length < 4 || password.length < 6}
                variant="contained"
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupFormModal;
