import { Button, Col, Form, Input, Row, Select, Space, Spin, Table, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ResponsiblePersonServices from '../../../../../services/References/Organizational/ResponsiblePerson/ResponsiblePerson.services';
// import classes from "./ResponsiblePerson.module.css";

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

const UpdateResponsiblePerson = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [mainForm] = Form.useForm();

    const [loader, setLoader] = useState(true);
    const [ResponsiblePerson, setResponsiblePerson] = useState([]);
    // const [ResponsiblePersonTables, setResponsiblePersonTables] = useState([]);
    const [Employee, setEmployee] = useState([]);
    const [ResponsiblePersonTypeList, setResponsiblePersonTypeList] = useState([]);
    const [itemOfExpenseList, setItemOfExpenseList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const [ResponsiblePerson, Employee, ResponsiblePersonTypeList, itemOfExpenseList ] = await Promise.all([
                ResponsiblePersonServices.getById(props.match.params.id ? props.match.params.id : 0),
                HelperServices.getEmployeeList(),
                HelperServices.getStateList(),
                HelperServices.getItemOfExpenseList(),

            ]);
            // if (props.match.params.id ? props.match.params.id : 0) {
            // console.log(ResponsiblePerson.data);    
            setResponsiblePerson(ResponsiblePerson.data);
            // setResponsiblePersonTables(ResponsiblePerson.data.Tables);
            setEmployee(Employee.data);
            setResponsiblePersonTypeList(ResponsiblePersonTypeList.data)
            setItemOfExpenseList(itemOfExpenseList.data)

            // }

            mainForm.setFieldsValue({
                ...ResponsiblePerson.data,

            });
            setLoader(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            setLoader(false);
        });
    }, [props.match.params.id, mainForm]);


    const onMainFormFinish = (values) => {
        // console.log({ ...values, Tables: ResponsiblePersonTables });
        setLoader(true);
        ResponsiblePersonServices.update({
            ...ResponsiblePerson, ...values,
            // Tables: ResponsiblePersonTables
        })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    history.push(`/ResponsiblePerson`);
                    Notification('success', t('success-msg'));
                }
            })
            .catch((err) => {
                Notification('error', err);
                setLoader(false);
            });
    };


    return (
        <Card title={t("ResponsiblePerson")}>
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
                                label={t("Employee")}
                                name="EmployeeID"
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
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {Employee.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8} md={16}>
                            <Form.Item
                                label={t("StateID")}
                                name="StateID"
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
                                    {ResponsiblePersonTypeList.map((accs) => (
                                        <Option key={accs.ID} value={accs.ID}>
                                            {accs.DisplayName}
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
                        dataSource={ResponsiblePersonTables}
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

export default UpdateResponsiblePerson;