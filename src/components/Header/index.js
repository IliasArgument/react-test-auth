import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from '../../store/slices/authSlice';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderNavigation = () => {

    const dispatch = useDispatch()
    const { isAuth, email } = useAuth();

    const navigate = useNavigate();

    const onSignOut = () => {
        navigate('/login');
        dispatch(removeUser())
    }
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{display: 'flex', justifyContent: 'flex-end'}}>
                {isAuth ? (
                    <>
                        <Menu.Item key="3" onClick={onSignOut}>sign out</Menu.Item>
                        <Menu.Item key="5">{email}</Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="2" onClick={() => navigate('/register')}>sign up</Menu.Item>
                        <Menu.Item key="1" onClick={() => navigate('/login')}>sign in</Menu.Item>
                    </>
                )
                }
            </Menu>
        </Header>
    );
};

export default HeaderNavigation;