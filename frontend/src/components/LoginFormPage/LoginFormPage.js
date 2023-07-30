import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { login, restoreUser } from '../../redux/session.js';

import "./loginForm.css";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);

    const [formData, setFormData] = useState({
        credential: '',
        password: '',
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        return () => {
            setErrors([]);
        }
    }, []);

    if (currentUser) return <Redirect to="/" />;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(login(formData));
            await dispatch(restoreUser());
            setErrors([]);
            history.push('/');

        } catch (error) {
            const e = await error.json();
            const errorMessages = [];

            if (e.credential || e.password) {
                errorMessages.push(e.credential || null, e.password || null);
            } else {
                errorMessages.push(e.message);
            }
            setErrors(errorMessages);
        };
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="credential">Username or Email</label>
                    <input
                        type={'text' || 'email'}
                        id="credential"
                        name="credential"
                        value={formData.credential}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errors.length > 0 && (
                <div>
                    <ul style={{ listStyle: 'none' }}>
                        {errors.map((error, index) => error ? (
                            <li key={index}>{error}</li>
                        ) : null)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LoginFormPage;
