import React, {Dispatch, useContext, useEffect, useState} from "react";

import Header from '../../components/header'
import {useDispatch, useSelector} from "react-redux";
import {getOffers, getPlatforms} from "../../store/blogger/action-creators";
import Offer from "../../components/bloggers/offer";
import {IRootState} from "../../store/types";
import {FrownOutlined, PlusOutlined} from "@ant-design/icons";
import PreLoader from "../../components/pre-loader";
import {Button, Form, Input, Modal} from "antd";
import {Ctx} from "../../layouts/default";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";

const OffersPage: React.FC = () => {

    const state = useSelector((store: IRootState) => store)
    const dispatch = useDispatch()
    const layoutCtx: { reload: boolean, setReload: Dispatch<boolean> } = useContext(Ctx)

    useEffect(() => {
        dispatch(getOffers())
        dispatch(getPlatforms())
    }, [dispatch, layoutCtx.reload])

    return (
        <>
            <Header Ctx={Ctx} title={"Доступные задания"}/>
            <section className="overflow-content">
                <div>
                    {state.blogger.loading ? (<PreLoader />) :
                        state.blogger.offers.list.length ?
                            state.blogger.offers.list.map((offer: any) => <Offer key={offer.id} data={offer} platforms={state.blogger.platforms.list} />) :
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
            {/*<Pagination />*/}

        </>
    )
}

export default OffersPage