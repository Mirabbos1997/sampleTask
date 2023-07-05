import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Fade from "react-reveal/Fade";
import { Link, useLocation } from 'react-router-dom';

import Card from "../../../../components/MainCard";
import TableData from './components/TableData';
import { getListStartAction, setListFilter, setListFilterType } from './_redux/getListSlice';

const { Option } = Select;

const Children = ({ match }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const [filterForm] = Form.useForm();

    const childrenList = useSelector((state) => state.childrenList);

    let tableData = childrenList.listSuccessData?.rows;
    let total = childrenList.listSuccessData?.total;
    let pagination = childrenList?.paginationData;
    let filter = childrenList?.filterData;

    useEffect(() => {
        dispatch(
            getListStartAction({
                ...pagination,
                ...filter,
            })
        );
    }, [pagination, filter]);

    const getList = (values) => {
        dispatch(setListFilter({
            Number: values?.Number,
            Department: values?.Department,
            Name: values?.Name,
            DocumentSeries: values?.DocumentSeries,
            DocumentNumber: values?.DocumentNumber,
        }));
    };

    const [filterType, setFilterType] = useState(childrenList.filterType);

    function filterTypeHandler(value) {
        setFilterType(value);
    };

    const onSearch = (Search) => {
        filterForm.validateFields()
            .then(values => {
                console.log(values);
                dispatch(setListFilterType({
                    filterType: filterType,
                }));
                getList(values);
            });
    };

    const onFinish = (values) => {
        dispatch(setListFilterType({
            filterType: values?.filterType,
        }));
        getList(values);
    };

    const handleRefresh = () => {
        dispatch(
            getListStartAction({
                ...pagination,
                ...filter,
            })
        );
    };

    return (
        <Card title={t("Children")}>
            <Fade>
                <div className="table-top">
                    <Form
                        className='table-filter-form'
                        form={filterForm}
                        onFinish={onFinish}
                        initialValues={{
                            filterType: filterType,
                            Search: filter[`${filterType}`],
                        }}
                    >
                        <div className="main-table-filter-elements">
                            <Form.Item
                                name="filterType"
                            // label={t("Filter Type")}
                            >
                                <Select
                                    value={filterType}
                                    allowClear
                                    style={{ width: 180 }}
                                    placeholder={t("Filter Type")}
                                    onChange={filterTypeHandler}
                                >
                                    <Option value="Number">{t('Таб.№')}</Option>
                                    <Option value="Department">{t('Department')}</Option>
                                    <Option value="Name">{t('Name')}</Option>
                                    <Option value="DocumentSeries">{t('DocumentSeries')}</Option>
                                    <Option value="DocumentNumber">{t('DocumentNumber')}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                // label={t("search")}
                                name="Search"
                            >
                                <Input.Search
                                    className="table-search"
                                    placeholder={t("search")}
                                    enterButton
                                    onSearch={onSearch}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                onClick={handleRefresh}
                            >
                                <i className="feather icon-refresh-ccw" />
                            </Button>

                            <Button type="primary">
                                <Link to={`${location.pathname}/add`}>
                                    {t("add-new")}&nbsp;
                                    <i className="feather icon-plus" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Fade>

            <Fade>
                <TableData tableData={tableData} total={total} match={match} />
            </Fade>
        </Card>
    )
}

export default React.memo(Children);