import React, {Context, Dispatch, useContext} from "react";
import {Avatar, Button} from "antd";
import { Header } from "antd/lib/layout/layout";
import {
    BellOutlined,
    LeftOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

type LayoutCtx = {
    burgerStatus: string | unknown,
    switchMenu: Dispatch<unknown>,
    notificationsStatus: string | unknown,
    switchNotifications: Dispatch<unknown>
}

const AppHeader: React.FC<{Ctx: Context<any>, title: string, backButton?: boolean}> = ({Ctx, title, backButton}) => {

    const layoutCtx: LayoutCtx = useContext(Ctx)
    const history = useHistory()
    const path = useLocation()
    // @ts-ignore
    const firstChar = localStorage.getItem('username') !== null ? localStorage.getItem('username').substr(0, 1) : "A"
    const avatarColor = localStorage.getItem('user-is-admin') === 'true' ? '#9b59b6' : localStorage.getItem('user-role') === 'advertiser' ? '#ffad34' : '#109ffc'

    return (
        <Header className="app-header">
            <div className="row no-gutters">
                <Button
                    size="large"
                    onClick={() => layoutCtx.switchMenu(layoutCtx.burgerStatus === 'opened' || layoutCtx.burgerStatus === undefined ? 'closed' : 'opened')}
                    className="app-button btn-flat"
                    style={{marginTop: 2}}
                    icon={
                        layoutCtx.burgerStatus === 'opened' || layoutCtx.burgerStatus === undefined ?
                            <MenuFoldOutlined style={{ fontSize: '150%'}} /> :
                            <MenuUnfoldOutlined style={{ fontSize: '150%'}} />}
                />
                {backButton && (
                    <Button
                        size="large"
                        onClick={() => history.go(-1)}
                        className="app-button btn-flat"
                        style={{marginTop: 2}}
                        icon={<LeftOutlined />}
                    />
                )}
                <h3 className="mb-0 mt-1 ml-3">{title}</h3>
                <div className="spacer" />
                <h5 className="user-info">
                    {localStorage.getItem('username') ? localStorage.getItem('username') : 'anonymous'}
                </h5>
                <Avatar style={{backgroundColor: avatarColor}}>{firstChar}</Avatar>

                {localStorage.getItem('user-is-admin') === 'true' ?
                    <Button
                        size="large"
                        className="app-button btn-flat mr-3 ml-2"
                        type="primary"
                        style={{marginTop: 2}}
                        icon={<UserOutlined />}
                        onClick={() => {
                            if(path.pathname.split('/')[1] === 'admin') {
                                history.push(`/${localStorage.getItem('user-role')}/offers`)
                            } else {
                                history.push('/admin')
                            }
                        }}
                    >
                        {path.pathname.split('/')[1] === 'admin' ? 'Режим пользователя' : 'Режим админа'}
                    </Button> : ""}
                <Button
                    size="large"
                    onClick={() => layoutCtx.switchNotifications(layoutCtx.notificationsStatus === 'closed' || layoutCtx.notificationsStatus === undefined ? 'opened' : 'closed')}
                    className="app-button btn-flat mt-1"
                    icon={<BellOutlined style={{ fontSize: '150%'}} />}
                >
                    <span className="counter">
                        1
                    </span>
                </Button>
            </div>
        </Header>
    )

}

export default AppHeader;