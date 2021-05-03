import React, {Dispatch, JSXElementConstructor, ReactElement, useEffect, useState} from "react";
import {Layout, Button, Modal} from "antd";
import {LogoutOutlined, ToolOutlined} from '@ant-design/icons';
import {changeAntdTheme} from 'dynamic-antd-theme';
import {Transition} from 'react-transition-group'

import logo from '../static/logo.png'
import Menu from '../components/menu'
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import {IRootState} from "../store/types";
import request from "../plugins/axios";

const {Sider, Content} = Layout

interface ICtx {
    burgerStatus: string | unknown,
    switchMenu: Dispatch<unknown>,
    notificationsStatus: string | unknown,
    switchNotifications: Dispatch<unknown>,
    reload: boolean,
    setReload: Dispatch<boolean>
}

export const Ctx = React.createContext<ICtx>({
    burgerStatus: undefined,
    switchMenu: () => {},
    notificationsStatus: undefined,
    switchNotifications: () => {},
    reload: false,
    setReload: () => {}
})

interface IProps {
    children: ReactElement<any, string | JSXElementConstructor<any>>
}

const AdminLayout :React.FC<IProps> = ({children}) => {
    const [reload, setReload] = useState(false)
    const [burgerStatus, switchMenu] = useState<'opened' | 'closed' | unknown>()
    const [notificationsStatus, switchNotifications] = useState<'opened' | 'closed' | unknown>()
    const state = useSelector((state: IRootState) => state)
    const [modalModel, setModalModel] = useState(false)
    let history = useHistory()

    const logout = () => {
        history.push('/login')
    }



    useEffect(() => {
        if((typeof state.error === "object" && state.error.code === 401) && !modalModel) {
            setModalModel(true)
        }
    }, [state.error])

    if(!localStorage.getItem('user-token')) {
        history.push('/login')
    }

    changeAntdTheme('#9b59b6');

    return (
        <Layout className="app-layout-default h-100">
            <Sider className={`app-menu theme-by-role-admin ${burgerStatus}`} >
                <div className="logo">
                    <svg className="bg">
                        <rect className="rest" fill="#F4FFAF"/>
                        <defs>
                            <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%"/>
                                <stop offset="100%"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <img src={logo} alt="logo"/>
                </div>
                <section className="menu-bottom">
                    <svg className="bg">
                        <rect className="rest" fill="#F4FFAF"/>
                        <defs>
                            <linearGradient id="grad2" x1="0" x2="0" y1="500" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%"/>
                                <stop offset="100%"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <hr/>
                    <Menu mode="admin"/>
                    <section className="app-profile-menu">
                        <hr/>
                        <div className="row no-gutters">
                            <Button size="large" className="app-button show-text-on-hover mx-2" type="primary" icon={<ToolOutlined />} >
                                <span className="app-button-text">Инструменты</span>
                            </Button>
                            <Button onClick={logout} size="large" className="app-button show-text-on-hover" type="primary" icon={<LogoutOutlined />} >
                                <span className="app-button-text">Выйти</span>
                            </Button>
                        </div>
                    </section>
                </section>
            </Sider>
            <Content className="app-content">
                <Transition
                    in={!!children}
                    timeout={350}
                    classNames="display"
                    unmountOnExit
                    appear
                >
                    <Ctx.Provider value={{burgerStatus, switchMenu, notificationsStatus, switchNotifications, reload, setReload}}>
                        {children}
                    </Ctx.Provider>
                </Transition>
            </Content>
            {/*<Sider className={`app-notifications ${notificationsStatus}`}>*/}
            {/*    notifications*/}
            {/*</Sider>*/}
            <Modal
                className="app-modal"
                visible={modalModel}
                title="Ваша сессия была завершенна"
                okText="Продлить"
                cancelText="Выйти"
                onOk={() => {
                    request('POST', 'token/refresh', {refresh_token: localStorage.getItem('user-refresh-token')})
                        .then((res) => {
                            //@ts-ignore
                            localStorage.setItem('user-token', res.token)
                            //@ts-ignore
                            localStorage.setItem('user-refresh-token', res.refresh_token)
                            setReload(!reload)
                            setModalModel(false)
                        })}}
                onCancel={() => {
                    setModalModel(false)
                    logout()
                }}
                okButtonProps={{className: "app-button"}}
                cancelButtonProps={{className: "app-button"}}
            >
                <p className="mb-0">Хотите продлить?</p>
            </Modal>
        </Layout>
    )
}

export default AdminLayout
