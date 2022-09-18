import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;
export const AnalyticsTabs = ({ tabs, selectedTab, handleChange }) => (
  <Tabs
    activeKey={selectedTab}
    onChange={(value) => {
      handleChange(value);
    }}
  >
    {tabs.map((tab) => (
      <TabPane style={{ padding: '0px 16px' }} tab={tab.text} key={tab.type} />
    ))}
  </Tabs>
);
