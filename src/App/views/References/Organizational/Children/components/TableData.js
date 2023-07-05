import { Space, Table, Tooltip } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChildrenServices from '../../../../../../services/References/Organizational/Children/Children.services';
import { setListPagination } from '../_redux/getListSlice';

const TableData = ({ tableData, total, match }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const contractorsList = useSelector((state) => state.contractorsList);
    let loading = contractorsList?.listBegin;
    let pagination = contractorsList?.paginationData;

    const columns = [
        {
            title: t("id"),
            dataIndex: "ID",
            key: "ID",
            sorter: true,
            width: 100,
        },
        {
            title: t("Department"),
            dataIndex: "Department",
            key: "Department",
            width: 150,
            sorter: true,
        },
        {
            title: t("Code"),
            dataIndex: "Code",
            key: "Code",
            width: 150,
            sorter: true,
        },
        {
            title: t("Таб.№"),
            dataIndex: "Number",
            key: "Number",
            width: 150,
            sorter: true,
        },
        {
            title: t("Name"),
            dataIndex: "Name",
            key: "Name",
            sorter: true,
            width: 300,
            render: record => <div className="ellipsis-2">{record}</div>
        },
        {
            title: t("DateOfBirth"),
            dataIndex: "DateOfBirth",
            key: "DateOfBirth",
            width: 150,
            sorter: true,
        },
        {
            title: t("Address"),
            dataIndex: "Address",
            key: "Address",
            sorter: true,
            width: 150,
        },
        {
            title: t("DocumentType"),
            dataIndex: "DocumentType",
            key: "DocumentType",
            sorter: true,
            width: 150,
        },
        {
            title: t("DocumentSeries"),
            dataIndex: "DocumentSeries",
            key: "DocumentSeries",
            sorter: true,
            width: 150,
        },
        {
            title: t("DocumentNumber"),
            dataIndex: "DocumentNumber",
            key: "DocumentNumber",
            sorter: true,
            width: 150,
        },
        {
            title: t("PhoneNumber"),
            dataIndex: "PhoneNumber",
            key: "PhoneNumber",
            sorter: true,
            width: 150,
        },
        {
            title: t("WorkSheduleKind"),
            dataIndex: "WorkSheduleKind",
            key: "WorkSheduleKind",
            sorter: true,
            width: 150,
        },
        {
            title: t("ChildHoursType"),
            dataIndex: "ChildHoursType",
            key: "ChildHoursType",
            sorter: true,
            width: 150,
        },
        {
            title: t("ChildrenGroupType"),
            dataIndex: "ChildrenGroupType",
            key: "ChildrenGroupType",
            sorter: true,
            width: 150,
        },
        {
            title: t("MoreThanOneChild"),
            dataIndex: "MoreThanOneChild",
            key: "MoreThanOneChild",
            sorter: true,
            width: 150,
        },
        {
            title: t("NoPayment"),
            dataIndex: "NoPayment",
            key: "NoPayment",
            sorter: true,
            width: 150,
        },
        {
            title: t("IsRent"),
            dataIndex: "IsRent",
            key: "IsRent",
            sorter: true,
            width: 150,
        },
        {
            title: t("DateOfReception"),
            dataIndex: "DateOfReception",
            key: "DateOfReception",
            sorter: true,
            width: 150,
        },
        {
            title: t("DateOfDismissal"),
            dataIndex: "DateOfDismissal",
            key: "DateOfDismissal",
            sorter: true,
            width: 150,
        },
        {
            title: t("comment"),
            dataIndex: "Comment",
            key: "Comment",
            sorter: true,
            width: 150,
        },
        {
            title: t("IsEmployee"),
            dataIndex: "IsEmployee",
            key: "IsEmployee",
            sorter: true,
            width: 150,
        },
        {
            title: t("actions"),
            key: "action",
            align: "center",
            fixed: 'right',
            width: 110,
            render: (record) => {
                return (
                    <Space size="middle">
                        <Tooltip title={t("Edit")}>
                            <span onClick={() => {
                                history.push(`${match.path}/edit/${record.ID}`);
                            }}>
                                <i className="feather icon-edit action-icon" />
                            </span>
                        </Tooltip>
                        <Tooltip title={t("Clone")}>
                            <span onClick={() => {
                                history.push(`${match.path}/edit/${record.ID}?IsClone=true`);
                            }}>
                                <i className="feather icon-copy action-icon" />
                            </span>
                        </Tooltip>
                        <Tooltip title={t("Print")}>
                            <span onClick={() => printHandler(record.ID)}>
                                <i className="feather icon-printer action-icon" />
                            </span>
                        </Tooltip>
                        <Tooltip title={t("Delete")}>
                            <span onClick={() => deleteHandler(record.ID)}>
                                <i className="feather icon-trash-2 action-icon" />
                            </span>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    const [confirmLoading, setConfirmLoading] = React.useState(false);

    function handleTableChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
        const { field, order } = sorter;
        // console.log(field, order?.slice(0, -3));

        dispatch(
            setListPagination({
                OrderType: order?.slice(0, -3),
                SortColumn: field,
                PageNumber: pagination.current,
                PageLimit: pagination.pageSize,
            })
        );

    };

    const printHandler = (id) => {
        console.log(id);
        setConfirmLoading(true);
        ChildrenServices.printById(id)
          .then(res => {
            if (res.status === 200) {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "UZAsbo_Children.xlsx");
              document.body.appendChild(link);
              link.click();
    
              setConfirmLoading(false);
            }
          })
          .catch(err => {
            Notification('error', err);
            setConfirmLoading(false);
          })
    };

    const deleteHandler = (id) => {

    };

    return (
        <Table
            bordered
            size="middle"
            columns={columns}
            dataSource={tableData}
            loading={loading || confirmLoading}
            onChange={handleTableChange}
            rowKey={(record) => record.ID}
            rowClassName="table-row"
            className="main-table"
            showSorterTooltip={false}
            scroll={{
                x: "max-content",
                y: '50vh'
            }}
            pagination={{
                pageSize: Math.ceil(tableData?.length / 10) * 10,
                total: total,
                current: pagination.PageNumber,
                showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
            }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => {
                        history.push(`${match.path}/edit/${record.ID}`);
                    },
                };
            }}
        />
    )
}

export default TableData;