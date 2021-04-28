import React, {useState} from "react";
import {Avatar, Button, Card, Form, Input, Modal} from "antd";
import logo from "../../static/logo-image.png";
import {CheckCircleFilled, CloseCircleOutlined} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import {Markup} from "interweave";
import ModalCreator from "../../plugins/modal-creator";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {getAdvertiserDeals} from "../../store/action-creators";
import {useDispatch} from "react-redux";

const AdvertiserDeal: React.FC<{data: any}> = ({data}) => {

    const dispatch = useDispatch()
    const [reasonForm] = Form.useForm()
    const [modalReasonModel, setReasonModalModel] = useState(false)

    const getStatusText = (status: string) => {
        switch (status) {
            case "REQUESTED" : return "Пришла заявка на выполнение!";
            case "DECLINED" : return "Вы отказали в выполнении этого задания";
            case "PROCESSING" : return "Выполняется";
            case "ADVERTISER_CHECK" : return "Нуждается в проверке";
            case "ADVERTISER_DECLINED" : return "Задание не прошло проверку рекламодателем";
            case "DONE" : return "Выполнено";
        }
    }

    return (
        <>
            <Card
                className="app-deal-card"
            >
                <Meta
                    avatar={<Avatar src={logo} />}
                    title={data.offer.short_description}
                    description={<Markup content={data.offer.full_description} />}
                />
                <span className={`status status-${data.status}`}>
                    {getStatusText(data.status)}
                </span>
                <p className="comment mb-1">
                    Сумма сделки: {
                        new Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'UZS',
                            maximumFractionDigits: 0,
                        }).format(data.amount)
                    }
                </p>
                <div className="info">
                    <p className="mb-1">
                        Сделка {data.status === "DONE" ? "была активна" : "активна"} с <b>{
                            new Date(data.offer.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})
                        }</b> до <b>{
                            new Date(data.offer.deadline).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})
                        }</b>
                    </p>
                    {data.status === 'DECLINED' ? (
                        <>
                            <hr/>
                            <p className="mb-0">
                                Причина отклонения: <b>{data.decline_reason}</b>
                            </p>
                        </>
                    ) : ""}
                </div>
                <div className="actions pt-2">
                    {data.status === 'REQUESTED' ? (
                            <>
                                <Button icon={<CheckCircleFilled />} type="primary" className="app-button mr-2"
                                        onClick={() => ModalCreator({
                                            title: 'Принять сделку?',
                                            content: 'Внимательно смотрите за суммой сделки, она может отличатся в зависимости от предложения блоггера',
                                            okText: 'Принять',
                                            cancelText: 'Отмена',
                                            onOk: () => {
                                                request('GET', `advertiser/deal/${data.id}/approve`)
                                                    .then(() => {
                                                        NotificationCreator('Успешно!', 'success', 'Ждите ответа блоггера')
                                                        dispatch(getAdvertiserDeals())
                                                    })
                                            }
                                        })}>
                                    Принять заявку
                                </Button>
                                <Button onClick={() => setReasonModalModel(true)} icon={<CloseCircleOutlined />} className="app-button">
                                    Отклонить
                                </Button>
                            </>
                    ) : data.status === 'ADVERTISER_CHECK' || data.status === 'ADVERTISER_DECLINED' ? (
                        <>
                            <Button icon={<CheckCircleFilled />} type="primary" className="app-button mr-2"
                                    onClick={() => ModalCreator({
                                        title: 'Завершить задание?',
                                        content: 'Команда \"The blogger\", советует тщательно проверять задание перед его завершением',
                                        okText: 'Завершить',
                                        cancelText: 'Отмена',
                                        onOk: () => {
                                            request('GET', `advertiser/deal/${data.id}/done`)
                                                .then(() => {
                                                    NotificationCreator('Успешно!', 'success', 'Успешно!')
                                                    dispatch(getAdvertiserDeals())
                                                })
                                        }
                                    })}>
                                Подвердить
                            </Button>
                            <Button onClick={() => setReasonModalModel(true)} icon={<CloseCircleOutlined />} className="app-button">
                                Отклонить
                            </Button>
                        </>
                    ) : ""}
                </div>
            </Card>
            <Modal
                className="app-modal"
                visible={modalReasonModel}
                cancelText="Отмена"
                okText="Отправить"
                onOk={() =>
                    reasonForm
                        .validateFields()
                        .then(value => {
                            request("POST", `advertiser/deal/${data.id}/decline`, value).then(() => {
                                reasonForm.resetFields();
                                dispatch(getAdvertiserDeals())
                                setReasonModalModel(false)
                                NotificationCreator('Принято, спасибо!', 'success')
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
        </>
    )
}

export default AdvertiserDeal