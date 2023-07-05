import { Button, Col, Form, Input, Row, Select, Space, Spin, Table, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ConstantValueServices from '../../../../../services/References/Organizational/ConstantValue/ConstantValue.services';
import classes from "./ConstantValue.module.css";

import Card from "../../../../components/MainCard";
import HelperServices from '../../../../../services/Helper/helper.services';
// import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { Notification } from '../../../../../helpers/notifications';


const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const { Option } = Select;

const UpdateConstantValue = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [mainForm] = Form.useForm();

    const [loader, setLoader] = useState(true);
    const [ConstantValue, setConstantValue] = useState([]);
    const [Employee, setEmployee] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const [ConstantValue, Employee, ,  ] = await Promise.all([
                ConstantValueServices.getById(props.match.params.id ? props.match.params.id : 0),
                HelperServices.getConstantTypeList(),

            ]);
            // if (props.match.params.id ? props.match.params.id : 0) {
            // console.log(ConstantValue.data);    
            setConstantValue(ConstantValue.data);
            // setConstantValueTables(ConstantValue.data.Tables);
            setEmployee(Employee.data);

            // }

            mainForm.setFieldsValue({
                ...ConstantValue.data,

            });
            setLoader(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            setLoader(false);
        });
    }, [props.match.params.id, mainForm]);


    const onMainFormFinish = (values) => {
        // console.log({ ...values, Tables: ConstantValueTables });
        setLoader(true);
        ConstantValueServices.update({
            ...ConstantValue, ...values,
            // Tables: ConstantValueTables
        })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    history.push(`/ConstantValue`);
                    Notification('success', t('success-msg'));
                }
            })
            .catch((err) => {
                Notification('error', err);
                setLoader(false);
            });
    };


    return (
        <Card title={t("ConstantValue")}>
            <Spin spinning={loader} size='large'>
                <Form
                    {...layout}
                    form={mainForm}
                    id="mainForm"
                    onFinish={onMainFormFinish}
                >
                    <Row gutter={[15, 0]}>

                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("DisplayName")}
                                name="DisplayName"
                                rules={[
                                    {
                                        required: false,
                                        message: t("Please select status"),
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={t("Select from list")}
                                    allowClear
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    {Employee.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.DisplayName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("Value")}
                                name="Value"
                                rules={[
                                    {
                                        required: false,
                                        message: t("Please select status"),
                                    },
                                ]}
                            >
                            <Input placeholder/>
                            </Form.Item>
                        </Col>
                      
                    </Row>
                </Form>
              
                <Space size='middle' className='btns-wrapper'>
                    <Button
                        type="danger"
                        onClick={() => {
                            history.goBack();
                            Notification("warning", t("not-saved"));
                        }}
                    >
                        {t("back")}
                    </Button>
                    <Button
                        htmlType="submit"
                        form="mainForm"
                        type="primary"
                    >
                        {t("save")}
                    </Button>
                </Space>
            </Spin>

     
        </Card>
    )
}

export default UpdateConstantValue;