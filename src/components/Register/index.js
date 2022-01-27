import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import Form from '../Form';
import { setAuthUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (email, password) => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setAuthUser({
                    email: user.email,
                    id: user.uid
                }));
                navigate('/');
            })
            .catch(() => alert('user is already logged in!'));
    }

    return (
        <div className="login">
            <Form title="Sign Up" handleClick={(email, password) => handleRegister(email, password)} />
        </div>
    );
};

export default Register;