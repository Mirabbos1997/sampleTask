import { Button, Form, Input, Tooltip, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";
import { Link, useLocation } from 'react-router-dom';

import Card from "../../../../components/MainCard";
import TableData from './components/TableData';
import { Notification } from '../../../../../helpers/notifications';
import { getListStartAction, setListFilter } from './_redux/getListSlice';
import OrgSettleAccServices from '../../../../../services/References/Organizational/OrgSettleAcc/OrgSettleAcc.services';

// const { Option } = Select;

const OrganizationsSettlementAccount = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [filterForm] = Form.useForm();
    const dispatch = useDispatch();
    const tableList = useSelector((state) => state.orgSettleAccList);
    const tablePagination = tableList?.paginationData;
    const tableFilterData = tableList?.filterData;
    const mainLoader = tableList?.mainLoader;
    const filterSearchVal = tableList.filterData[`${tableList?.filterType}`];

    const [filterType, setFilterType] = useState(tableList.filterType);

    useEffect(() => {
        dispatch(
            getListStartAction({
                ...tablePagination,
                ...tableFilterData,
            })
        );
    }, [dispatch, tablePagination, tableFilterData]);

    const filterTypeHandler = (value) => {
        setFilterType(value);
    }

    const onFinish = (values) => {
        dispatch(setListFilter({
            ...values,

            [values?.filterType]: values?.Search,

        }));
    };

    const onSearch = () => {
        filterForm.validateFields()
            .then(values => {
                onFinish(values);
            })
    };

    const acceptHandler = () => {
        OrgSettleAccServices.attachSubAcc()
          .then((res) => {
            if (res.status === 200) {
              Notification('success', t('accepted'));
              
            }
          })
          .catch((err) => {
            Notification('error', err);
            
          });
      };

    return (
        <Spin size='large' spinning={mainLoader}>
            <Card title={t("OrganizationsSettlementAccount")}>
                <Fade>
                    <div className="main-table-filter-wrapper">
                        <Form
                            layout='vertical'
                            className='table-filter-form'
                            form={filterForm}
                            onFinish={onFinish}
                            initialValues={{
                                ...tableFilterData,
                                filterType: filterType,
                                Search: filterSearchVal,

                            }}
                        >
                            <div className="main-table-filter-wrapper">

                                <Form.Item
                                    label={t("Code")}
                                    name="Code"
                                >
                                    <Input.Search
                                        placeholder={t("Code")}
                                        enterButton
                                        onChange={filterTypeHandler}
                                        onSearch={onSearch}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Tooltip title={t('refresh')}>
                                        <Button type="primary" htmlType="submit">
                                            <i className="feather icon-refresh-ccw" />
                                        </Button>
                                    </Tooltip>
                                </Form.Item>

                                <Form.Item>
                                    <Tooltip title={t("add-new")}>
                                        <Button type="primary">
                                            <Link to={`${location.pathname}/add`}>
                                                {/* {t("add-new")}&nbsp; */}
                                                <i className="fa fa-plus" aria-hidden="true" />
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip title={t("AutoAttachSubAcc")}>
                                        <Button type="primary">
                                            <span onClick={() => acceptHandler()}>
                                            <i className="feather icon-paperclip" />
                                            </span>
                                        </Button>
                                    </Tooltip>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Fade>

                <Fade>
                    <TableData />
                </Fade>
            </Card>
        </Spin>
    )
}

export default OrganizationsSettlementAccount;