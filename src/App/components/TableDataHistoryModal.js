import { Button, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import HelperServices from '../../services/Helper/helper.services';

const TableDataHistoryModal = (props) => {
    const { t } = useTranslation();

    const columns = [
        {
            title: t("id"),
            dataIndex: 'ID',
            width: 100,
            // sorter: (a, b) => a.ID - b.ID,
        },
        {
            title: t("Name"),
            dataIndex: 'Name',
            width: 250,
            // sorter: (a, b) => a.Name.localeCompare(b.Name),
        },
    ];

    const [tableLoading, setTableLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [tableData] = await Promise.all([
                HelperServices.GetTableDataHistory(props.params),
            ]);
            setTableData(tableData.data);
            setTableLoading(false);
        };

        fetchData().catch(err => {
            Notification('error', err);
            setTableLoading(false);
        });
    }, [props.params]);

    const [selectedTableData, setSelectedTableData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys: selectedTableData,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedTableData(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <Modal
            width={768}
            title={t("DataHistory")}
            visible={props.visible}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                  {t("close")}
                </Button>,
              ]}
        >
            {/* <Input
                placeholder="Search..." 
            /> */}
            <Table
                bordered
                size="middle"
                rowClassName="table-row"
                className="main-table mt-4"
                columns={columns}
                dataSource={tableData.rows}
                loading={tableLoading}
                rowKey={record => record.ID}
                showSorterTooltip={false}
                pagination={false}
                scroll={{
                    x: "max-content",
                    y: "50vh",
                  }}
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
            />
        </Modal>
    )
}

export default TableDataHistoryModal;