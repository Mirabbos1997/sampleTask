import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Select, Tooltip } from 'antd';

import Card from "../../../../components/MainCard";
import Fade from "react-reveal/Fade";
import { Link, useLocation } from 'react-router-dom';
import { getListStartAction } from './_redux/getListSlice';
import TableData from './components/TableData';

const { Option } = Select;

const PermanentAsset = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const premanetAssetsList = useSelector((state) => state.premanetAssetsList);

  let tableData = premanetAssetsList.listSuccessData?.rows;
  let total = premanetAssetsList.listSuccessData?.total;
  let pagination = premanetAssetsList?.paginationData;
  let filter = premanetAssetsList?.filterData;
  const filterValue = premanetAssetsList.filterData[`${filterType}`];

  useEffect(() => {
    dispatch(
      getListStartAction({
        ...pagination,
        ...filter,
      })
    );
  }, [pagination, filter]);

  const [filterType, setFilterType] = useState(premanetAssetsList.filterType);
  // const [filterValue, setFilterValue] = useState(premanetAssetsList.filterData[`${filterType}`]);

  function filterTypeHandler(value) {
    setFilterType(value);
  };

  return (
    <Card title={t("PermanentAsset")}>
      <Fade>
        <Form
          className='table-filter-form'
          // onFinish={onFinish}
          initialValues={{
            filterType: filterType,
            search: filterValue,
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
                <Option value="Number">{t('Number')}</Option>
                <Option value="Name">{t('Name')}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              // label={t("search")}
              name="search"
            >
              <Input.Search
                placeholder={t("search")}
                enterButton
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
              // onClick={handleClearParams}
              >
                <i className="feather icon-refresh-ccw" />
              </Button>
            </Form.Item>

            <Form.Item>
              <Tooltip title={t("add-new")}>
                <Button type="primary">
                  <Link to={`${location.pathname}/add`}>
                    <i className="feather icon-plus" aria-hidden="true" />
                  </Link>
                </Button>
              </Tooltip>
            </Form.Item>
          </div>
        </Form>
      </Fade>

      <Fade>
        <TableData tableData={tableData} total={total} match={match} />
      </Fade>
    </Card>
  )
}

export default React.memo(PermanentAsset);