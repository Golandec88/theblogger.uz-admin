import React, {Dispatch, useContext, useEffect} from "react";
import Header from "../../components/header";
import {getAdminOffers} from "../../store/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {Ctx} from "../../layouts/admin";
import PreLoader from "../../components/pre-loader";
import Offer from "../../components/admin/offer";
import {FrownOutlined} from "@ant-design/icons";
import {IRootState} from "../../store/types";

const OffersPage: React.FC = () => {

    const dispatch = useDispatch()
    const AdminCtx: { reload: boolean, setReload: Dispatch<boolean> } = useContext(Ctx)
    const state = useSelector((state: IRootState) => state)

    useEffect(() => {
        dispatch(getAdminOffers())
    }, [AdminCtx.reload])

    return (<>
        <Header Ctx={Ctx} title={"Модерация заданий"}/>
        <section className="overflow-content">
            <div>
                {state.loading ? (<PreLoader />) :
                    state.offers.items.length ?
                        state.offers.items.map((offer: any) => <Offer key={offer.id} {...offer} />) :
                        <div className="app-card">
                            <h5 className="mb-0" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FrownOutlined />
                                <span className="ml-3">К сожалению, заданий на модерацию пока нет...</span>
                            </h5>
                        </div>}
            </div>
        </section>
    </>)
}

export default OffersPage