import React from "react";
import logo from '../../static/logo-image.png'
import {CheckOutlined, DeleteFilled, EditFilled} from "@ant-design/icons";
import { Tooltip } from "antd";
import { Markup } from 'interweave';

interface IProps {
    data: {
        id: number,
        created_at: string,
        deadline: string,
        short_description: string,
        full_description: string,
        subscribers_count: number,
        budget: number,
        ad_page_link: string,
        status: string,
        decline_reason?: string;
    },
    handleAction: (id: number | string, actionName: string) => void
}

const getStatusText = (status: string, reason?: string) => {
    let result = ""

    switch (status) {
        case "DRAFT"                    : result = 'Ваше задание созданно и вы можете отправить его модератору'; break
        case "MODERATION"               : result = 'Просматривается модератором'; break
        case "MODERATION_APPROVED"      : result = 'Ваше задание успешно прошло проверку!'; break
        case "MODERATION_DECLINED"      : result = 'Ваше задание было отклоненно!'; break
        case "PROCESSING"               : result = 'Выполняется'; break
        case "DONE"                     : result = 'Задание было выполнено'
    }

    return (<>
        <div>
            <p className={`mb-2 status status-${status}`}>{`${result}`}</p>
            {reason ? <span className={"ml-3"}>
                Причина: <b>{reason}</b>
            </span> : ""}
        </div>
    </>)
}

const Offer :React.FC<IProps> = (props) => {
    return (
        <div className="app-job">
            <div className="app-job-header">
                <span className={`status status-${props.data.status}`}>
                    {props.data.status === 'DRAFT' || props.data.status === 'MODERATION' ? "На рассмотрении" : "Проверенно"}
                </span>
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
                <div className="actions">
                    {props.data.status === 'DRAFT' || props.data.status === 'MODERATION_DECLINED' ? (
                        <Tooltip placement="left" title={"Отправить на модерацию"}>
                            <CheckOutlined onClick={() => props.handleAction(props.data.id, 'send')} className="action action-send mr-2" />
                        </Tooltip>
                    ) : ""}
                    {props.data.status === 'DRAFT' || props.data.status === 'MODERATION_DECLINED' ? (
                        <Tooltip placement="left" title={"Редактировать задание"}>
                            <EditFilled onClick={() => props.handleAction(props.data.id, 'edit')} className="action action-edit mr-2" />
                        </Tooltip>
                    ) : ""}
                    {props.data.status === 'DRAFT' || props.data.status === 'DONE' ? (
                        <Tooltip placement="left" title={"Удалить задание"}>
                            <DeleteFilled onClick={() => props.handleAction(props.data.id, 'delete')} className="action action-remove" />
                        </Tooltip>
                    ) : ""}
                </div>
            </div>
            <div className="app-job-content">
                <hr/>
                <h3>{props.data.short_description}</h3>
                <hr/>
                <div className="mb-3">
                    <Markup content={props.data.full_description} />
                </div>
                <b>Ссылка на рекламный продукт: </b>
                <a target="_blank" href={props.data.ad_page_link}>
                    {props.data.ad_page_link}
                </a>
            </div>
            <div>
                <hr/>
                <section className="app-job-actions">
                    {getStatusText(props.data.status, props.data.decline_reason)}
                    <div className="spacer" />
                    <p>Минимум <span className="color-red">{props.data.subscribers_count}</span> подписчиков</p>
                </section>
            </div>
        </div>
    )
}

export default Offer