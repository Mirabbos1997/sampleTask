import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from "../../../../components/MainCard";
import { CSSTransition } from 'react-transition-group';
import TableDataHistoryModal from '../../../../components/TableDataHistoryModal';
import { Notification } from '../../../../../helpers/notifications';
import TableSubAccModal from './components/TableSubAccModal';
import PermanentAssetServices from "./../../../../../services/References/Organizational/PremanetAsset/PremanetAsset.services";
import HelperServices from '../../../../../services/Helper/helper.services';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { Option } = Select;

const UpdatePermanentAsset = (props) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const history = useHistory();
  const [mainForm] = Form.useForm();

  const [loader, setLoader] = useState(true);
  const [tableListModal, setTableListModal] = useState(false);
  const [tableSubAccModal, setSubAccModal] = useState(false);
  const [permanentAsset, setPermanentAsset] = useState([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);
  const [PAGroup, setPAGroup] = useState([]);
  const [PASubGroup, setPASubGroup] = useState([]);
  const [historyParams, setHistoryParams] = useState([]);
  const [subAccParams, setSubAccParams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [permanentAsset, unitsOfMeasure] = await Promise.all([
        PermanentAssetServices.getById(props.match.params.id ? props.match.params.id : 0),
        HelperServices.getUnitsOfMeasureList(),

      ]);
      // if (props.match.params.id ? props.match.params.id : 0) {
      // console.log(contractor.data);    
      setPermanentAsset(permanentAsset.data);
      setUnitsOfMeasure(unitsOfMeasure.data);
      // }

      if (props.match.params.id) {
        HelperServices.getPAGroupList(permanentAsset.data.SAcc.AccID)
          .then(response => {
            setPAGroup(response.data)
          })
          .catch((err) => Notification('error', err));
        HelperServices.getPASubGroupList(permanentAsset.data.SubAccID)
          .then(response => {
            setPASubGroup(response.data)
          })
          .catch((err) => Notification('error', err));
      }

      mainForm.setFieldsValue({
        ...permanentAsset.data,

      });
      setLoader(false);
    };

    fetchData().catch(err => {
      Notification('error', err);
      setLoader(false);
    });
  }, [props.match.params.id, mainForm]);

  const openTableListModal = (params) => {
    setHistoryParams(params);
    setTableListModal(true);
  };

  const openSubAccModal = (params) => {
    setSubAccParams(params);
    setSubAccModal(true);
  };

  const onSelect = (data) => {
    // console.log({ [`${data.Name}`]: data.Code });
    mainForm.setFieldsValue({ [`${data.Name}`]: data.Code });
  };

  const onMainFormFinish = (values) => {
    // console.log({ ...permanentAsset, ...values});
    setLoader(true);
    PermanentAssetServices.update({
      ...permanentAsset, ...values,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
          history.push(`/Contractors`);
          Notification('success', t('success-msg'));
        }
      })
      .catch((err) => {
        Notification('error', err);
        setLoader(false);
      });
  };

  return (
    <Card title={t("PermanentAsset")}>
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
                label={t("Name")}
                name="Name"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
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
                label={t("InventoryNumber")}
                name="InventoryNumber"
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
                label={t("DeliveryDate")}
                name="DeliveryDate"
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
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'DeliveryDate',
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
                  label={t("UnitsOfMeasure")}
                  name="UnitsOfMeasureID"
                  style={{ width: "calc(100% - 28px)" }}
                  rules={[
                    {
                      required: false,
                      message: t("Please input valid"),
                    },
                  ]}>
                  <Select
                    allowClear
                    className={'addonInput'}
                    placeholder={t("UnitsOfMeasure")}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    {unitsOfMeasure.map((measure) => (
                      <Option key={measure.ID} value={measure.ID}>
                        {measure.Code}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                  onClick={() => openTableListModal({
                    DataID: permanentAsset.ID,
                    TableID: 180, //PermanentAsset
                    ColumnName: 'UnitsOfMeasureID',
                  })}
                />
              </div>
            </Col>
            <Col xl={4} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Form.Item
                  label={t("Group")}
                  name="PAGroupID"
                  style={{ width: "calc(100% - 28px)" }}
                  rules={[
                    {
                      required: false,
                      message: t("Please input valid"),
                    },
                  ]}>
                  <Select
                    allowClear
                    className={'addonInput'}
                    placeholder={t("Group")}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    {PAGroup.map((PAGroup) => (
                      <Option key={PAGroup.ID} value={PAGroup.ID}>
                        {PAGroup.Name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                  onClick={() => openTableListModal({
                    DataID: permanentAsset.ID,
                    TableID: 180, //PermanentAsset
                    ColumnName: 'PAGroupID',
                  })}
                />
              </div>
            </Col>
            <Col xl={4} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Form.Item
                  label={t("SubGroup")}
                  name="PASubGroup"
                  style={{ width: "calc(100% - 28px)" }}
                  rules={[
                    {
                      required: false,
                      message: t("Please input valid"),
                    },
                  ]}>
                  <Select
                    allowClear
                    className={'addonInput'}
                    placeholder={t("SubGroup")}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    {PASubGroup.map((PASubGroup) => (
                      <Option key={PASubGroup.ID} value={PASubGroup.ID}>
                        {PASubGroup.Code}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  icon={<i className="fa fa-history" style={{ color: 'white', margin: '0 6px', fontSize: '14px' }} />}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', width: "28px" }}
                  onClick={() => openTableListModal({
                    DataID: permanentAsset.ID,
                    TableID: 180, //PermanentAsset
                    ColumnName: 'PASubGroupID',
                  })}
                />
              </div>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("AgeingRate")}
                name="AgeingRate"
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
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'AgeingRate',
                      })}
                    >
                      <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("SubAccCode")}
                name="SubAccCode"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please input valid"),
                  },
                ]}>
                <Input
                  className={'addonInput'}
                  disabled
                  addonBefore={
                    <div
                      onClick={() => openSubAccModal({
                        AccID: 1, //constant
                        Name: "SubAccCode",
                      })}
                    >
                      <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                  addonAfter={
                    <div
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'SubAccCode',
                      })}
                    >
                      <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("AgeingSubAcc")}
                name="AgeingSubAcc"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please input valid"),
                  },
                ]}>
                <Input
                  className={'addonInput'}
                  disabled
                  addonBefore={
                    <div
                      onClick={() => openSubAccModal({
                        AccID: 2, //constant
                        Name: "AgeingSubAcc",
                      })}
                    >
                      <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                  addonAfter={
                    <div
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'AgeingSubAcc',
                      })}
                    >
                      <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("RetireAgeingSubAccCode")}
                name="RetireAgeingSubAccCode"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please input valid"),
                  },
                ]}>
                <Input
                  className={'addonInput'}
                  disabled
                  addonBefore={
                    <div
                      onClick={() => openSubAccModal({
                        AccID: 3, //constant
                        Name: "RetireAgeingSubAccCode",
                      })}
                    >
                      <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                  addonAfter={
                    <div
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'RetireAgeingSubAccCode',
                      })}
                    >
                      <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("RetireReappSubAccCode")}
                name="RetireReappSubAccCode"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please input valid"),
                  },
                ]}>
                <Input
                  className={'addonInput'}
                  disabled
                  addonBefore={
                    <div
                      onClick={() => openSubAccModal({
                        AccID: 4, //constant,
                        Name: "RetireReappSubAccCode",
                      })}
                    >
                      <i className="fa fa-search" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                  addonAfter={
                    <div
                      onClick={() => openTableListModal({
                        DataID: permanentAsset.ID,
                        TableID: 180, //PermanentAsset
                        ColumnName: 'RetireReappSubAccCode',
                      })}
                    >
                      <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                    </div>
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} md={8}>
              <Form.Item
                label={t("ItemOfExpenseForPermanentAsset")}
                name="PASubGroup"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: false,
                    message: t("Please input valid"),
                  },
                ]}>
                <Select
                  allowClear
                  className={'addonInput'}
                  placeholder={t("ItemOfExpenseForPermanentAsset")}
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  {PASubGroup.map((PASubGroup) => (
                    <Option key={PASubGroup.ID} value={PASubGroup.ID}>
                      {PASubGroup.Code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={8} md={16}>
              <Form.Item
                label={t("Comment")}
                name="Comment"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please input valid"),
                  },
                ]}>
                <Input
                  placeholder={t("Comment")}
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
          {/* <Button
            // htmlType="submit"
            form="mainForm"
            type="primary"
          >
            {t("verify")}
          </Button> */}
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
        in={tableListModal}
        timeout={300}
      >
        <TableDataHistoryModal
          visible={tableListModal}
          params={historyParams}
          onCancel={() => {
            setTableListModal(false);
          }}
        />
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={tableSubAccModal}
        timeout={300}
      >
        <TableSubAccModal
          visible={tableSubAccModal}
          params={subAccParams}
          onSelect={onSelect}
          onCancel={() => {
            setSubAccModal(false);
          }}
        />
      </CSSTransition>
    </Card>
  )
}

export default React.memo(UpdatePermanentAsset);