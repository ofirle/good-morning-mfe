import React from 'react';
import { Typography, Layout, Row, Col, Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const Screen1 = () => {
  const history = useHistory();
  const params: any = useParams();
  return (
    <Layout.Content>
      <Row gutter={[0, 44]}>
        <Col>
          <Typography.Title>Movie: {params.movieName}</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[0, 44]}>
        <Col>
          <Button onClick={() => history.push('/')} type="link">Back</Button>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Screen1;