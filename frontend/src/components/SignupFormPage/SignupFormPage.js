import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../redux/session";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            const data = await dispatch(
                signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            );
            if (data.errors) {
                let newErrors = {};
                data.errors.forEach((error) => {
                    if (error.includes('Validation len on email')) newErrors.emailLength = 'username must be between 3 and 256 characters';
                    if (error.includes('username must be unique')) newErrors.emailUnique = 'email already in use';
                    if (error.includes('Validation isEmail on email failed')) newErrors.emailNotValid = 'not a valid email';
                    if (error.includes('Validation len on username')) newErrors.usernameLength = 'username must be between 4 and 30 characters';
                    if (error.includes('email must be unique')) newErrors.usernameUnique = 'username already in use';
                });
                setErrors(newErrors);
            }
        } else {
            setErrors({
                password: "Confirm Password field must be the same as the Password field"
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
                {errors.emailLength && <p>{errors.emailLength}</p>}
                {errors.emailUnique && <p>{errors.emailUnique}</p>}
                {errors.emailNotValid && <p>{errors.emailNotValid}</p>}
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.usernameLength && <p>{errors.usernameLength}</p>}
                {errors.usernameUnique && <p>{errors.usernameUnique}</p>}
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
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
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};

export default SignupFormPage;
