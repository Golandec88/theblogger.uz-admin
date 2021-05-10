import React, {useEffect, useState} from 'react'
import {LoginOutlined} from '@ant-design/icons'
import {Button, Form, Input, Modal, Tabs} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {changeAntdTheme} from "dynamic-antd-theme";
import MaskedInput from "antd-mask-input";
import {useHistory} from 'react-router-dom';

import {authUser, getAdminOffers} from "../store/action-creators";
import request from "../plugins/axios";
import NotificationCreator from "../plugins/notification-creator";
import {IRootState} from "../store/types";
import ModalCreator from "../plugins/modal-creator";

const {TabPane} = Tabs;

const AuthPage: React.FC = () => {
    const history = useHistory()
    const state = useSelector((store: IRootState) => store)
    const [modalModel, setModalModel] = useState(false)
    const [codeModalModel, setCodeModalModel] = useState(false)
    const [resetPassForm] = Form.useForm()
    const [codeForm] = Form.useForm()

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
        if(localStorage.getItem('user-token')) history.push('/')
    }, [state.user])

    return (
        <>
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
                                <a className="mb-0" onClick={() => setModalModel(true)}>
                                    Забыли пароль?
                                </a>
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
            <Modal
                className="app-modal"
                visible={modalModel}
                cancelText="Отмена"
                okText="Отправить"
                onOk={() => {
                    resetPassForm
                        .validateFields()
                        .then(() => {
                            const formattedUsername = resetPassForm.getFieldsValue().username.match(/\d/g).join('')

                            const form = {
                                username: `998${formattedUsername}`,
                                password: resetPassForm.getFieldsValue().password
                            };

                            request("POST", 'reset_password', form).then(() => {
                                setCodeModalModel(true)
                                setModalModel(false)
                                NotificationCreator('Успешно!', 'success')
                            })
                        })
                }}
                onCancel={() => setModalModel(false)}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <h4>
                    Введите свои данные
                </h4>
                <Form
                    form={resetPassForm}
                    layout="vertical"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        label="Номер телефона"
                        name="username"
                        className="app-input"
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                    >
                        <MaskedInput addonBefore="+998" mask="( 11 ) 111 - 11 - 11" disabled={state.loading} />
                    </Form.Item>
                    <Form.Item
                        label="Новый пароль"
                        name="password"
                        className="app-input"
                        hasFeedback
                        rules={[{required: true, message: 'Обязательное поле!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Подвердите пароль"
                        name="confirm"
                        className="app-input"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Обязательное поле!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                </Form>
            </Modal>
            <Modal
                className="app-modal"
                visible={codeModalModel}
                cancelText="Отмена"
                okText="Проверить"
                onOk={() => {
                    codeForm
                        .validateFields()
                        .then(() => {
                            const formattedUsername = resetPassForm.getFieldsValue().username.match(/\d/g).join('')

                            const form = {
                                username: `998${formattedUsername}`,
                                password: resetPassForm.getFieldsValue().password,
                                code: codeForm.getFieldsValue().code
                            };

                            request("POST", 'reset_password', form).then(() => {
                                setCodeModalModel(false)
                                NotificationCreator('Успешно!', 'success')
                            })
                        })
                }}
                onCancel={() => setCodeModalModel(false)}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <h4>
                    Код из сообщения
                </h4>
                <Form
                    form={codeForm}
                    layout="vertical"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="code"
                        className="app-input"
                        rules={[{ required: true, message: 'Обязательное поле!'}]}
                    >
                        <Input className="mt-2"/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default AuthPage