import React from 'react';
import Form from '../Form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setAuthUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email, password) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setAuthUser({
                    email: user.email,
                    id: user.uid
                }));
                navigate('/');
            })
            .catch(() => alert('user is not authorized!'));
    }
return (
    <div className="login">
        <Form title="Sign In" handleClick={(email, password) => handleLogin(email, password)} />
    </div>
);
};

export default Login;