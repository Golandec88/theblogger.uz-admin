import React from "react";
import {Menu} from "antd";
import {AreaChartOutlined, FormOutlined,
    IdcardOutlined,
    IssuesCloseOutlined, OrderedListOutlined, SketchOutlined, UserOutlined} from "@ant-design/icons";

const AppMenu: React.FC<{mode: string}> = ({mode}) => {

    return (
        <Menu
            mode="inline"
            theme="light"
        >
            {mode === 'blogger' ? (
                <>
                    <Menu.Item key="1" icon={<IssuesCloseOutlined />}>Лента заданий</Menu.Item>
                    <Menu.Item key="2" icon={<AreaChartOutlined />}>Площадки</Menu.Item>
                    <Menu.Item key="3" icon={<SketchOutlined />}>Сделки</Menu.Item>
                    <Menu.Item key="4" icon={<IdcardOutlined />}>Визитки</Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="5" icon={<UserOutlined />}>Поиск по блоггерам</Menu.Item>
                    <Menu.Item key="6" icon={<FormOutlined />}>Задания</Menu.Item>
                    <Menu.Item key="7" icon={<SketchOutlined />}>Сделки</Menu.Item>
                    <Menu.Item key="8" icon={<OrderedListOutlined />}>Подборки</Menu.Item>
                </>
            )}

        </Menu>
    )
}
export default AppMenu