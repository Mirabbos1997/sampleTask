import { Button, Checkbox, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import moment from "moment";

import HelperServices from '../../../../../services/Helper/helper.services';
import ChildrenServices from '../../../../../services/References/Organizational/Children/Children.services';
import Card from "../../../../components/MainCard";
import TableDataHistoryModal from '../../../../components/TableDataHistoryModal';
import { Notification } from '../../../../../helpers/notifications';
import { DatePicker } from "antd";
import DepartmentsListModal from './components/DepartmentsListModal';
import TableDataHistoryChildrenModal from '../../../../components/TableDataHistoryChildrenModal';

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const docSeries = [
    { code: 'I-QQ', name: 'I-QQ Республика Каракалпакстан' },
    { code: 'I-AN', name: 'I-AN Андижанская' },
    { code: 'I-BH', name: 'I-BH Бухарская' },
    { code: 'I-GZ', name: 'I-GZ Джизакская' },
    { code: 'I-QD', name: 'I-QD Кашкадарьинская' },
    { code: 'I-NV', name: 'I-NV Навоийская' },
    { code: 'I-NA', name: 'I-NA Наманганская' },
    { code: 'I-SM', name: 'I-SM Самаркандская' },
    { code: 'I-SR', name: 'I-SR Сырдарьинская' },
    { code: 'I-SU', name: 'I-SU Сурхандарьинская' },
    { code: 'I-FR', name: 'I-FR Ферганская' },
    { code: 'I-HR', name: 'I-HR Хорезмская' },
    { code: 'I-TV', name: 'I-TV Ташкентская' },
    { code: 'I-TN', name: 'I-TN Город Ташкент' },
    { code: 'II-QQ', name: 'II-QQ Республика Каракалпакстан' },
    { code: 'II-AN', name: 'II-AN Андижанская' },
    { code: 'II-BH', name: 'II-BH Бухарская' },
    { code: 'II-GZ', name: 'II-GZ Джизакская' },
    { code: 'II-QD', name: 'II-QD Кашкадарьинская' },
    { code: 'II-NV', name: 'II-NV Навоийская' },
    { code: 'II-NA', name: 'II-NA Наманганская' },
    { code: 'II-SM', name: 'II-SM Самаркандская' },
    { code: 'II-SR', name: 'II-SR Сырдарьинская' },
    { code: 'II-SU', name: 'II-SU Сурхандарьинская' },
    { code: 'II-FR', name: 'II-FR Ферганская' },
    { code: 'II-HR', name: 'II-HR Хорезмская' },
    { code: 'II-TV', name: 'II-TV Ташкентская' },
    { code: 'II-TN', name: 'II-TN Город Ташкент' },
    { code: 'III-QQ', name: 'III-QQ Республика Каракалпакстан' },
    { code: 'III-AN', name: 'III-AN Андижанская' },
    { code: 'III-BH', name: 'III-BH Бухарская' },
    { code: 'III-GZ', name: 'III-GZ Джизакская' },
    { code: 'III-QD', name: 'III-QD Кашкадарьинская' },
    { code: 'III-NV', name: 'III-NV Навоийская' },
    { code: 'III-NA', name: 'III-NA Наманганская' },
    { code: 'III-SM', name: 'III-SM Самаркандская' },
    { code: 'III-SR', name: 'III-SR Сырдарьинская' },
    { code: 'III-SU', name: 'III-SU Сурхандарьинская' },
    { code: 'III-FR', name: 'III-FR Ферганская' },
    { code: 'III-HR', name: 'III-HR Хорезмская' },
    { code: 'III-TV', name: 'III-TV Ташкентская' },
    { code: 'III-TN', name: 'III-TN Город Ташкент' },
];

const { Option } = Select;

const UpdateChildren = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [mainForm] = Form.useForm();

    const [loader, setLoader] = useState(true);
    const [children, setChildren] = useState([]);
    const [docTypeList, setDocTypeList] = useState([]);
    const [childrenGroupTypeList, setChildrenGroupTypeList] = useState([]);
    const [workSheduleKindList, setWorkSheduleKindList] = useState([]);
    const [childHoursTypeList, setChildHoursTypeList] = useState([]);
    const [historyModal, setHistoryModal] = useState(false);
    const [departmentsListModal, setDepartmentsListModal] = useState(false);
    const [historyParams, setHistoryParams] = useState([]);
    const [departmentsListParams, setDepartmentsListParams] = useState([]);

    const [IsEmployee, setIsEmployee] = useState(null);
    const [DocumentTypeID, setDocumentTypeID] = useState(null);
    const [ChildrenGroupTypeID, setChildrenGroupTypeID] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [children, docTypeList, childrenGroupTypeList, workSheduleKindList] = await Promise.all([
                ChildrenServices.getById(props.match.params.id ? props.match.params.id : 0),
                HelperServices.getDocumentTypeList(),
                HelperServices.childrenGroupTypeList(),
                HelperServices.workSheduleKindList(),

            ]);
            // if (props.match.params.id ? props.match.params.id : 0) {
            // console.log(contractor.data);    
            setChildren(children.data);
            setDocTypeList(docTypeList.data);
            setChildrenGroupTypeList(childrenGroupTypeList.data);
            setWorkSheduleKindList(workSheduleKindList.data);

            setIsEmployee(children.data.IsEmployee);
            setDocumentTypeID(children.data.DocumentTypeID);
            setChildrenGroupTypeID(children.data.ChildrenGroupTypeID);
            // }

            mainForm.setFieldsValue({
                ...children.data,
                DateOfBirth: children.data.DateOfBirth ? moment(children.data.DateOfBirth, 'DD.MM.YYYY') : null,
                DateOfReception: children.data.DateOfReception ? moment(children.data.DateOfReception, 'DD.MM.YYYY') : null,
                DateOfDismissal: children.data.DateOfDismissal ? moment(children.data.DateOfDismissal, 'DD.MM.YYYY') : null,

            });
            setLoader(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            setLoader(false);
        });
    }, [props.match.params.id, mainForm]);

    useEffect(() => {
        HelperServices.childHoursTypeList(ChildrenGroupTypeID)
            .then(response => {
                setChildHoursTypeList(response.data)
            })
            .catch((err) => Notification('error', err));
    }, [ChildrenGroupTypeID])


    const onMainFormFinish = (values) => {
        console.log({ ...children, ...values, });
        setLoader(true);
        ChildrenServices.update({
            ...children, ...values,
        })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    history.push(`/Children`);
                    Notification('success', t('success-msg'));
                }
            })
            .catch((err) => {
                Notification('error', err);
                setLoader(false);
            });
    };

    const openHistoryModal = (params) => {
        setHistoryParams(params);
        setHistoryModal(true);
    };

    const openDepartmentsListModal = (params) => {
        setDepartmentsListParams(params);
        setDepartmentsListModal(true);
    };

    const handleIsEmployee = (e) => {
        setIsEmployee(e.target.checked);
        mainForm.setFieldsValue({
            [`DocumentTypeID`]: null,
        });
        setDocumentTypeID(null);
        setChildren({ ...children, DocumentTypeID: null });
    };

    const handleDocumentTypeID = (value) => {
        setDocumentTypeID(value);
        mainForm.setFieldsValue({
            [`DocumentSeries`]: null,
            [`DocumentNumber`]: null,
        });
        setChildren({ ...children, DocumentSeries: null, DocumentNumber: null });
    };

    const handleChildrenGroupTypeID = (value) => {
        setChildrenGroupTypeID(value);
        mainForm.setFieldsValue({
            [`MoreThanOneChild`]: null,
            [`NoPayment`]: null,
            [`IsRent`]: null,
        });
        setChildren({ ...children, MoreThanOneChild: null, NoPayment: null, IsRent: null });
    };

    const onSelect = (data) => {
        console.log(data);
        mainForm.setFieldsValue({
            [`${data.Name}`]: data.NameValue,
            [`${data.id}`]: data.ID
        });
        // editAdditionalData(mainForm.getFieldsValue());
    };

    return (
        <Card title={t("Children")}>
            <Spin spinning={loader} size='large'>
                <Form
                    {...layout}
                    form={mainForm}
                    id="mainForm"
                    onFinish={onMainFormFinish}
                >
                    <Row gutter={[15, 0]}>
                        <Col md={8} offset={16}>
                            <Form.Item
                                label="&zwnj;"
                                name="IsEmployee"
                                valuePropName="checked"
                            >
                                <Checkbox
                                    onChange={handleIsEmployee}
                                >
                                    {t("Питание сотрудника")}
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xl={4} md={8}>
                            <Form.Item
                                label={t("fio")}
                                name="Name"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        required: true,
                                        message: t("Please input valid"),
                                    },
                                ]}>
                                <Input
                                    className={'addonInput'}
                                    addonAfter={
                                        <div
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'Name',
                                            })}
                                        >
                                            <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                                        </div>
                                    }
                                />
                            </Form.Item>
                        </Col>
                        {(IsEmployee === false || IsEmployee === null) && (
                            <Col xl={4} md={8}>
                                <Form.Item
                                    label={t("docType")}
                                    name="DocumentTypeID"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("Please select status"),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t("Select from list")}
                                        allowClear
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        onChange={handleDocumentTypeID}
                                    >
                                        {docTypeList.map((type) => (
                                            <Option key={type.ID} value={type.ID}>
                                                {type.DisplayName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        )}
                        {!IsEmployee && (
                            <>
                                {(DocumentTypeID === 1) && (
                                    <Col xl={4} md={8}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Form.Item
                                                label={t("DocumentSeries")}
                                                name="DocumentSeries"
                                                style={{ width: "calc(100% - 28px)" }}
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
                                                    {docSeries.map((series) => (
                                                        <Option key={series.code} value={series.code}>
                                                            {series.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                                onClick={() => openHistoryModal({
                                                    DataID: children.ID,
                                                    TableID: 248, //children
                                                    ColumnName: 'DocumentSeries',
                                                })}
                                            />
                                        </div>
                                    </Col>
                                )}
                                {(DocumentTypeID === 2) && (
                                    <Col xl={4} md={8}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Form.Item
                                                label={t("DocumentSeries")}
                                                name="DocumentSeries"
                                                style={{ width: "calc(100% - 28px)" }}
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: t("Please select status"),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    maxLength={2}
                                                    style={{ color: 'black' }}
                                                />
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                                onClick={() => openHistoryModal({
                                                    DataID: children.ID,
                                                    TableID: 248, //children
                                                    ColumnName: 'DocumentSeries',
                                                })}
                                            />
                                        </div>
                                    </Col>
                                )}
                                {(DocumentTypeID === 3) && (
                                    <Col xl={4} md={8}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Form.Item
                                                label={t("DocumentSeries")}
                                                name="DocumentSeries"
                                                style={{ width: "calc(100% - 28px)" }}
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: t("Please select status"),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    maxLength={100}
                                                    style={{ color: 'black' }}
                                                />
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                                onClick={() => openHistoryModal({
                                                    DataID: children.ID,
                                                    TableID: 248, //children
                                                    ColumnName: 'DocumentSeries',
                                                })}
                                            />
                                        </div>
                                    </Col>
                                )}
                                {(DocumentTypeID === 3) && (
                                    <Col xl={4} md={8}>
                                        <Form.Item
                                            label={t("DocumentNumber")}
                                            name="DocumentNumber"
                                            style={{ width: "100%" }}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: t("Please input valid"),
                                                },
                                            ]}>
                                            <Input
                                                maxLength={100}
                                                className={'addonInput'}
                                                style={{ color: 'black' }}
                                                addonAfter={
                                                    <div
                                                        onClick={() => openHistoryModal({
                                                            DataID: children.ID,
                                                            TableID: 248, //children
                                                            ColumnName: 'DocumentNumber',
                                                        })}
                                                    >
                                                        <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                                                    </div>
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                )}
                                {(DocumentTypeID !== 3) && (
                                    <Col xl={4} md={8}>
                                        <Form.Item
                                            label={t("DocumentNumber")}
                                            name="DocumentNumber"
                                            style={{ width: "100%" }}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: t("Please input valid"),
                                                },
                                            ]}>
                                            <Input
                                                maxLength={7}
                                                className={'addonInput'}
                                                style={{ color: 'black' }}
                                                addonAfter={
                                                    <div
                                                        onClick={() => openHistoryModal({
                                                            DataID: children.ID,
                                                            TableID: 248, //children
                                                            ColumnName: 'DocumentNumber',
                                                        })}
                                                    >
                                                        <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                                                    </div>
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                )}
                                <Col xl={4} md={8}>
                                    <Form.Item
                                        label={t("Таб.№")}
                                        name="Number"
                                        style={{ width: "100%" }}
                                        rules={[
                                            {
                                                required: false,
                                                message: t("Please input valid"),
                                            },
                                        ]}>
                                        <Input
                                            className={'addonInput'}
                                            style={{ color: 'black' }}
                                            addonAfter={
                                                <div
                                                    onClick={() => openHistoryModal({
                                                        DataID: children.ID,
                                                        TableID: 248, //children
                                                        ColumnName: 'Number',
                                                    })}
                                                >
                                                    <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                                                </div>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("DateOfBirth")}
                                            name="DateOfBirth"
                                            style={{ width: "calc(100% - 28px)" }}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: t("Please input valid"),
                                                },
                                            ]}>
                                            <DatePicker
                                                format="DD.MM.YYYY" style={{ width: '100%' }}
                                                placeholder={t('Date')} className={'addonInput'}
                                            // onChange={onChangeDate}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'DateOfBirth',
                                            })}
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} md={8}>
                                    <Form.Item
                                        label={t("Address")}
                                        name="Address"
                                        style={{ width: "100%" }}
                                        rules={[
                                            {
                                                required: false,
                                                message: t("Please input valid"),
                                            },
                                        ]}>
                                        <Input
                                            style={{ color: 'black' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={4} md={8}>
                                    <Form.Item
                                        label={t("phoneNumber")}
                                        name="PhoneNumber"
                                        style={{ width: "100%" }}
                                        rules={[
                                            {
                                                required: false,
                                                message: t("Please input valid"),
                                            },
                                        ]}>
                                        <Input
                                            className={'addonInput'}
                                            style={{ color: 'black' }}
                                            addonAfter={
                                                <div
                                                    onClick={() => openHistoryModal({
                                                        DataID: children.ID,
                                                        TableID: 248, //children
                                                        ColumnName: 'PhoneNumber',
                                                    })}
                                                >
                                                    <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                                                </div>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("ChildrenGroupType")}
                                            name="ChildrenGroupTypeID"
                                            style={{ width: "calc(100% - 28px)" }}
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
                                                onChange={handleChildrenGroupTypeID}
                                            >
                                                {childrenGroupTypeList.map((type) => (
                                                    <Option key={type.ID} value={type.ID}>
                                                        {type.DisplayName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'ChildrenGroupTypeID',
                                            })}
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} md={8}>
                                    <Form.Item
                                        label={t("DepartmentName")}
                                        name="DepartmentName"
                                        style={{ width: "100%" }}
                                        rules={[
                                            {
                                                required: false,
                                                message: t("Please input valid"),
                                            },
                                        ]}>
                                        <Input
                                            className={'addonInput'}
                                            style={{ color: 'black' }}
                                            disabled
                                            addonAfter={
                                                <div
                                                    onClick={() => openDepartmentsListModal({
                                                        Name: 'DepartmentName',
                                                        ID: 'DepartmentID',
                                                    })}
                                                >
                                                    <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                                                </div>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("WorkSheduleKind")}
                                            name="WorkSheduleKindID"
                                            style={{ width: "calc(100% - 28px)" }}
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
                                                {workSheduleKindList.map((schedule) => (
                                                    <Option key={schedule.ID} value={schedule.ID}>
                                                        {schedule.DisplayName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'WorkSheduleKindID',
                                            })}
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("ChildHoursType")}
                                            name="ChildHoursTypeID"
                                            style={{ width: "calc(100% - 28px)" }}
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
                                                {childHoursTypeList.map((schedule) => (
                                                    <Option key={schedule.ID} value={schedule.ID}>
                                                        {schedule.DisplayName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'ChildrenGroupTypeID',
                                            })}
                                        />
                                    </div>
                                </Col>
                                {(ChildrenGroupTypeID === 1 || ChildrenGroupTypeID === 2 || ChildrenGroupTypeID === 6 || ChildrenGroupTypeID === 7) && (
                                    <Col xl={4} md={8}>
                                        <Form.Item
                                            label="&zwnj;"
                                            name="MoreThanOneChild"
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                            // onChange={handleIsEmployee}
                                            >
                                                {t("MoreThanOneChild")}
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                )}
                                {(ChildrenGroupTypeID === 8) && (
                                    <Col xl={4} md={8}>
                                        <Form.Item
                                            label="&zwnj;"
                                            name="IsRent"
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                            // onChange={handleIsEmployee}
                                            >
                                                {t("IsRent")}
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                )}
                                {(ChildrenGroupTypeID !== 8) && (
                                    <Col xl={4} md={8}>
                                        <Form.Item
                                            label="&zwnj;"
                                            name="NoPayment"
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                            // onChange={handleIsEmployee}
                                            >
                                                {t("NoPayment")}
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                )}
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("DateOfReception")}
                                            name="DateOfReception"
                                            style={{ width: "calc(100% - 28px)" }}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: t("Please input valid"),
                                                },
                                            ]}>
                                            <DatePicker
                                                format="DD.MM.YYYY" style={{ width: '100%' }}
                                                placeholder={t('Date')} className={'addonInput'}
                                            // onChange={onChangeDate}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'DateOfReception',
                                            })}
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} md={8}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Form.Item
                                            label={t("DateOfDismissal")}
                                            name="DateOfDismissal"
                                            style={{ width: "100%" }}
                                            rules={[
                                                {
                                                    required: false,
                                                    message: t("Please input valid"),
                                                },
                                            ]}>
                                            <DatePicker
                                                format="DD.MM.YYYY" style={{ width: '100%' }}
                                                placeholder={t('Date')} className={'addonInput'}
                                            // onChange={onChangeDate}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'DateOfDismissal',
                                            })}
                                        />
                                    </div>
                                </Col>
                            </>
                        )}
                        <Col md={8}>
                            <Form.Item
                                label={t("Comment")}
                                name="Comment"
                                style={{ width: "100%" }}
                                rules={[
                                    {
                                        required: false,
                                        message: t("Please input valid"),
                                    },
                                ]}>
                                <Input
                                    className={'addonInput'}
                                    style={{ color: 'black' }}
                                    addonAfter={
                                        <div
                                            onClick={() => openHistoryModal({
                                                DataID: children.ID,
                                                TableID: 248, //children
                                                ColumnName: 'Comment',
                                            })}
                                        >
                                            <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                                        </div>
                                    }
                                />
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
                        // htmlType="submit"
                        form="mainForm"
                        type="primary"
                    >
                        {t("verify")}
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

            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={historyModal}
                timeout={300}
            >
                <TableDataHistoryChildrenModal
                    visible={historyModal}
                    params={historyParams}
                    onCancel={() => {
                        setHistoryModal(false);
                    }}
                    getOrganizationName={historyModal}
                />
            </CSSTransition>
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={departmentsListModal}
                timeout={300}
            >
                <DepartmentsListModal
                    visible={departmentsListModal}
                    params={departmentsListParams}
                    onSelect={onSelect}
                    onCancel={() => {
                        setDepartmentsListModal(false);
                    }}
                />
            </CSSTransition>
        </Card>
    )
}

export default React.memo(UpdateChildren);