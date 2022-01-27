import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';


const FormComponent = ({ title, handleClick }) => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const onFinish = () => {
        handleClick(email, password)
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        min: 6,
                        message: 'minimum 6 characters!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    {title}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormComponent;