import React, {useEffect, useState} from "react";
import Header from "../../components/header";

import {Button, Select} from 'antd';
import {CheckCircleOutlined} from "@ant-design/icons";
import CreatePlatforms from "../../components/bloggers/create-platforms";
import {useDispatch, useSelector} from "react-redux";
import {getSocialNetworks} from "../../store/action-creators";
import {Ctx} from "../../layouts/default";
import {IRootState} from "../../store/types";

const { Option } = Select;

const PlatformCreatePage: React.FC = () => {

    const [selected, select] = useState(false)
    const [selectedVal, selectVal] = useState<string>('Telegram')
    const dispatch = useDispatch()
    const socialNetworks = useSelector((state: IRootState) => state.socialNetworks)

    useEffect(() => {
        dispatch(getSocialNetworks())
    }, [])

    return (
        <>
            <Header Ctx={Ctx} title="Регистрация площадки" backButton={true}/>
            <section className="overflow-content">
                <div>
                    <div className="app-card">
                        <h4>Выберите соц. сеть</h4>
                        <p>Авторизация каждой площадки производится разными способами</p>
                        <hr/>
                        <Select size="large" defaultValue='telegram' className="app-select" style={{minWidth: 250}} onChange={val => {select(false); selectVal(val)}}>
                            {socialNetworks.map((item: {title: string, description: string}, index) => (<Option key={index} value={item.title}>{item.description}</Option>))}
                        </Select>
                        <Button onClick={() => select(true)} size="large" icon={<CheckCircleOutlined />} type="primary" className="app-button ml-4">
                            Авторизовать
                        </Button>
                        {selected && <CreatePlatforms platform={selectedVal}/>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlatformCreatePage