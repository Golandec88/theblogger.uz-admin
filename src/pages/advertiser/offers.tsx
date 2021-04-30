import React, {Dispatch, useContext, useEffect} from "react";
import Header from '../../components/header'
import Offer from "../../components/advertisers/offer";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../store/types";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import {getAdvertiserOffers, getCities} from "../../store/action-creators";
import PreLoader from "../../components/pre-loader";
import ModalCreator from "../../plugins/modal-creator";
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {Ctx} from "../../layouts/default";

const OffersPage: React.FC = () => {

    const state = useSelector((store: IRootState) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const layoutCtx: { reload: boolean, setReload: Dispatch<boolean> } = useContext(Ctx)

    useEffect(() => {
        dispatch(getAdvertiserOffers())
    }, [layoutCtx.reload])

    const handleCardAction = (id: number | string, actionName: string) => {
        switch (actionName) {
            case 'send': {
                ModalCreator({
                    title: 'Отправить на модерацию?',
                    content: 'Ваше задание будет отправленно модератору, после блоггеры смогут к нему приступить',
                    okText: 'Отправить',
                    cancelText: 'Отмена',
                    onOk: () => {
                        request('GET', `offer/${id}/moderation`)
                            .then(() => {
                                NotificationCreator('Успешно отправленно!', 'success', 'Ваше задание успешно отправленно на проверку, ждите результата модерации')
                                dispatch(getAdvertiserOffers())
                            })
                    },
                    onCancel: () => {},
                })
                break
            }
            case 'edit': {
                ModalCreator({
                    title: 'Изменить задание?',
                    content: 'Если вы хотите изменить задание которое просмотренно модератором, вам необходимо отправить его ещё раз на проверку',
                    okText: 'Изменить',
                    cancelText: 'Отмена',
                    onOk: () => {
                        history.push('/advertiser/offer/' + id)
                    },
                    onCancel: () => console.log('cancel'),
                })
                break
            }
            case 'delete': {
                ModalCreator({
                    title: 'Удалить задание?',
                    content: 'Ваше задание будет удаленно, и блоггеры не будут его видеть',
                    okText: 'Удалить',
                    cancelText: 'Отмена',
                    onOk: () => console.log('ok'),
                    onCancel: () => console.log('cancel'),
                })
                break
            }
        }
    }

    return (
        <>
            <Header Ctx={Ctx} title={"Мои задания"}/>
            <section className="overflow-content">
                <div>
                    {state.loading ? <PreLoader /> :
                        state.offers.items.length ?
                            state.offers.items.map((offer: any) => <Offer key={offer.id}  data={{...offer}} handleAction={handleCardAction} />):
                            <div className="app-card">
                                <h4>У вас нет ни одного задания</h4>
                                <p>Вы можете создать новое задание для выполнения</p>
                                <hr/>
                                <div className="app-card-actions">
                                    <Button onClick={() => history.push('/advertiser/offer/create')} type="primary" className="app-button app-button-create show-text-on-hover mb-3"
                                            size="large" icon={<PlusOutlined/>}>
                                        <span className="app-button-text">Создать задание</span>
                                    </Button>
                                </div>
                            </div>
                    }
                </div>
                {state.offers.items.length ?
                    <Button
                        className="app-button app-button-create --fixed-right --rounded"
                        size="large"
                        type="primary"
                        onClick={() => history.push('offer/create')}
                        icon={<PlusOutlined/>}/>
                    : ""}
            </section>
        </>
    )
}

export default OffersPage