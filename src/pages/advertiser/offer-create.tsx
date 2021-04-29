import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Select, Slider, Switch, DatePicker, InputNumber} from "antd";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {CheckCircleFilled} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';

import data from './fields-data.json'
import request from "../../plugins/axios";
import NotificationCreator from "../../plugins/notification-creator";
import {Ctx} from "../../layouts/default";
import Header from '../../components/header'
import TextEditor from "../../components/text-editor";
import PreLoader from "../../components/pre-loader";
import {getAdInfo, getSocialNetworks} from "../../store/action-creators";
import {IRootState} from "../../store/types";

const { Option } = Select;
const { TextArea } = Input

interface IForm {
    social_network: string | undefined,
    ad_type: string | undefined,
    ad_format: string | undefined,
    ad_categories: number[] | [],
    deadline: Date,
    short_description: string | undefined,
    full_description: string | undefined,
    is_public: boolean,
    subscribers_count: number,
    budget: number,
    payment_method: 1
}

const JobCreatePage: React.FC = () => {
    const state = useSelector((state: IRootState) => state)

    const dispatch = useDispatch()
    const history = useHistory()
    const [form, setForm] = useState<IForm>({
        social_network: undefined,
        ad_type: undefined,
        ad_format: undefined,
        ad_categories: [],
        is_public: true,
        short_description: undefined,
        full_description: undefined,
        deadline: new Date(),
        subscribers_count: 0,
        budget: 0,
        payment_method: 1,
    })
    const [loading, setLoading] = useState(false)
    const id = useParams().id
    const [valForm] = Form.useForm()

    const handleChange = (val: any, field: string) => setForm({...form, [field]: val})
    const getTexts = (val: string | number | unknown, texts: string[] | undefined) => {
        if((typeof val === "string" || typeof val === "number") && texts) {
            return (
                <p className="mx-3 mb-0" style={{
                    textAlign: 'justify',
                    fontSize: 12
                }}>{texts[+val - 1]}</p>
            )
        }
    }
    const sendForm = () => {
        const url = id ? 'advertiser/offer/' + id : 'advertiser/offer'

        request(id ? 'PUT' : 'POST', url, form)
            .then(() => {
                NotificationCreator('Успешно созданно!','success', 'Вы увидите своё задание в списке')
                history.go(-1)
            })
    }

    useEffect(() => {
        dispatch(getAdInfo())
        dispatch(getSocialNetworks())
        if(id) {
            setLoading(true)
            request('GET', 'advertiser/offer/' + id)
                .then(res => {
                    setLoading(false)
                    valForm.setFieldsValue({
                        // @ts-ignore
                        social_network: res.social_network_id,
                        // @ts-ignore
                        ad_type: res.ad_type_id,
                        // @ts-ignore
                        ad_format: res.ad_format_id,
                        // @ts-ignore
                        deadline: new Date(res.deadline),
                        // @ts-ignore
                        subscribers_count: res.subscribers_count,
                        ...{...res}
                    })
                    setForm({
                        ...valForm.getFieldsValue(), ...{
                            // @ts-ignore
                            social_network: res.social_network_id,
                            // @ts-ignore
                            ad_type: res.ad_type_id,
                            // @ts-ignore
                            ad_format: res.ad_format_id,
                            // @ts-ignore
                            deadline: new Date(res.deadline),
                            // @ts-ignore
                            subscribers_count: res.subscribers_count,
                        }
                    })
                })
        }
    }, [id])

    return (
        <>
            <Header Ctx={Ctx} title={id ? "Редактирование задания" : "Создание задания"} backButton={true}/>
            <section className="overflow-content">
                <div>
                    {loading ? <PreLoader /> : (
                        <div className="app-card">
                            <Form
                                className="w-100"
                                name="job-create"
                                layout="vertical"
                                form={valForm}
                                onFinish={sendForm}
                            >
                                <Row>
                                    <Col lg={8} className="pr-3 mb-0">
                                        <Form.Item
                                            name="social_network"
                                            required
                                            rules={[{required: true, message: 'Выберите соц. сеть'}]}
                                            className="mb-2"
                                            label="Соц. сеть">
                                            <Select
                                                className="app-select"
                                                onChange={
                                                    val => {
                                                        valForm.resetFields(['ad_type'])
                                                        valForm.resetFields(['ad_format'])
                                                        handleChange(undefined, 'ad_type');
                                                        handleChange(undefined, 'ad_format');
                                                        return handleChange(val, 'social_network');
                                                    }
                                                }>
                                                {state.socialNetworks.map(item =>
                                                    //@ts-ignore
                                                    <Option key={`#key-${item.id}`}  value={item.id} children={<span>{item.description}</span>}/>
                                                )}
                                            </Select>
                                        </Form.Item>
                                        {getTexts(form.social_network, data.socialNetworksTexts)}
                                    </Col>
                                    <Col lg={8} className="pr-3 mb-0">
                                        <Form.Item
                                            name="ad_type"
                                            required
                                            rules={[{required: true, message: 'Выберите тип рекламы'}]}
                                            className="mb-2"
                                            label="Тип рекламы">
                                            <Select
                                                className="app-select"
                                                value={form.ad_type}
                                                disabled={!form.social_network}
                                                onChange={val => {
                                                    valForm.resetFields(['ad_format'])
                                                    handleChange(undefined, 'ad_format');
                                                    return handleChange(val, 'ad_type')
                                                }}
                                            >
                                                {state.adTypes.map(item =>
                                                    // @ts-ignore
                                                    item.social_network_id === form.social_network ?
                                                        // @ts-ignore
                                                        <Option key={`#key-${item.id}`} value={item.id}>{item.title}</Option> : ""
                                                )}
                                            </Select>
                                        </Form.Item>
                                        {getTexts(form.ad_type, state.adTypes.length ?
                                            // @ts-ignore
                                            state.adTypes.map(item => item.social_network_id === form.social_network ? item.description : "") : []
                                        )}
                                    </Col>
                                    <Col lg={8} className="mb-0">
                                        <Form.Item
                                            name="ad_format"
                                            required
                                            rules={[{required: true, message: 'Выберите формат рекламы'}]}
                                            className="mb-2"
                                            label="Формат рекламы">
                                            <Select
                                                className="app-select"
                                                value={form.ad_format}
                                                disabled={!form.ad_type}
                                                onChange={val => handleChange(val, 'ad_format')}
                                            >
                                                {state.adFormats.map(item =>
                                                    // @ts-ignore
                                                    item.ad_type_id === form.ad_type ?
                                                        // @ts-ignore
                                                        <Option key={`#key-${item.id}`} value={item.id}>{item.title}</Option> : ""
                                                )}
                                            </Select>
                                        </Form.Item>
                                        {getTexts(form.ad_format, state.adFormats.length ?
                                            // @ts-ignore
                                            state.adFormats.map(item => item.ad_type_id === form.ad_type ? item.description : "") : undefined
                                        )}
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col lg={24}>
                                        <Form.Item
                                            name="ad_category"
                                            required
                                            // rules={[{required: true, message: 'Выберите категории', type: "array"}]}
                                            className="mb-2"
                                            label="Категории рекламы">
                                            <Select
                                                className="app-select"
                                                value={form.ad_categories}
                                                mode={"multiple"}
                                                onChange={val => handleChange(val, 'ad_categories')}
                                            >
                                                {state.adCategories ? state.adCategories.map(
                                                    // @ts-ignore
                                                    item => <Option key={`#key-${item.id}`} value={item.id}>{item.title}</Option>
                                                ) : ""}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={24}>
                                        <Form.Item
                                            name="short_description"
                                            required
                                            className="app-input"
                                            label="Краткое описание"
                                            rules={[{required: true, message: 'Обязательное поле'}]}
                                        >
                                            <TextArea
                                                onChange={val => handleChange(val.target.value, 'short_description')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={24}>
                                        <Form.Item
                                            name="full_description"
                                            required
                                            className="app-input"
                                            label="Полное описание"
                                            rules={[{required: true, message: 'Обязательное поле'}]}
                                        >
                                            <TextEditor
                                                value={form.full_description ? form.full_description : ""}
                                                onChange={val => handleChange(val, 'full_description')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col lg={18} className="pr-2">
                                        <Form.Item
                                            name="ad_page_link"
                                            required
                                            className="app-input"
                                            label="Ссылка на рекламную страницу"
                                            rules={[{required: true, message: 'Ссылка обязательна'}]}
                                        >
                                            <Input onChange={val => handleChange(val.target.value, 'ad_page_link')}/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={6}>
                                        <Row>
                                            <div className="spacer" style={{marginLeft: 'auto'}}/>
                                            <Form.Item
                                                required
                                                className="app-input"
                                                style={{paddingTop: 30}}
                                            >
                                                <span className="mr-3">{form.is_public ? "Публичное": "Приватное"}</span>
                                                <Switch defaultChecked onChange={val => handleChange(val, 'is_public')} />
                                            </Form.Item>
                                        </Row>
                                    </Col>
                                    <Col lg={24}>
                                <span style={{
                                    textAlign: 'justify',
                                    fontSize: 12}}
                                >В сделке мы автоматически сократим ее для каждого блогера и вы сможете видеть статистику переходов по вашей рекламе. ВАЖНО! Попросите блогера в чате сделки поставить именно сокращенную ссылку (будет видна в сделке)</span>
                                        <br/>
                                        <br/>
                                        <span style={{
                                            textAlign: 'justify',
                                            fontSize: 12}}
                                        >
                                    {form.is_public ?
                                        "Ваше задание станет видно сразу для всех блогеров в 'Ленте заданий'. Они смогут самостоятельно предлагать вам свои площадки, а вы выбирать и одобрять их" :
                                        "Ваше задание не будет видно всем блогерам в 'Ленте заданий'. Вы сможете самостоятельно предлагать блогерам выполнить задание, а они будут выбирать и одобрять их"}
                                </span>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col lg={24}>
                                        <span>Количество подписчиков блогера:
                                            <b>
                                                {form.subscribers_count === 100000 ? ` ${form.subscribers_count} и выше` :
                                                    form.subscribers_count === 0 ? ' Любое' :
                                                        ` ${form.subscribers_count}`}
                                            </b>
                                        </span>
                                        <Slider
                                            max={100000}
                                            marks={{0: 0, 5000:5000, 10000: 10000, 35000: 35000, 50000: 50000, 75000: 75000, 100000: 10000}}
                                            step={null}
                                            value={form.subscribers_count}
                                            onChange={(val: number) => handleChange(val, 'subscribers_count')}
                                        />
                                        <p style={{
                                            marginTop: 40,
                                            textAlign: 'justify',
                                            fontSize: 12}}
                                        >
                                            Вы можете ограничить блогеров, которые смогут откликнуться на ваше задание в публичной ленте заданий. Выберите от какого кол-ва подписчиков блогера вы хотите принимать заявки на рекламу
                                        </p>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col lg={24}>
                                        <span className="mr-3">Установить дедлайн:</span>
                                        <DatePicker
                                            disabledDate={(current) => current && current < moment().endOf('day')}
                                            value={moment(form.deadline)}
                                            onChange={(val, dateString) => handleChange(dateString, 'deadline')}
                                        />
                                        <p className="mt-2" style={{
                                            textAlign: 'justify',
                                            fontSize: 12}}
                                        >
                                            Дата, до которой исполнитель должен будет прислать вам результат размещения. Если он не успеет это сделать, то сделка будет аннулирована, а средства за нее вернутся на ваш счет.
                                        </p>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col lg={24}>
                                        <Form.Item
                                            name="budget"
                                            required
                                            label="Бюджет на рекламную кампанию"
                                            rules={[{required: true, message: 'Укажите бюджет'}]}
                                            className="app-input"
                                        >
                                            <InputNumber
                                                className="w-100"
                                                value={form.budget}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                // @ts-ignore
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                onChange={val => handleChange(val, 'budget')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <hr/>
                                <Form.Item>
                                    <Button icon={<CheckCircleFilled />} className="app-button" type="primary" htmlType="submit">
                                        {id ? 'Применить изменения' : 'Создать'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default JobCreatePage