import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Space, Table, Tag } from "antd";

import {Ctx} from "../../layouts/admin";
import Header from "../../components/header";
import PreLoader from "../../components/pre-loader";
import {IRootState} from "../../store/types";
import {getUsers} from "../../store/action-creators";

const { Column } = Table;

const UsersPage: React.FC = () => {

    const state = useSelector((store: IRootState) => store)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [Ctx])

    return (<>
        <Header Ctx={Ctx} title={"Пользователи"}/>
        <section className="overflow-content">
            <div>
                {state.loading ?
                    (<PreLoader/>) :
                    <Table className="app-table" dataSource={state.users.items} pagination={false}>
                        <Column title="Номер телефона" dataIndex="username" key="username" />
                        <Column title="Имя" dataIndex="profile" key="profile" render={(item) => <>{item.first_name}</>}/>
                        <Column title="Фамилия" dataIndex="profile" key="profile" render={(item) => <>{item.last_name}</>}/>
                        <Column title="Роль" dataIndex="role" key="role"/>
                    </Table>
                }
            </div>
        </section>
    </>)
}

export default UsersPage