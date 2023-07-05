import { Space, Table, Tooltip } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import ContractorsServices from '../../../../../../services/References/Organizational/Contractors/Contractors.services';
import { setListPagination } from '../_redux/getListSlice';

const TableData = ({ tableData, total, match }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const contractorsList = useSelector((state) => state.contractorsList);
  let loading = contractorsList?.listBegin;
  let mainLoader = contractorsList?.mainLoader;
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
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      sorter: true,
      width: 300,
      render: record => <div className="ellipsis-2">{record}</div>
    },
    {
      title: t("INN"),
      dataIndex: "INN",
      key: "INN",
      width: 150,
      sorter: true,
    },
    {
      title: t("OKED"),
      dataIndex: "OKONH",
      key: "OKONH",
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
            {/* <Tooltip title={t("Print")}>
                            <span onClick={() => printHandler(record.ID)}>
                                <i className="feather icon-printer action-icon" />
                            </span>
                        </Tooltip> */}
          </Space>
        );
      },
    },
  ];

  // const [confirmLoading, setConfirmLoading] = React.useState(false);

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

  // const printHandler = (id) => {
  //     console.log(id);
  //     setConfirmLoading(true);
  //     ContractorsServices.printById(id)
  //       .then(res => {
  //         if (res.status === 200) {
  //           const url = window.URL.createObjectURL(new Blob([res.data]));
  //           const link = document.createElement("a");
  //           link.href = url;
  //           link.setAttribute("download", "UZAsbo_Contractor.xlsx");
  //           document.body.appendChild(link);
  //           link.click();

  //           setConfirmLoading(false);
  //         }
  //       })
  //       .catch(err => {
  //         Notification('error', err);
  //         setConfirmLoading(false);
  //       })
  // };

  return (
    <Table
      bordered
      size="middle"
      columns={columns}
      dataSource={tableData}
      loading={loading || mainLoader}
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

export default TableData