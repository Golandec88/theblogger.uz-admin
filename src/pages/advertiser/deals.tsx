import React, {useEffect} from "react";
import Header from '../../components/header'
import {Ctx} from "../../layouts/default";
import {useDispatch, useSelector} from "react-redux";
import {getDeals} from "../../store/advertiser/action-creatros";
import {IRootState} from "../../store/types";
import PreLoader from "../../components/pre-loader";
import Deal from "../../components/advertisers/deal"
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

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
                    {state.advertiser.loading ? <PreLoader/> :
                        state.advertiser.deals.list.length ?
                            state.advertiser.deals.list.map((item: any) => <Deal key={`key-#${item.id}`} data={item} />) :
                            <div className="app-card">
                                <h4>У вас не заключенно ни одной сделки</h4>
                                <p>Вы можете создать задание для выполнения</p>
                                <hr/>
                                <div className="app-card-actions">
                                    <Button onClick={() => history.push('/advertiser/offer/create')} type="primary"
                                            className="app-button app-button-create show-text-on-hover mb-3"
                                            size="large" icon={<PlusOutlined/>}>
                                        <span className="app-button-text">Создать задание</span>
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