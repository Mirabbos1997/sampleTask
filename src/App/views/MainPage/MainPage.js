import React from 'react';
import { Card, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next';

import Map from './Map';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Map />
      </Col>
    </Row>
  );
};

export default MainPage;