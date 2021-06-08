import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {ArrowDownOutlined} from "@ant-design/icons";
import { Cascader } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../store/types";
import {getCities, searchBlogger} from "../store/action-creators";
import {dispatch} from "jest-circus/build/state";

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
    },
];

const Filter: React.FC = () => {

    const dispatch = useDispatch()
    const cities = useSelector((state: IRootState) => state.cities)
    const [cityModel, setCityModel] = useState()

    useEffect(() => {
        dispatch(getCities())
    }, [])
    useEffect(() => console.log(cities), [cities])

    return <article className="app-filter">
        Сортировка:
        <Button
            className="app-button ml-3"
            icon={<ArrowDownOutlined />}
        >
            По подписчикам
        </Button>
        <div className="spacer" />
        <Cascader
            fieldNames={{ label: 'name', value: 'id'}}
            options={cities}
            placeholder="Город"
        />
    </article>
}

export default Filter

function CascaderValueType(arg0: { id: number; name: string; }, CascaderValueType: any): [any, any] {
    throw new Error("Function not implemented.");
}
