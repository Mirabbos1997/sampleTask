import { Button, Col, Form, Input, Row, Select, Space, Spin, Table, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import InventoryHoldingServices from '../../../../../services/References/Organizational/InventoryHolding/InventoryHolding.services';
import classes from "./InventoryHolding.module.css";

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

const UpdateInventoryHolding = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [mainForm] = Form.useForm();

    const [loader, setLoader] = useState(true);
    const [InventoryHolding, setInventoryHolding] = useState([]);
    // const [InventoryHoldingTables, setInventoryHoldingTables] = useState([]);
    const [unitsOfMeasureList, setUnitsOfMeasureList] = useState([]);
    const [inventoryHoldingTypeList, setInventoryHoldingTypeList] = useState([]);
    const [itemOfExpenseList, setItemOfExpenseList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const [InventoryHolding, unitsOfMeasureList, inventoryHoldingTypeList, itemOfExpenseList ] = await Promise.all([
                InventoryHoldingServices.getById(props.match.params.id ? props.match.params.id : 0),
                HelperServices.getUnitsOfMeasureList(),
                HelperServices.getInventoryHoldingTypeList(),
                HelperServices.getItemOfExpenseList(),

            ]);
            // if (props.match.params.id ? props.match.params.id : 0) {
            // console.log(InventoryHolding.data);    
            setInventoryHolding(InventoryHolding.data);
            // setInventoryHoldingTables(InventoryHolding.data.Tables);
            setUnitsOfMeasureList(unitsOfMeasureList.data);
            setInventoryHoldingTypeList(inventoryHoldingTypeList.data)
            setItemOfExpenseList(itemOfExpenseList.data)

            // }

            mainForm.setFieldsValue({
                ...InventoryHolding.data,

            });
            setLoader(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            setLoader(false);
        });
    }, [props.match.params.id, mainForm]);


    const onMainFormFinish = (values) => {
        // console.log({ ...values, Tables: InventoryHoldingTables });
        setLoader(true);
        InventoryHoldingServices.update({
            ...InventoryHolding, ...values,
            // Tables: InventoryHoldingTables
        })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    history.push(`/InventoryHolding`);
                    Notification('success', t('success-msg'));
                }
            })
            .catch((err) => {
                Notification('error', err);
                setLoader(false);
            });
    };


    return (
        <Card title={t("InventoryHolding")}>
            <Spin spinning={loader} size='large'>
                <Form
                    {...layout}
                    form={mainForm}
                    id="mainForm"
                    onFinish={onMainFormFinish}
                >
                    <Row gutter={[15, 0]}>

                        <Col xl={4} md={8}>
                            <div className={classes.EmployeeEnrolmentModal}>
                                <Form.Item
                                    label={t("Name")}
                                    name="Name"
                                    style={{ width: "100%" }}
                                    >
                                    <Input  />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xl={8} md={16}>
                            <div className={classes.EmployeeEnrolmentModal}>
                                <Form.Item
                                    label={t("InventoryNumber")}
                                    name="InventoryNumber"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("Please input valid"),
                                        },
                                    ]}>
                                    <Input />
                                   
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("UnitsOfMeasure")}
                                name="UnitsOfMeasureID"
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
                                    {unitsOfMeasureList.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.Code}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("IHType")}
                                name="IHTypeID"
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
                                    {inventoryHoldingTypeList.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.DisplayName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("ItemOfExpense")}
                                name="ItemOfExpenseID"
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
                                    {itemOfExpenseList.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.Code}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {/* <Form
                    component={false}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h5>{t("SettlementAccounts")}</h5>
                    </div>
                    <Table
                        size='middle'
                        pagination={false}
                        className="main-table"
                        rowKey={(record) => record.ID === 0 ? record.key : record.ID}
                        columns={columns}
                        dataSource={InventoryHoldingTables}
                        loading={loader}
                        scroll={{
                            x: "max-content",
                            y: '90vh'
                        }}
                        components={{
                            header: {
                                row: () => <StaffTableHeader
                                    addData={addTableDataHandler}
                                />
                            },
                            body: {
                                cell: EditableCell
                            }
                        }}
                    />
                </Form> */}
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

            {/* <CSSTransition
                mountOnEnter
                unmountOnExit
                in={tableListModal}
                timeout={300}
            >
                <TableDataHistoryModal
                    visible={tableListModal}
                    params={historyParams}
                    onCancel={() => {
                        setTableListModal(false);
                    }}
                    getOrganizationName={tableListModal}
                />
            </CSSTransition> */}
        </Card>
    )
}

export default UpdateInventoryHolding;