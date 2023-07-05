import React, { useEffect, useState } from "react";
import { Form, Modal, Table, Input, } from "antd";
import { useTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

// import { Notification } from "../../../../../../helpers/notifications";
// import OrgSettleAccServices from "../../../../../../services/References/Organizational/OrgSettleAcc/OrgSettleAcc.services";
// import { useDispatch } from 'react-redux';
// import { getListStartAction, setListFilter, setListPagination } from '../../_redux/getListSlice';
import HelperServices from '../../../../../../../services/Helper/helper.services';
import { Notification } from '../../../../../../../helpers/notifications';
// import { setListPagination } from '../../_redux/getListSlice';

const GetCashListModal = (props) => {
    const { t } = useTranslation();
    const [filterForm] = Form.useForm();
    const [subCashList, setSubCashList] = useState([]);
    const storeLoading = subCashList.listBegin;

    const [loading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [subCash] = await Promise.all([
                HelperServices.getSubCashList(),

            ]);
            setSubCashList(subCash.data.rows);

        };

        fetchData().catch(err => {
            Notification('error', err);
        });

    }, []);


    const columns = [
        {
            title: t("id"),
            dataIndex: "ID",
            key: "ID",
            sorter: true,
            // width: 100,
        },
        {
            title: t("Code"),
            dataIndex: "Code",
            key: "Code",
            sorter: true,
            width: 180,
            render: record => <div className="ellipsis-2">{record}</div>
        },

    ];

    const onTableRow = (record) => {
        return {
            onDoubleClick: () => {
                props.getSubCashCode(record.Codecash);
                props.onCancel();
            },
        };
    }

    return (
        <Modal
            visible={props.visible}
            title={t("CashSubAcc")}
            okText={t("select")}
            cancelText={t("cancel")}
            onOk={props.onCancel}
            onCancel={props.onCancel}
            width={1300}
            onClick={(record) => {
                props.getSubCashCode(record.Codecash);
            }}
        >
            {/* <Spin size='large' spinning={mainLoader}> */}
                <Fade>
                    <Form
                        layout='vertical'
                        className='table-filter-form'
                        form={filterForm}
                        // onFinish={onFinish}
                        // initialValues={{
                        //     ...tableFilterData,
                        //     // filterType: filterType,
                        //     // Search: filterSearchVal,

                        // }}
                    >
                        <div className="main-table-filter-wrapper">

                            <Form.Item
                                label={t("Code")}
                                name="Code"
                            >
                                <Input.Search
                                    placeholder={t("Code")}
                                    enterButton
                                    // onChange={filterTypeHandler}
                                // onSearch={onSearch}
                                />
                            </Form.Item>

                        </div>

                        <Table
                            bordered
                            size="middle"
                            rowClassName="table-row"
                            className="main-table"
                            columns={columns}
                            dataSource={subCashList}
                            loading={storeLoading || loading}
                            // onChange={handleTableChange}
                            // rowKey={(record) => record.ID}
                            showSorterTooltip={false}
                            onRow={(record) => onTableRow(record)}
                            // summary={records => tableSummaryHandler(records)}
                            scroll={{
                                x: "max-content",
                                y: '50vh'
                            }}
                            // pagination={{
                            //     pageSize: Math.ceil(subCashList?.length / 10) * 10,
                            //     total: total,
                            //     current: userListPagination.PageNumber,
                            //     showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                            // }}
                        />


                    </Form>
                </Fade>

            {/* </Spin> */}

        </Modal>
    );

}
export default GetCashListModal;
