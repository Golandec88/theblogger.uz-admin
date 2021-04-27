import React, {useState} from "react";
import Header from "../components/header";
import {Button, Col, Form, Input, Row, Upload} from "antd";
import {CheckCircleFilled, UploadOutlined} from "@ant-design/icons";
import Avatar from '../components/avatar';
import { useHistory } from "react-router-dom";
import AdminCtx from '../layouts/admin'
import UserCtx from '../layouts/default'

interface IForm {
    social_network: string | undefined,
    ad_type: string | undefined,
    ad_format: string | undefined,
    ad_categories: number[] | [],
    short_description: string | undefined,
    full_description: string | undefined,
    is_public: boolean,
    subscribers_count: number,
    budget: number,
    payment_method: 1
}

const ProfilePage: React.FC = () => {
    const [form, setForm] = useState<IForm>({
        social_network: undefined,
        ad_type: undefined,
        ad_format: undefined,
        ad_categories: [],
        is_public: true,
        short_description: undefined,
        full_description: undefined,
        subscribers_count: 0,
        budget: 0,
        payment_method: 1,
    })
    const [valForm] = Form.useForm()
    const handleChange = (val: any, field: string) => setForm({...form, [field]: val})
    const history = useHistory()

    return (
        <>
            {/*<Header Ctx={localStorage.getItem('user-is-admin') === 'true' ? AdminCtx : UserCtx} title="Настройка профиля" />*/}
            <div className="app-card">
                <Form
                    className="w-100"
                    name="job-create"
                    layout="vertical"
                    form={valForm}
                >
                    <Row>
                        <Col lg={8} className="pr-3 mb-0">

                            <Form.Item
                                name="photo"
                                label="Фото профиля"
                                valuePropName="fileList"
                            >
                                <Avatar />
                            </Form.Item>
                        </Col>
                        <Col lg={8} className="pr-3 mb-0">
                            <Form.Item
                                name="firstName"
                                required
                                className="app-input"
                                label="Имя"
                                rules={[{required: true, message: 'Введите своё имя'}]}
                            >
                                <Input onChange={val => handleChange(val.target.value, 'firstName')}/>
                            </Form.Item>
                        </Col>
                        <Col lg={8} className="pr-3 mb-0">
                            <Form.Item
                                name="lastName"
                                required
                                className="app-input"
                                label="Фамилия"
                                rules={[{required: true, message: 'Введите свою фамилию'}]}
                            >
                                <Input onChange={val => handleChange(val.target.value, 'lastName')}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr/>

                    <Form.Item>
                        <Button icon={<CheckCircleFilled />} className="app-button" type="primary" htmlType="submit">
                            Обновить профиль
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <p className="mt-3 ml-2">Что бы сменить пароль зайдите на страницу "<a href="/tools" onClick={(e) => {e.preventDefault(); history.push('tools')}}>Инструменты</a>"</p>
        </>
    )
}
export default ProfilePage