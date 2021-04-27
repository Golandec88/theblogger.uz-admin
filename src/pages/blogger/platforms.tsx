import React, {Dispatch, useContext, useEffect, useState} from "react";
import Header from '../../components/header'
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IRootState} from "../../store/types";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {getCities, getPlatforms} from "../../store/blogger/action-creators";
import {Ctx} from "../../layouts/default";
import PreLoader from "../../components/pre-loader";
import PlatformCard from "../../components/bloggers/platform-card";

const PlatformsPage: React.FC = () => {

    const state = useSelector((store: IRootState) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const layoutCtx: { reload: boolean, setReload: Dispatch<boolean> } = useContext(Ctx)

    useEffect(() => {
       dispatch(getPlatforms());
       dispatch(getCities())
    }, [layoutCtx.reload])

    return (
        <>
            <Header Ctx={Ctx} title={"Мои площадки"}/>
            <section className="overflow-content">
                <div style={{flexFlow: "wrap", alignItems: 'flex-start'}}>
                    {state.blogger.loading ? <PreLoader /> :
                        state.blogger.platforms.list.length ?
                            state.blogger.platforms.list.map((item: any) => <PlatformCard key={`key-#${item.id}`} data={item} cities={state.blogger.cities}/>) :
                            (<div className="app-card">
                                <h4>У вас не зарегестрированно площадок</h4>
                                <p>Добавьте свои площадки из соц. сетей, для того чтобы принимать рекламные заявки от рекламодателей
                                    и начать их монетизацию</p>
                                <hr/>
                                <div className="app-card-actions">
                                    <Button onClick={() => history.push('/blogger/platform/create')} type="primary" className="app-button app-button-create show-text-on-hover mb-3"
                                            size="large" icon={<PlusOutlined/>}>
                                    <span className="app-button-text">Добавить площадку</span>
                                    </Button>
                                </div>
                            </div>)
                    }
                </div>
                {state.blogger.platforms.list.length ?
                    <Button
                        className="app-button app-button-create --fixed-right --rounded"
                        size="large"
                        type="primary"
                        onClick={() => history.push('/blogger/platform/create')}
                        icon={<PlusOutlined/>}/>
                    : ""}
            </section>
        </>
    )
};

export default PlatformsPage