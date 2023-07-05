import { Button, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import EmployeeServices from '../../../../../services/References/Organizational/Employee/Employee.services';
import classes from "./Employee.module.css";

import Card from "../../../../components/MainCard";
import HelperServices from '../../../../../services/Helper/helper.services';
import { useHistory } from 'react-router-dom';
import { Notification } from '../../../../../helpers/notifications';
import HistoryModal from './HistoryModal.js';
import { CSSTransition } from 'react-transition-group';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { Option } = Select;

const UpdateEmployee = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [mainForm] = Form.useForm();

  const [loader, setLoader] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [historyInputName, setHistoryInputName] = useState('');
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [employee, departmentList, status] = await Promise.all([
        EmployeeServices.getById(props.match.params.id ? props.match.params.id : 0),
        HelperServices.getDepartmentList(),
        HelperServices.getStateList()
      ]);
      setEmployee(employee.data);
      setDepartmentList(departmentList.data);
      setStatus(status.data);

      mainForm.setFieldsValue({
        ...employee.data,
      });
      setLoader(false);
    };

    fetchData().catch(err => {
      Notification('error', err);
      setLoader(false);
    });
  }, [props.match.params.id, mainForm]);


  const onMainFormFinish = (values) => {
    setLoader(true);
    EmployeeServices.update({
      ...employee, ...values,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
          history.push(`/Employee`);
          Notification('success', t('success-msg'));
        }
      })
      .catch((err) => {
        Notification('error', err);
        setLoader(false);
      });
  };

  const historyHandler = inputName => {
    setHistoryInputName(inputName);
    setHistoryModalVisible(true);
  }

  const closeHistoryModalHandler = () => {
    setHistoryModalVisible(false);
  }

  const divisionHandler = () => {
    mainForm.setFieldsValue({
      Occupation: null
    })
  }

  return (
    <Card title={t("Employee")}>
      <Spin spinning={loader} size='large'>
        <Form
          {...layout}
          form={mainForm}
          id="mainForm"
          onFinish={onMainFormFinish}
        >
          <Row gutter={[15, 0]}>
            <Col xl={6} lg={12}>
              <div className={classes.EmployeeEnrolmentModal}>
                <CSSTransition
                  mountOnEnter
                  unmountOnExit
                  in={historyModalVisible}
                  timeout={300}
                >
                  <HistoryModal
                    visible={historyModalVisible}
                    id={props.match.params.id ? props.match.params.id : 0}
                    columnName={historyInputName}
                    onCancel={closeHistoryModalHandler}
                  />
                </CSSTransition>
                <Form.Item
                  label={t("Name")}
                  name="Name"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      message: t("Please input valid"),
                    },
                  ]}
                >

                  <Input
                    className={'addonInput'}
                    addonAfter={
                      <div
                        onClick={() => historyHandler('FullName')}
                        className={classes['ant-input-group-addon']}
                      >
                        <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                      </div>
                    }
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xl={4} lg={12}>
              <div className={classes.EmployeeEnrolmentModal}>
                <CSSTransition
                  mountOnEnter
                  unmountOnExit
                  in={historyModalVisible}
                  timeout={300}
                >
                  <HistoryModal
                    visible={historyModalVisible}
                    id={props.match.params.id ? props.match.params.id : 0}
                    columnName={historyInputName}
                    onCancel={closeHistoryModalHandler}
                  />
                </CSSTransition>
                <Form.Item
                  label={t("inn")}
                  name="INN"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      message: t("Please input valid"),
                    },
                  ]}>

                  <Input
                    className={'addonInput'}
                    addonAfter={
                      <div
                        onClick={() => historyHandler('INN')}
                        className={classes['ant-input-group-addon']}
                      >
                        <i className="fa fa-history" style={{ color: 'white', margin: '0 6px' }} />
                      </div>
                    }
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xl={4} md={8}>
              <Form.Item
                label={t("Division")}
                name="Occupation"
                style={{ width: "100%" }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xl={5} lg={12}>
              <Form.Item
                label={t("status")}
                name="StateID"
                rules={[
                  {
                    required: true,
                    message: t("Please select status"),
                  },
                ]}
              >
                <Select
                  placeholder={t("Select Status")}
                  allowClear
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  {status.map((status) => (
                    <Option key={status.ID} value={status.ID}>
                      {status.DisplayName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={5} md={16}>
              <Form.Item
                label={t("Department")}
                name="Department"
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
                  onChange={divisionHandler}
                >
                  {departmentList.map((department) => (
                    <Option key={department.ID} value={department.ID}>
                      {department.Name}
                    </Option>
                  ))}
                </Select>
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

export default UpdateEmployee;