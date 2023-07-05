import React, { useEffect, useState } from "react";
import { Table, Drawer } from "antd";
import { useTranslation } from "react-i18next";

import HelperServices from "../../services/Helper/helper.services";
import { Notification } from "../../helpers/notifications";

const ProtocolDrawer = (props) => {
  const [tableLoading, setTableLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const tableDt = await HelperServices.GetFileLog(props.id, props.tableId);
      setTableData(tableDt.data);
      setTableLoading(false);
    }
    fetchData().catch(err => {
      setTableLoading(false);
      Notification('error', err);
    });
  }, [props.id, props.tableId]);

  const columns = [
    {
      title: t('status'),
      dataIndex: "Status",
      width: 110,
    },
    {
      title: t('Description'),
      dataIndex: "Description",
      width: 250,
    },
    {
      title: t('id'),
      dataIndex: "ID",
      width: 110,
    },
    {
      title: t('DateOfCreated'),
      dataIndex: "DateOfCreated",
      width: 120,
    },
  ];

  return (
    <Drawer
      title={t("protocol")}
      visible={props.visible}
      placement="right"
      className='protocol-drawer'
      onClose={props.onCancel}
    >
      <Table
        bordered
        size='middle'
        className="main-table"
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        rowKey={(record) => record.CreatedTime}
        rowClassName="table-row"
        pagination={false}
        scroll={{
          x: "50vh",
          y: "50vh",
        }}
      />
    </Drawer >
  )
}

export default React.memo(ProtocolDrawer);