import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import { useAuth } from '../../hooks/use-auth';


const AppRouter = () => {

    const { isAuth } = useAuth();
    return (
        <div>
            <Routes>
                <Route exact path="/" element={isAuth ? <HomePage /> : <Navigate to='/login' />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="*" element={<Navigate to={'/login'} />} />
            </Routes>

        </div>
    );
};

export default AppRouter;