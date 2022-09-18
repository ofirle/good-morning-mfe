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
        react: any;
        System: any;
        platforms: {
            apiHost?: string;
            apiVersion?: string;
            platform?: string;
        };
        navigate: any;
        headeService: {
            setTableState: any;
            setCreateState: any;
            setEditState: any;
        };
    }
}

const Routing = (props: any) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>
  </Switch>
);

const App = (props: any) => (
  <Layout>
    <Sider width="220px">
      <SideMenu />
    </Sider>
    <Layout>
      <Header />
      <Content style={{ padding: '31px', backgroundColor: '#F5F5F5' }}>
        <Router basename={props.baseRoute}>
          <Routing {...props} />
        </Router>
      </Content>
    </Layout>
  </Layout >
);

export default App;

