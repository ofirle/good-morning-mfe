import axios from 'axios';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Layout, Typography } from 'antd';

import '../app/index.less';
import '../app/supersonic.less';

import Home from './components/Home';
import Movie from './components/Movie';
import { parseToken } from './supersonic-ui/services/utils.service';
import SideMenu from './components/SideMenu';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const token = parseToken();
if (token) {
  axios.defaults.headers.common.authorization = token;
}

declare global {
  interface Window {
    platforms: {
      apiHost: string
    }
  }
}

const Routing = (props: any) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>
    <Route path="/details/:movieName">
      <Movie {...props} />
    </Route>
  </Switch>
);

const App = (props: any) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <Layout>
    <Sider width="220px">
      <SideMenu />
    </Sider>
    <Layout>
      <Header />
      <Content style={{ padding: '22px', height: '90vh' }}>
        <Router basename={props.baseRoute}>
          <Routing {...props} />
        </Router>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout >
);

export default App;

