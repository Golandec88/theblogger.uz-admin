import {LoginOutlined} from '@ant-design/icons'
import {Button, Form, Input, Tabs} from 'antd'
import React from 'react'
import {changeAntdTheme} from "dynamic-antd-theme";
import {authUser, registerUser} from "../store/auth/actionCreators";
import {useDispatch} from "react-redux";

const {TabPane} = Tabs;

const AuthPage: React.FC = () => {

    const generateTheme = () => changeAntdTheme('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
    generateTheme()

    const dispatch = useDispatch()

    const submitHandler: (form: {}, type: string) => void = (form, type) => {
        if(type === 'register') {
            dispatch(registerUser(form))
        } else {
            dispatch(authUser(form))
        }
    }

    return (
        <section className="app-auth-form">
            <div className="app-auth-form-container">
                <h3 className="text-center">Theblogger.uz</h3>
                <Tabs defaultActiveKey="1" onTabClick={generateTheme}>
                    <TabPane
                        tab={<h6 className="mb-0 user-select-none">Авторизация</h6>}
                        key="1"
                    >
                        <Form
                            {...{
                                labelCol: {span: 24},
                                wrapperCol: {span: 24},
                            }}
                            onFinish={event => submitHandler(event, 'auth')}
                            name="auth"
                            initialValues={{remember: true}}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item {...{
                                wrapperCol: {span: 24},
                            }}>
                                <Button type="primary" className="app-button submit" icon={<LoginOutlined/>} htmlType="submit">
                                    Войти
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane
                        tab={<h6 className="mb-0 user-select-none">Регистрация</h6>}
                        key="2"
                    >
                        <Form
                            {...{
                                labelCol: {span: 24},
                                wrapperCol: {span: 24},
                            }}
                            onFinish={event => submitHandler(event, 'register')}
                            name="register"
                            initialValues={{remember: true}}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item
                                label="Имя"
                                name="firstName"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Фамилия"
                                name="lastName"
                                className="app-input"
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" className="app-button submit" icon={<LoginOutlined/>} htmlType="submit">
                                    Зарегистрироватся
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </section>
    )
}

export default AuthPage