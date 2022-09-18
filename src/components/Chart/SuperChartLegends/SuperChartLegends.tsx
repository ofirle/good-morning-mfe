import { Checkbox, List, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import './SuperChartLegends.less';
import './SuperChartLegends.module.css';

const SuperChartLegends = ({ initialLegends, onToggleLegends }) => {
  const [legends, setLegends] = useState(initialLegends);

  useEffect(() => {
    setLegends(initialLegends);
  }, [initialLegends]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const newLegends = legends.map((legend) => ({
      ...legend,
      hidden: legend.id === value
        ? !checked
        : legend.hidden,
    }));
    const datasetIndex = legends.findIndex((legend) => legend.id === value);

    setLegends(newLegends);
    onToggleLegends(datasetIndex, checked);
  };

  return (
    <Space direction="vertical" className='legendsContainer'>
      <List
        size="small"
        dataSource={legends}
        renderItem={(legend: { id: string; displayName: string; hidden: boolean }) => (
          <List.Item>
            <Checkbox value={legend.id} checked={!legend.hidden} onChange={handleChange}>
              {legend.displayName}
            </Checkbox>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default SuperChartLegends;
