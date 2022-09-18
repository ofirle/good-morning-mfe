import React from 'react';
import { ColorCircle, CHART_COLORS } from '@supersonic-studios/ui-components';
import { Typography } from 'antd';

export const columns = (legends: any) => [
  {
    key: 'breakdown',
    title: 'Placement',
    dataIndex: 'breakdown',
    sorter: (a, b) => (a.breakdown < b.breakdown
      ? -1
      : 1),
    render: (text: string) => {
      if (text && legends) {
        const color = CHART_COLORS[legends.findIndex((legend) => legend.id === text) % CHART_COLORS.length];
        return (
          <>
            <ColorCircle size={8} color={color} />
            <Typography.Text style={{ marginLeft: '4px' }}>{text}</Typography.Text>
          </>
        );
      }

      return 'All';
    },
  },
  {
    key: 'engagedUsers',
    title: 'Daily Engaged Users',
    dataIndex: 'engagedUsers',
    sorter: (a, b) => (a.engagedUsers < b.engagedUsers
      ? -1
      : 1),
    render: (users: number) => users.toFixed(1) || '--',
  },
  {
    key: 'engagementRate',
    title: 'Show Rate',
    dataIndex: 'engagementRate',
    sorter: (a, b) => (a.engagementRate < b.engagementRate
      ? -1
      : 1),
    render: (rate: number) => `${rate.toFixed(1)} %` || '--',
  },
  {
    key: 'usageRate',
    title: 'Usage Rate',
    dataIndex: 'usageRate',
    render: (rate: number) => `${rate.toFixed(1)}` || '--',
    sorter: (a, b) => (a.usageRate < b.usageRate
      ? -1
      : 1),
  },
  {
    key: 'impressionsPerDAU',
    title: 'Impressions per DAU',
    dataIndex: 'impressionsPerDAU',
    render: (impressions: number) => `${impressions.toFixed(1)}` || '--',
    sorter: (a, b) => (a.impressionsPerDAU < b.impressionsPerDAU
      ? -1
      : 1),
  },
];
