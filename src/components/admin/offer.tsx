import {Button, Form, Input, Modal} from "antd";
import React, {useState} from "react";
import logo from '../../static/logo-image.png'
import {
    FrownOutlined, SmileOutlined,
} from "@ant-design/icons";
import {Markup} from "interweave";
import {dispatch} from "jest-circus/build/state";
import ModalCreator from "../../plugins/modal-creator";
import NotificationCreator from "../../plugins/notification-creator";
import {getOffers} from "../../store/admin/action-creators";
import {useDispatch} from "react-redux";
import request from "../../plugins/axios";

interface IProps {
    id: number,
    created_at: string,
    deadline: string,
    short_description: string,
    full_description: string,
    subscribers_count: number,
    budget: number,
    ad_page_link: string
}

const Offer :React.FC<IProps> = (props) => {

    const dispatch = useDispatch()
    const [reasonForm] = Form.useForm()
    const [modalReasonModel, setReasonModalModel] = useState(false)
    const [modalConfirmModel, setConfirmModalModel] = useState(false)

    return (
        <>
            <div className="app-job">
                <div className="app-job-header">
                    <img className="social-logo" src={logo} alt="img"/>
                    <p>
                        Задание №{props.id}, созданно: {new Date(props.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})} <br/>
                        Бюджет: <span className="color-black">{props.budget.toLocaleString('ru')} </span>
                    </p>
                    <div className="spacer" />
                    <p className="color-red">
                        До {new Date(props.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}
                    </p>
                </div>
                <div className="app-job-content">
                    <hr/>
                    <h3>{props.short_description}</h3>
                    <hr/>
                    <Markup content={props.full_description} />
                    <b>Ссылка на рекламный продукт: </b>
                    <a target="_blank" href={props.ad_page_link}>
                        {props.ad_page_link}
                    </a>
                </div>
                <div>
                    <hr/>
                    <section className="app-job-actions">
                        <Button onClick={() => setConfirmModalModel(true)} className="app-button" type="primary" icon={<SmileOutlined />}>
                            Утвердить задание
                        </Button>
                        <Button onClick={() => setReasonModalModel(true)} className="app-button" icon={<FrownOutlined />}>
                            Отказать
                        </Button>
                        <div className="spacer" />
                        <p>Минимум <span className="color-red">{props.subscribers_count}</span> подписчиков</p>
                    </section>
                </div>
            </div>
            <Modal
                className="app-modal"
                visible={modalReasonModel}
                cancelText="Отмена"
                okText="Отправить"
                onOk={() =>
                    reasonForm
                        .validateFields()
                        .then(value => {
                            request("PUT", 'admin/offer/moderation/' + props.id, {
                                ...value,
                                status: 'MODERATION_DECLINED'
                            }).then(() => {
                                reasonForm.resetFields();
                                dispatch(getOffers())
                                setReasonModalModel(false)
                                NotificationCreator('Успешно!', 'success')
                            })
                    })}
                onCancel={() => setReasonModalModel(false)}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <Form
                    form={reasonForm}
                    layout="vertical"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="decline_reason"
                        className="app-input mb-0"
                        label="Причина отказа"
                        rules={[{ required: true, message: 'Напишите причину отказа' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="app-modal"
                visible={modalConfirmModel}
                cancelText="Отмена"
                okText="Отправить"
                onOk={() => {
                    request("PUT", 'admin/offer/moderation/' + props.id, {
                        status: 'MODERATION_APPROVED'
                    }).then(() => {
                        dispatch(getOffers())
                        setConfirmModalModel(false)
                        NotificationCreator('Успешно!', 'success')
                    })
                }}
                onCancel={() => setConfirmModalModel(false)}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <h4>
                    Подвердить задание
                </h4>
                <p className="mb-0">
                    Задание будет счиатся проверенным
                </p>
            </Modal>
        </>
    )
}

export default Offer;