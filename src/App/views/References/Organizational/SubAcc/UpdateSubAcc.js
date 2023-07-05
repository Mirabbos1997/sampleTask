import { Button, Col, Form, Input, Row, Select, Space, Spin, Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import SubAccServices from '../../../../../services/References/Organizational/SubAcc/SubAcc.services';
import classes from "./SubAcc.module.css";

import Card from "../../../../components/MainCard";
import HelperServices from '../../../../../services/Helper/helper.services';
import { useHistory, useLocation } from 'react-router-dom';
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

const UpdateSubAcc = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isClone = queryParams.get('IsClone') ? queryParams.get('IsClone') : false;
  const id = queryParams.get('id');
  const [mainForm] = Form.useForm();

  const [loader, setLoader] = useState(true);
  const [subAcc, setSubAcc] = useState([]);
  const [accList, setAccList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let docId;
      if (props.match.params.id) {
        docId = props.match.params.id;
      } else if (isClone && id) {
        docId = id;
      } else {
        docId = 0
      }

      const [subAcc, accList] = await Promise.all([
        SubAccServices.getById(docId, isClone),
        HelperServices.getAccList(),
      ]);
      setSubAcc(subAcc.data);
      setAccList(accList.data);

      mainForm.setFieldsValue({
        ...subAcc.data,
        AccID: props.match.params.id ? subAcc.data.AccID : null
      });
      setLoader(false);
    };

    fetchData().catch(err => {
      Notification('error', err);
      setLoader(false);
    });
  }, [props.match.params.id, id, isClone, mainForm]);


  const onMainFormFinish = (values) => {
    setLoader(true);
    values.ID = props.match.params.id ? props.match.params.id : 0;
    SubAccServices.update({
      ...subAcc, ...values,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
          history.push(`/SubAcc`);
          Notification('success', t('success-msg'));
        }
      })
      .catch((err) => {
        Notification('error', err);
        setLoader(false);
      });
  };

  return (
    <Card title={t("SubAcc")}>
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
                  label={t("Code")}
                  name="Code"
                  style={{ width: "100%" }}
                >
                  <Input />
                </Form.Item>
              </div>
            </Col>

            <Col xl={8} md={16}>
              <div className={classes.EmployeeEnrolmentModal}>
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
              </div>
            </Col>

            <Col xl={8} md={16}>
              <Form.Item
                label={t("AccList")}
                name="AccID"
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
                  {accList.map((accs) => (
                    <Option key={accs.ID} value={accs.ID}>
                      {accs.Code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={2} md={16}>
              <Form.Item
                label={t('IsCurrency')}
                name='IsCurrency'
                valuePropName="checked"
              >
                <Switch />
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

export default UpdateSubAcc;