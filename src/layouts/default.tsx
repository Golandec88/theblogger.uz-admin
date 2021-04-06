import React, {Dispatch, useEffect, useState} from "react";
import {Layout, Switch, Button} from "antd";
import {
    LogoutOutlined,
    SettingOutlined,
    ToolOutlined,
} from '@ant-design/icons';
import {changeAntdTheme} from 'dynamic-antd-theme';

import logo from '../static/logo.png'
import Menu from '../components/menu'

const {Sider, Content} = Layout

interface ICtx {
    burgerStatus: string | unknown,
    switchMenu: Dispatch<unknown>,
    notificationsStatus: string | unknown,
    switchNotifications: Dispatch<unknown>
}

export const Ctx = React.createContext<ICtx>({
    burgerStatus: undefined,
    switchMenu: () => {},
    notificationsStatus: undefined,
    switchNotifications: () => {}
})

const DefaultLayout :React.FC = ({children}) => {
    const [role, switchRole] = useState<string>('blogger')
    const [check, setCheck] = useState(false)
    const [burgerStatus, switchMenu] = useState<'opened' | 'closed' | unknown>()
    const [notificationsStatus, switchNotifications] = useState<'opened' | 'closed' | unknown>()

    useEffect(() => {
        if(!localStorage.getItem('user-role')) localStorage.setItem('user-role', 'blogger')
        switchRole(localStorage.getItem('user-role') === 'advertiser' ? 'advertiser' : 'blogger')
        setCheck(localStorage.getItem('user-role') === 'advertiser')
        changeAntdTheme(role === 'advertiser' ? '#ffad34' : '#109ffc');
    },[role])

    const onChange = () => {
        localStorage.setItem('user-role', localStorage.getItem('user-role') === 'advertiser' ? 'blogger' : 'advertiser')
        switchRole(localStorage.getItem('user-role') === 'advertiser' ? 'advertiser' : 'blogger')
        setCheck(localStorage.getItem('user-role') === 'advertiser')
        changeAntdTheme(role === 'advertiser' ? '#ffad34' : '#109ffc');
    }

    changeAntdTheme(role === 'advertiser' ? '#ffad34' : '#109ffc');

    return (
        <Layout className="h-100 app-layout-default">
            <Sider className={`app-menu theme-by-role-${role} ${burgerStatus}`} >
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
                    <div className="role-switcher">
                        <span onClick={onChange} className="cursor-pointer user-select-none">Блоггер</span>
                        <Switch checked={check} defaultChecked={localStorage.getItem('user-role') === 'advertiser'} onClick={onChange}/>
                        <span onClick={onChange} className="cursor-pointer user-select-none">Рекламодатель</span>
                    </div>
                    <hr/>
                    <Menu mode={role} />
                    <section className="app-profile-menu">
                        <hr/>
                        <div className="row no-gutters">
                            <Button
                                size="large"
                                className="app-button show-text-on-hover"
                                type="primary"
                                icon={<SettingOutlined />}
                            >
                                <span className="app-button-text">Настройки</span>
                            </Button>
                            <Button size="large" className="app-button show-text-on-hover mx-2" type="primary" icon={<ToolOutlined />} >
                                <span className="app-button-text">Инструменты</span>
                            </Button>
                            <Button size="large" className="app-button show-text-on-hover" type="primary" icon={<LogoutOutlined />} >
                                <span className="app-button-text">Выйти</span>
                            </Button>
                        </div>
                    </section>
                </section>
            </Sider>
            <Content className="app-content">
                <Ctx.Provider value={{burgerStatus, switchMenu, notificationsStatus, switchNotifications}}>
                    {children}
                </Ctx.Provider>
            </Content>
            <Sider className={`app-notifications ${notificationsStatus}`}>
                notifications
            </Sider>
        </Layout>
    )
}

export default DefaultLayout
