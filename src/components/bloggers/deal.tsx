import React from "react";
import {Avatar, Button, Card} from "antd";
import logo from "../../static/logo-image.png";
import {CheckCircleFilled} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import {Markup} from "interweave";
import ModalCreator from "../../plugins/modal-creator";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {useDispatch} from "react-redux";
import {getBloggerDeals} from "../../store/action-creators";

const BloggerDeal: React.FC<{data: any}> = ({data}) => {

    const dispatch = useDispatch()

    const getStatusText = (status: string) => {
        switch (status) {
            case "REQUESTED" : return "Заявка отправленна!";
            case "DECLINED" : return "Заявка отклонена";
            case "PROCESSING" : return "Выполняется";
            case "ADVERTISER_CHECK" : return "Проверяется рекламодателем";
            case "ADVERTISER_DECLINED" : return "Рекламодатель признал задание не завершенным";
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
                    {data.status === 'PROCESSING' ? (
                        <Button icon={<CheckCircleFilled />} type="primary" className="app-button mr-2"
                                onClick={() => ModalCreator({
                                    title: 'Отправить задание на проверку?',
                                    content: 'Команда \"The blogger\", советует перепроверять задание перед отправкой',
                                    okText: 'Отправить',
                                    cancelText: 'Отмена',
                                    onOk: () => {
                                        request('GET', `blogger/deal/${data.id}/check`)
                                            .then(() => {
                                                NotificationCreator('Успешно!', 'success', 'Ждите ответа рекламодателя')
                                                dispatch(getBloggerDeals())
                                            })
                                    }
                                })}>
                            Отправить на проверку
                        </Button>
                    ) : ""}
                </div>
            </Card>
        </>
    )
}

export default BloggerDeal