import React, {Dispatch, useContext, useEffect} from "react";

import Header from '../../components/header'
import {useDispatch, useSelector} from "react-redux";
import {getBloggerOffers, getCities, getPlatforms} from "../../store/action-creators";
import Offer from "../../components/bloggers/offer";
import {IRootState} from "../../store/types";
import {FrownOutlined} from "@ant-design/icons";
import PreLoader from "../../components/pre-loader";
import {Ctx} from "../../layouts/default";

const OffersPage: React.FC = () => {

    const state = useSelector((store: IRootState) => store)
    const dispatch = useDispatch()
    const layoutCtx: { reload: boolean, setReload: Dispatch<boolean> } = useContext(Ctx)

    useEffect(() => {
        dispatch(getBloggerOffers())
        dispatch(getPlatforms())
    }, [layoutCtx.reload])

    return (
        <>
            <Header Ctx={Ctx} title={"Доступные задания"}/>
            <section className="overflow-content">
                <div>
                    {state.loading ? (<PreLoader />) :
                        state.offers.items.length ?
                            state.offers.items.map((offer: any) =>
                                <Offer key={offer.id}
                                       data={offer}
                                       platforms={state.platforms.items}
                                />) :
                            <div className="app-card">
                                <h5 className="mb-0" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FrownOutlined />
                                    <span className="ml-3">К сожалению, заданий пока нет...</span>
                                </h5>
                            </div>}
                </div>
            </section>
        </>
    )
}

export default OffersPage