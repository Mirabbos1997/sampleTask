import { Button, Col, Form, Input, Row, Space, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import OrgSettleAccServices from '../../../../../services/References/Organizational/OrgSettleAcc/OrgSettleAcc.services';
import classes from "./OrganizationsSettlementAccount.module.css";
import moment from "moment";

import Card from "../../../../components/MainCard";
import { useHistory } from 'react-router-dom';
import { Notification } from '../../../../../helpers/notifications';
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import OrgSettleAccModal from "../OrganizationsSettlementAccount/components/Modals/OrgSettleAccModal"
import GetSubCashListModal from "../OrganizationsSettlementAccount/components/Modals/GetSubCashListModal"
import GetSubActualListModal from "./components/Modals/GetSubActualListModal"


const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

// const { Option } = Select;
const { TextArea } = Input;

const UpdateOrgSettleAcc = (props) => {
    const { t } = useTranslation();
    // const dispatch = useDispatch();
    const history = useHistory();
    const [mainForm] = Form.useForm();
    const { size } = useState([]);

    // const [loader, setLoader] = useState(true);
    // const [subAcc, setSubAcc] = useState([]);
    const [orgSettleAccModal, setOrgSettleAccModal] = useState(false);
    const [getSubCashModal, setGetSubCashModal] = useState(false);
    const [getSubActualCashModal, setGetSubActualCashModal] = useState(false);
    const [docId] = useState(props.match.params.id ? props.match.params.id : 0[0]);


    useEffect(() => {
        const fetchData = async () => {
            const [orgCash] = await Promise.all([
                OrgSettleAccServices.getById(props.match.params.id ? props.match.params.id : 0),
                // HelperServices.getAccList(),

            ]);
            // setSubAcc(subAcc.data);
            console.log(orgCash.data)
            mainForm.setFieldsValue({
                ...orgCash.data,
                // OpenDate: moment(orgCash.data.OpenDate, 'DD.MM.YYYY'),
                // CloseDate: moment(orgCash.data.CloseDate, 'DD.MM.YYYY'),

            });
            // setLoader(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            // setLoader(false);
        });
    }, [props.match.params.id, mainForm]);


    const onMainFormFinish = (values) => {
        values.ID = +docId
        values.OpenDate = values.OpenDate.format('DD.MM.YYYY');
        // values.CloseDate = values.CloseDate.format('DD.MM.YYYY');
        OrgSettleAccServices.update({
            ...values,
        })
            .then((res) => {
                if (res.status === 200) {
                    // setLoader(false);
                    history.push(`/OrganizationsSettlementAccount`);
                    Notification('success', t('success-msg'));
                }
            })
            .catch((err) => {
                Notification('error', err);
                // setLoader(false);
            });
    };

    const onReset = () => {
        mainForm.setFieldsValue({ OldCode: null });
    };

    const getCode = (code) => {
        mainForm.setFieldsValue({ OldCode: code });
    };

    const getSubCashCode = (code) => {
        mainForm.setFieldsValue({ CashSubAcc: code });
    };

    const getSubActualCashCode = (code) => {
        mainForm.setFieldsValue({ ActualSubAcc: code });
    };


    return (
        <Card title={t("OrgSettleAcc")}>
            {/* <Spin spinning={loader} size='large'> */}
            <Form
                {...layout}
                form={mainForm}
                id="mainForm"
                onFinish={onMainFormFinish}

            >
                <Row gutter={[15, 0]}>

                    <Col xl={4} md={16}>

                        <Form.Item
                            label={t("Name")}
                            name="Name"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: t("Please input valid"),
                                },
                            ]}>
                            <Input />

                        </Form.Item>

                    </Col>

                    <Col xl={4} md={8}>

                        <Form.Item
                            label={t("Code")}
                            name="Code"
                            style={{ width: "100%" }}
                        >
                            <Input disabled />
                        </Form.Item>

                    </Col>

                    <Col xl={6} md={16}>
                        <div className={classes.EmployeeEnrolmentModal}>
                            <OrgSettleAccModal
                                visible={orgSettleAccModal}
                                onCancel={() => setOrgSettleAccModal(false)}
                                getCode={getCode}
                            />

                            <Form.Item
                                label={t("OrgSettleAcc")}
                                name="OldCode"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        // required: true,
                                        message: t("Please input valid"),
                                    },
                                ]}>
                                <Input disabled
                                    style={{ color: 'black' }} />
                            </Form.Item>

                            <Button
                                type="primary"
                                onClick={() => {
                                    setOrgSettleAccModal(true);
                                }}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<SearchOutlined />}
                                size={size}
                            />

                            <Button
                                type="primary"
                                onClick={onReset}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<DeleteOutlined />}
                                size={size}
                            />
                        </div>

                    </Col>


                    <Col xl={6} md={16}>
                        <div className={classes.EmployeeEnrolmentModal}>
                            <GetSubCashListModal
                                visible={getSubCashModal}
                                onCancel={() => setGetSubCashModal(false)}
                                getSubCashCode={getSubCashCode}
                            />

                            <Form.Item
                                label={t("GetSubCashList")}
                                name="CashSubAcc"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        // required: true,
                                        message: t("Please input valid"),
                                    },
                                ]}>
                                <Input disabled
                                    style={{ color: 'black' }} />
                            </Form.Item>

                            <Button
                                type="primary"
                                onClick={() => {
                                    setGetSubCashModal(true);
                                }}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<SearchOutlined />}
                                size={size}
                            />

                            <Button
                                type="primary"
                                onClick={onReset}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<DeleteOutlined />}
                                size={size}
                            />
                        </div>

                    </Col>

                    <Col xl={6} md={16}>
                        <div className={classes.EmployeeEnrolmentModal}>
                            <GetSubActualListModal
                                visible={getSubActualCashModal}
                                onCancel={() => setGetSubActualCashModal(false)}
                                getSubActualCashCode={getSubActualCashCode}
                            />

                            <Form.Item
                                label={t("GetSubActualList")}
                                name="ActualSubAcc"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        // required: true,
                                        message: t("Please input valid"),
                                    },
                                ]}>
                                <Input disabled
                                    style={{ color: 'black' }} />
                            </Form.Item>

                            <Button
                                type="primary"
                                onClick={() => {
                                    setGetSubActualCashModal(true);
                                }}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<SearchOutlined />}
                                size={size}
                            />

                            <Button
                                type="primary"
                                onClick={onReset}
                                // shape="circle"
                                style={{ marginTop: 38 }}
                                icon={<DeleteOutlined />}
                                size={size}
                            />
                        </div>

                    </Col>

                    <Col xl={3} md={16}>
                        <Form.Item
                            name="OpenDate"
                            label={t("startDate")}>
                            <DatePicker format="DD.MM.YYYY" />
                        </Form.Item>
                    </Col>

                    <Col xl={3} md={16}>
                        <Form.Item
                            name="CloseDate"
                            label={t("endDate")}>
                            <DatePicker format="DD.MM.YYYY" />
                        </Form.Item>
                    </Col>

                    <Col xl={6} lg={12}>
                        <Form.Item
                            label={t("Comment")}
                            name="Comment"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: t('inputValidData'),
                            //     },
                            // ]}
                        >
                            <TextArea rows={1} placeholder={t("Comment")} />
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
            {/* </Spin> */}

        </Card>
    )
}

export default UpdateOrgSettleAcc;