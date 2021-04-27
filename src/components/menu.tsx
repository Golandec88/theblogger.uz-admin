import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import {AreaChartOutlined, FormOutlined,
    IssuesCloseOutlined, SketchOutlined, UserOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AppMenu: React.FC<{mode: string}> = ({mode}) => {
    const history = useHistory()
    const path = useLocation()
    const [activeMenu, setActiveMenu] = useState(history.location.pathname)

    useEffect(() => {
        if(activeMenu !== path.pathname) {
            const role = `/${!localStorage.getItem('user-is-admin') ? 'admin' : localStorage.getItem('user-role')}/offers`
            setActiveMenu(role)
        }
    }, [activeMenu, path])

    const getMenu = () => {
        switch (mode) {
            case 'blogger': return <>
                <Menu.Item onClick={() => history.push('/blogger/offers')} key="/blogger/offers" icon={<IssuesCloseOutlined />}>Лента заданий</Menu.Item>
                <Menu.Item onClick={() => history.push('/blogger/platforms')} key="/blogger/platforms" icon={<AreaChartOutlined />}>Площадки</Menu.Item>
                <Menu.Item onClick={() => history.push('/blogger/deals')} key="/blogger/deals" icon={<SketchOutlined />}>Сделки</Menu.Item>
                {/*<Menu.Item onClick={() => history.push('/blogger/cutaways')} key="/blogger/cutaways" icon={<IdcardOutlined />}>Визитки</Menu.Item>*/}
            </>
            case 'advertiser': return <>
                <Menu.Item onClick={() => history.push('/advertiser/offers')} key="/advertiser/offers" icon={<FormOutlined />}>Задания</Menu.Item>
                <Menu.Item onClick={() => history.push('/advertiser/search')} key="/advertiser/search" icon={<UserOutlined />}>Поиск по блоггерам</Menu.Item>
                <Menu.Item onClick={() => history.push('/advertiser/deals')} key="/advertiser/deals" icon={<SketchOutlined />}>Сделки</Menu.Item>
                {/*<Menu.Item onClick={() => history.push('/advertiser/compilations')} key="/advertiser/compilations" icon={<OrderedListOutlined />}>Подборки</Menu.Item>*/}
            </>
            case 'admin': return <>
                <Menu.Item onClick={() => history.push('/admin/offers')} key="/admin/offers" icon={<FormOutlined />}>Задания</Menu.Item>
            </>
        }
    }

    return (
        <Menu
            mode="inline"
            theme="light"
            selectedKeys={activeMenu}
            defaultSelectedKeys={[history.location]}
            onClick={(e) => setActiveMenu(e.key)}
        >
            {getMenu()}

        </Menu>
    )
}
export default AppMenu