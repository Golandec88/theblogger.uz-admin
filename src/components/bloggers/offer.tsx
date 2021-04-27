import {Button, Form, InputNumber, Modal, Radio} from "antd";
import React, {useEffect, useState} from "react";
import logo from '../../static/logo-image.png'
import {CheckCircleOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import {Markup} from "interweave";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {useDispatch} from "react-redux";
import {getOffers} from "../../store/blogger/action-creators";
import ModalCreator from "../../plugins/modal-creator";
import { useHistory } from "react-router-dom";

interface IProps {
    data: {
        id: number,
        created_at: string,
        deadline: string,
        short_description: string,
        full_description: string,
        subscribers_count: number,
        budget: number,
        ad_page_link: string
    },
    platforms: []
}

const Offer :React.FC<IProps> = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [form] = Form.useForm()
    const [modalModel, setModalModel] = useState(false)

    useEffect(() => {
        form.setFieldsValue({amount: props.data.budget})
    }, [])

    return (
        <>
            <div className="app-job">
                <div className="app-job-header">
                    <img className="social-logo" src={logo} alt="img"/>
                    <p>
                        Задание №{props.data.id}, созданно: {new Date(props.data.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})} <br/>
                        Бюджет: <span className="color-black">{
                            new Intl.NumberFormat('ru-RU', {
                                style: 'currency',
                                currency: 'UZS',
                                maximumFractionDigits: 0,
                            }).format(props.data.budget)}
                        </span>
                    </p>
                    <div className="spacer" />
                    <p className="color-red">
                        До {new Date(props.data.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}
                    </p>
                </div>
                <div className="app-job-content">
                    <hr/>
                    <h3>{props.data.short_description}</h3>
                    <Markup content={props.data.full_description}/>
                    <b>Ссылка на рекламный продукт: </b>
                    <a target="_blank" href={props.data.ad_page_link}>
                        {props.data.ad_page_link}
                    </a>
                </div>
                <div>
                    <hr/>
                    <section className="app-job-actions">
                        <Button onClick={() => {
                            if(props.platforms.length) setModalModel(true)
                            else {
                                NotificationCreator('У вас не зарегистрированно ни одной площадки!', 'error')
                                history.push('/blogger/platforms')
                            }
                        }} className="app-button" type="primary" icon={<CheckCircleOutlined />}>
                            Предложить свою площадку
                        </Button>
                        <Button className="app-button" onClick={() => {
                            ModalCreator({
                                title: 'Скрыть задание?',
                                content: 'Вы сможете увидеть его в \"Скрытых заданиях\"',
                                okText: 'Подвердить',
                                cancelText: 'Отмена',
                                onOk: () => {
                                    request('GET', `blogger/offer/${props.data.id}/hide`)
                                        .then(() => {
                                            NotificationCreator('Успешно!', 'success')
                                            dispatch(getOffers())
                                        })
                                }
                            })
                        }} icon={<EyeInvisibleOutlined />}>
                            Скрыть задание
                        </Button>
                        <div className="spacer" />
                        <p>Минимум <span className="color-red">{props.data.subscribers_count}</span> подписчиков</p>
                    </section>
                </div>
            </div>
            <Modal
                className="app-modal"
                visible={modalModel}
                cancelText="Отмена"
                okText="Отправить"
                onOk={() =>
                    form
                        .validateFields()
                        .then(value => {
                            request("POST", `blogger/offer/${props.data.id}/request`, value)
                                .then(() => {
                                    form.resetFields();
                                    dispatch(getOffers())
                                    setModalModel(false)
                                    NotificationCreator('Успешно!', 'success')
                            })
                        })}
                onCancel={() => {
                    form.resetFields()
                    setModalModel(false)
                }}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="platform"
                        className="app-input mb-0"
                        label="Выберите площадку"
                        rules={[{ required: true, message: 'Необходимо выбрать площадку' }]}
                    >
                        <Radio.Group className="app-platform-slider" buttonStyle="solid">
                            {props.platforms ? props.platforms.map((item: any) =>
                                <Radio.Button className="app-button" value={item.id} key={`key-#${item.id}`}>
                                    <div className="content">
                                        <img src={logo} alt="logo"/>
                                        <p className="mr-2">{item.title}</p>
                                        <div className="spacer" />
                                        <p className="text-right">Подписчики: <b>{item.subscribers}</b></p>
                                    </div>
                                </Radio.Button>
                            ) : ""}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        className="app-input mb-0"
                        label="Сумма сделки"
                        rules={[{ required: true, message: 'Введите сумму' }]}
                    >
                        <InputNumber
                            className="w-100"
                            defaultValue={props.data.budget}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            // @ts-ignore
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Offer