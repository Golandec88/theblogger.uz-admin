import React, {useEffect, useState} from "react";
import Header from "../components/header";
import {Avatar, Button, Col, Form, Input, Row, Upload} from "antd";
import {CheckCircleFilled, LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import AdminCtx from '../layouts/admin'
import UserCtx from '../layouts/default'
import NotificationCreator from "../plugins/notification-creator";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../store/action-creators";
import {IRootState} from "../store/types";
import request from "../plugins/axios";

const {TextArea} = Input

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

function getBase64(img: Blob, callback: { (img: any): void; (arg0: string | ArrayBuffer | null): any; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const beforeUpload = (file: { type: string; size: number; }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) NotificationCreator('Доступные форматы: jpg/png', 'error');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) NotificationCreator('Максиммальный размер изображения 2мб', 'error');

    return isJpgOrPng && isLt2M;
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

    const state = useSelector((store: IRootState) => store)
    const history = useHistory()
    const dispatch = useDispatch()

    // @ts-ignore
    const firstChar = localStorage.getItem('username') !== null ? localStorage.getItem('username').substr(0, 1) : "A"
    const avatarColor = localStorage.getItem('user-role') === 'advertiser' ? '#ffad34' : '#109ffc'
    const [imgUrl, setImgUrl] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)

    const handleChange = (val: any, field: string) => setForm({...form, [field]: val})

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])

    useEffect(() => {
        if(state.user) {
            valForm.setFieldsValue({
                firstName: state.user.firstName,
                lastName: state.user.lastName,
                photo: state.user.photo
            })
        }
    }, [state.user])

    const handleChangeImage = (info: any) => {
        getBase64(info.file.originFileObj, (img: any) => {
            setImgUrl(img)
            valForm.setFieldsValue({...valForm.getFieldsValue(), photo: img})
            setImgLoading(false)
        });
    }

    const sendForm = (form: any) => {
        request('POST', 'user/profile', {
            firstName: form.firstName,
            lastName: form.lastName,
            photo: form.photo
        }).then(() => {
            NotificationCreator('Успешно обновленно!', 'success')
            dispatch(getUserInfo())
        })
    }

    return (
        <>
            {/*<Header Ctx={localStorage.getItem('user-is-admin') === 'true' ? AdminCtx : UserCtx} title="Настройка профиля" />*/}
            <div className="app-card">
                <Form
                    className="w-100"
                    name="job-create"
                    layout="vertical"
                    form={valForm}
                    onFinish={sendForm}
                >
                    <Row className="mb-0">
                        <Col lg={8} className="pr-3 mb-0">
                            <Form.Item
                                name="photo"
                                label="Фото профиля"
                                valuePropName="src"
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="app-avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeImage}
                                >
                                    {   //@ts-ignore
                                        imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> :
                                        <div>
                                            {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                            <div style={{ marginTop: 8 }}>Загрузить</div>
                                        </div>
                                    }
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col lg={16} className="pr-3 mb-0">

                            <Row>
                                <Col lg={12} className="pr-3 mb-0">
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
                                <Col lg={12} className="pr-3 mb-0">
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
                                <Col lg={24} className="pr-3 mb-0">
                                    <Form.Item
                                        name="about"
                                        className="app-input"
                                        label="О себе"
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>
                            </Row>
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