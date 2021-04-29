import React from 'react';
import { Typography, Layout, Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Screen1 = () => {
  const history = useHistory();
  return (
    <Layout.Content>
      <Row gutter={[0, 44]}>
        <Col>
          <Typography.Title>Hi there! I'm a Micro-App!!</Typography.Title>
          <Typography.Text type="success">Look! There is a routing below...</Typography.Text>
        </Col>
      </Row>
      <Row gutter={[0, 44]}>
        <Col>
          <Button onClick={() => history.push('/details/iron-man')} type="link">Iron Man</Button>
        </Col>
      </Row>
      <Row gutter={[0, 44]}>
        <Col>
          <Button onClick={() => history.push('/details/avengers')} type="link">Avengers</Button>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Screen1;