import React, {useEffect} from "react";
import Header from '../../components/header'
import {Ctx} from "../../layouts/default";
import PreLoader from "../../components/pre-loader";
import Deal from "../../components/bloggers/deal";
import {Button} from "antd";
import {IssuesCloseOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../store/types";
import { useHistory } from "react-router-dom";
import {getDeals} from "../../store/blogger/action-creators";

const DealsPage: React.FC = () => {

    const state = useSelector((state: IRootState) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getDeals())
    }, [])

    return (
        <>
            <Header Ctx={Ctx} title={"Сделки"}/>
            <section className="overflow-content">
                <div style={{flexFlow: "wrap", alignItems: 'flex-start'}}>
                    {state.blogger.loading ? <PreLoader/> :
                        state.blogger.deals.list.length ?
                            state.blogger.deals.list.map((item: any) => <Deal key={`key-#${item.id}`} data={item} />) :
                            <div className="app-card">
                                <h4>У вас не заключенно ни одной сделки</h4>
                                <p>Вы можете посылать заявки на выполнение в "Ленте заданий"</p>
                                <hr/>
                                <div className="app-card-actions">
                                    <Button onClick={() => history.push('/blogger/offers')} type="primary"
                                            className="app-button app-button-create show-text-on-hover mb-3"
                                            size="large" icon={<IssuesCloseOutlined />}>
                                        <span className="app-button-text">Перейти в ленту</span>
                                    </Button>
                                </div>
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default DealsPage