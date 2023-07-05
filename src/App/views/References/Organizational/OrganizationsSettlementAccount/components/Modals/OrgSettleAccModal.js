import React, { useEffect, useState } from "react";
import { Form, Modal, Table, Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

// import { Notification } from "../../../../../../helpers/notifications";
// import OrgSettleAccServices from "../../../../../../services/References/Organizational/OrgSettleAcc/OrgSettleAcc.services";
import { useDispatch, useSelector } from 'react-redux';
import { getListStartAction, setListFilter, setListPagination } from '../../_redux/getListSlice';
// import { setListPagination } from '../../_redux/getListSlice';

const OrgSettlementAccModal = (props) => {
    const { t } = useTranslation();
    const [filterForm] = Form.useForm();
    const dispatch = useDispatch();
    const tableList = useSelector((state) => state.orgSettleAccList);
    const tablePagination = tableList?.paginationData;
    const tableData = tableList.listSuccessData?.rows;
    const storeLoading = tableList.listBegin;
    const tableFilterData = tableList?.filterData;
    const mainLoader = tableList?.mainLoader;
    const filterSearchVal = tableList.filterData[`${tableList?.filterType}`];
    const total = tableList.listSuccessData?.total;
    const userListPagination = tableList.paginationData;

    const [filterType, setFilterType] = useState(tableList.filterType);
    const [loading] = useState(false);

    // const [tableData, setTableData] = useState([])
    // const [tableLoading, setTableLoading] = useState(false);

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

    const onTableRow = (record) => {
        return {
            onDoubleClick: () => {
                props.getCode(record.Code);
                props.onCancel();
            },
        };
    }
    function handleTableChange(pagination, sorter) {
        const { field, order } = sorter;

        dispatch(
            setListPagination({
                OrderType: order?.slice(0, -3),
                SortColumn: field,
                PageNumber: pagination.current,
                PageLimit: pagination.pageSize,
            })
        );

    };

    const columns = [
        {
            title: t("id"),
            dataIndex: "ID",
            key: "ID",
            sorter: true,
            width: 100,
        },
        {
            title: t("Name"),
            dataIndex: "Name",
            key: "Name",
            sorter: true,
            // width: 180,
            // render: record => <div className="ellipsis-2">{record}</div>
        },
        {
            title: t("Code"),
            dataIndex: "Code",
            key: "Code",
            sorter: true,
            // width: 100,
        },
        {
            title: t("OldCode"),
            dataIndex: "OldCode",
            key: "OldCode",
            width: 150,
            sorter: true,
        },
        {
            title: t("CashSubAcc"),
            dataIndex: "CashSubAcc",
            key: "CashSubAcc",
            sorter: true,
            width: 100,
        },
        {
            title: t("ActualSubAcc"),
            dataIndex: "ActualSubAcc",
            key: "ActualSubAcc",
            sorter: true,
            width: 100,
        },

    ];



    return (
        <Modal
            visible={props.visible}
            title={t("OrgSettleAcc")}
            okText={t("select")}
            cancelText={t("cancel")}
            onOk={props.onCancel}
            onCancel={props.onCancel}
            width={1300}
            onClick={(record) => {
                props.getCode(record.Code);
            }}
        >
            <Spin size='large' spinning={mainLoader}>
                <Fade>
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

                        </div>

                        <Table
                            bordered
                            size="middle"
                            rowClassName="table-row"
                            className="main-table"
                            columns={columns}
                            dataSource={tableData}
                            loading={storeLoading || loading}
                            onChange={handleTableChange}
                            rowKey={(record) => record.ID}
                            showSorterTooltip={false}
                            onRow={(record) => onTableRow(record)}
                            // summary={records => tableSummaryHandler(records)}
                            scroll={{
                                x: "max-content",
                                y: '50vh'
                            }}
                            pagination={{
                                pageSize: Math.ceil(tableData?.length / 10) * 10,
                                total: total,
                                current: userListPagination.PageNumber,
                                showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                            }}
                        />
                    </Form>
                </Fade>
                
            </Spin>

        </Modal>
    );

}
export default OrgSettlementAccModal;
