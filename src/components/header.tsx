import React, {Dispatch, useContext} from "react";
import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import {BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

import {Ctx} from '../layouts/default'

type LayoutCtx = {
    burgerStatus: string | unknown,
    switchMenu: Dispatch<unknown>,
    notificationsStatus: string | unknown,
    switchNotifications: Dispatch<unknown>
}

const AppHeader: React.FC<{title: string}> = ({title}) => {

    const layoutCtx: LayoutCtx = useContext(Ctx)

    return (
        <Header className="app-header">
            <div className="row no-gutters">
                <Button
                    size="large"
                    onClick={() => layoutCtx.switchMenu(layoutCtx.burgerStatus === 'opened' || layoutCtx.burgerStatus === undefined ? 'closed' : 'opened')}
                    className="app-button btn-flat"
                    icon={
                        layoutCtx.burgerStatus === 'opened' || layoutCtx.burgerStatus === undefined ?
                            <MenuFoldOutlined style={{ fontSize: '150%'}} /> :
                            <MenuUnfoldOutlined style={{ fontSize: '150%'}} />}
                />
                <h3 className="mb-0 mt-1 ml-3">{title}</h3>
                <div className="spacer" />
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