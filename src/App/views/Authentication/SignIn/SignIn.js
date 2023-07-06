import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import Fade from 'react-reveal/Fade';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import "../../../../assets/scss/style.scss";
import classes from "./SignIn.module.css";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import SigninService from "../../../../services/Signin/signin";
import { Notification } from "../../../../helpers/notifications";
// import DEMO from "../../../../store/constant";
// import logo from "../../../../assets/images/uzasbo.png";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SignIn = (props) => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { Option } = Select;
  let initialLang = localStorage.i18nextLng;
  const [singinForm] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);
    // console.clear();
    setLoading(true);
    SigninService.signin(values)
      .then((response) => {
        // console.log(response.json());
        // const token = response.data.token;
        // console.log(`Token: ${token}`);
        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("userInfo", JSON.stringify(response.data.userinfo));
          setSignedIn(true);
        }
      })
      .catch((error) => {
        Notification('error', error);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => errorInfo;

  const langChange = (lang) => {
    i18next.changeLanguage(lang).catch((err) => {
      // console.log(err);
      Notification('error', err);
      return err;
    });
  };


  return (
    <>
      {isSignedIn && <Redirect to="/" exact />}
      <Breadcrumb />
      <Fade>
        <div className="auth-wrapper">
          <div className={classes.SignInLang}>
            <Select
              suffixIcon={<i className="icon feather icon-globe" />}
              defaultValue={initialLang}
              style={{ width: 120 }}
              onChange={langChange}
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <Option value="uzLat">O'zbek</Option>
              <Option value="uzCyrl">Ўзбек</Option>
              <Option value="ru">Русский</Option>
              <Option value="en">English</Option>
            </Select>
          </div>

          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-unlock auth-icon" />
                  </div>
                  <h3 className="mb-4">{t("login")}</h3>
                  {/* <div className={classes.SignInLogo}>
                <a href={DEMO.BLANK_LINK} >
                  <img
                    src={logo}
                    alt="UzASBO"
                    style={{ transition: "opacity .5s ease-in-out" }}
                  />
                </a>
                </div> */}
                </div>
                <Form
                  {...layout}
                  form={singinForm}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label={t("username")}
                    name="_username"
                    rules={[
                      { required: true, message: t("usernameVerification") },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={t("password")}
                    name="_password"
                    rules={[
                      { required: true, message: t("passwordVerification") },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label={t('subdomain')}
                    name="_subdomain"
                    rules={[{ required: true, message: 'Please input your subdomain!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item className={classes.Button}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      {t("signIn")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default SignIn;
