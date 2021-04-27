import React, {useEffect} from 'react'
import {LoginOutlined} from '@ant-design/icons'
import {Button, Form, Input, Tabs} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {changeAntdTheme} from "dynamic-antd-theme";

import {authUser} from "../store/auth/action-creators";
import {IAuthState} from "../store/auth/types";
import MaskedInput from "antd-mask-input";
import { useHistory } from 'react-router-dom';
import request from "../plugins/axios";
import NotificationCreator from "../plugins/notification-creator";

const {TabPane} = Tabs;

const AuthPage: React.FC = () => {
    const history = useHistory()
    const state = useSelector((store: {auth: IAuthState}) => store.auth)

    const generateTheme = () => changeAntdTheme('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
    generateTheme()

    const dispatch = useDispatch()

    const submitHandler: (form: any, type: string) => void = (form, type) => {
        // @ts-ignore
        const formattedUsername = form.username.match(/\d/g).join('')

        localStorage.removeItem('user-token')
        localStorage.removeItem('user-refresh-token')

        if(type === 'register') {
            request('POST', 'register', {
                username: `998${formattedUsername}`,
                password: form.password,
                profile: {
                    firstName: form.firstName,
                    lastName: form.lastName
                }
            }).then(() => {
                NotificationCreator('Успешная регистрация!', 'success')
                dispatch(authUser({...form, ...{username: `998${formattedUsername}`}}))
            })
        } else {
            dispatch(authUser({...form, ...{username: `998${formattedUsername}`}}))
        }
    }

    useEffect(() => {
        if(state.isAuth && localStorage.getItem('user-token')) history.push('/')

    }, [state])

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
                                label="Номер"
                                name="username"
                                className="app-input reduced-label"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <MaskedInput addonBefore="+998" mask="( 11 ) 111 - 11 - 11" disabled={state.loading} />
                            </Form.Item>

                            <Form.Item
                                label="Пароль"
                                name="password"
                                className="app-input reduced-label"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input.Password disabled={state.loading}/>
                            </Form.Item>

                            <Form.Item {...{
                                wrapperCol: {span: 24},
                            }}>
                                <Button disabled={state.loading} type="primary" className="app-button submit" icon={<LoginOutlined/>} htmlType="submit">
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
                                label="Номер"
                                name="username"
                                className="app-input"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <MaskedInput addonBefore="+998" mask="( 11 ) 111 - 11 - 11" disabled={state.loading} />
                            </Form.Item>

                            <Form.Item
                                label="Пароль"
                                name="password"
                                className="app-input"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input.Password disabled={state.loading}/>
                            </Form.Item>

                            <Form.Item
                                label="Имя"
                                name="firstName"
                                className="app-input"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input disabled={state.loading}/>
                            </Form.Item>

                            <Form.Item
                                label="Фамилия"
                                name="lastName"
                                className="app-input"
                                hasFeedback={state.loading}
                                validateStatus={state.loading ? "validating" : undefined}
                                rules={[{required: true, message: 'Обязательное поле!'}]}
                            >
                                <Input disabled={state.loading}/>
                            </Form.Item>

                            <Form.Item>
                                <Button disabled={state.loading} type="primary" className="app-button submit" icon={<LoginOutlined/>} htmlType="submit">
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