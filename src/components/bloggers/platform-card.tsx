import React, {useState} from "react";
import {Avatar, Button, Card, Form, Input, Modal, Select} from "antd";

import logo from "../../static/logo-image.png"
import {EditOutlined} from "@ant-design/icons";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {useDispatch} from "react-redux";
import {getPlatforms} from "../../store/action-creators";
const { Meta } = Card
const { Option } = Select

type IProps = {
    data: {
        id: number | string
        title: string,
        url: string,
        text: string,
        subscribers: number,
        city_id: number,
        social_network_id: number,
        status: number,
        created_at: string,
        updated_at: string
    },
    cities: []
}

const PlatformCard: React.FC<IProps> = ({data, cities}) => {

    const [modalModel, setModalModel] = useState(false)
    const [form] = Form.useForm()

    const dispatch = useDispatch()

    return (
        <>
            <Card
                className="app-platform-card"
            >
                <Meta
                    avatar={<Avatar src={logo} />}
                    title={data.title}
                    description={data.text}
                />
                <div className="additional-info">
                    <span className={`status status-${data.status}`}>
                        {data.status ? 'Активна' : 'Выключенно'}
                    </span>
                    <span className="subscribers">
                        {data.subscribers.toLocaleString('ru')}
                    </span>
                </div>
                <div className="info">
                    <p className="mb-1">Город: <b>{cities ? cities.map((item: any) => {
                            return item.id === data.city_id ? item.name : ""
                        }) : cities}</b>
                    </p>
                    <p className="mb-1">Созданно: <b>{new Date(data.created_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}</b></p>
                    <p className="mb-1">Обновленно: <b>{new Date(data.updated_at).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}</b></p>
                </div>
                <div className="actions pt-3">
                    <Button onClick={() => {
                        form.resetFields()
                        form.setFieldsValue({
                            city: data.city_id,
                            title: data.title,
                            text: data.text
                        })
                        setModalModel(true)
                    }} icon={<EditOutlined />} type="primary" className="app-button">
                        Редактировать
                    </Button>
                </div>
            </Card>
            <Modal
                className="app-modal"
                visible={modalModel}
                cancelText="Отмена"
                okText="Изменить"
                onOk={() =>
                    form
                        .validateFields()
                        .then(value => {
                            request("PUT", 'blogger/platform/' + data.id, value)
                                .then(() => {
                                    form.resetFields();
                                    dispatch(getPlatforms())
                                    setModalModel(false)
                                    NotificationCreator('Успешно!', 'success')
                            })
                        })
                }
                onCancel={() => setModalModel(false)}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="city"
                        className="app-input"
                        label="Город"
                        rules={[{ required: true, message: 'Выберите город' }]}
                    >
                        <Select className="app-select">
                            {cities.map((item: any) =>
                                <Option key={`#key-${item.id}`} value={item.id} children={<span>{item.name}</span>}/>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        className="app-input"
                        label="Название площадки"
                        rules={[{ required: true, message: 'Напишите название площадки' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="text"
                        className="app-input"
                        label="Описание площадки"
                        rules={[{ required: true, message: 'Напишите описание площадки' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default PlatformCard