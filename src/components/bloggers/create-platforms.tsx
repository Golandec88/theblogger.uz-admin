import React from "react";
import {Button, Form, Input} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import request from "../../plugins/axios";
import { useHistory } from "react-router-dom";

const CreatePlatforms: React.FC<{platform: string}> = ({platform}) => {

    const history = useHistory()

    switch (platform) {
        case 'Telegram' : {
            return (
                <>
                    <hr/>
                    <h5>Добавление Telegram канала</h5>
                    <p>
                        Для добавления вашего канала в базу рекламных площадок вам необходимо подтвердить право владения таким каналом. В случае возникновения затруднений, напишите в онлайн-чат
                    </p>
                    <hr/>
                    <b>Пошаговая инструкция:</b>
                    <ul className="pl-3">
                        <li className="mt-2">
                            Зайдите в Telegram и запустите нашего бота <span className="color-primary">@test_blogger_bot</span>
                        </li>
                        <li>
                            Следуя инструкциям бота, добавьте в него ваш канал
                        </li>
                        <li>
                            В меню управления добавленным каналом в телеграм-боте выбрать “Получить код” и ввести полученный код здесь на сайте его в поле ниже:
                        </li>
                    </ul>
                    <Form onFinish={val => request('POST', 'blogger/platform', {...val}).then(() => history.go(-1))}>
                        <Form.Item name="code" className="app-input">
                            <div className="d-flex">
                                <Input />
                                <Button htmlType="submit" type="primary" icon={<CheckCircleOutlined />} className="app-button ml-3 pr-4">Проверить</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </>
            )
        }
        default: return (<></>)
    }
}

export default CreatePlatforms