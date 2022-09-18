import {
  LoadingIndicator,
  EnumSelect,
  SuperChart,
  ChartType,
} from '@supersonic-studios/ui-components';
import {
  Col, Layout, Menu, Row, Space, Typography,
} from 'antd';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import SuperChartLegends from './SuperChartLegends/SuperChartLegends';
import { CohortBreakdown, cohortBreakdownEnum } from '../../types/cohort-breakdown.enum';
import './Graph.css';
import { AnalyticsTabs } from './AnalyticsTabs';
import { tree } from './Graph.tree';
import { chartOptions } from './GraphChartOptions';
import useGraphData from "./useGraphData";
import DateRangePicker from "../Pickers/DateRangePicker";

const { Text } = Typography;

const endDateDefault = new Date();
const milEndDate = endDateDefault.getTime() - (14 * 24* 60 * 60 * 1000);
const startDateDefault = new Date(milEndDate);
endDateDefault.setHours(0,0,0,0);
startDateDefault.setHours(0,0,0,0);

const Graph = (props: any) => {
  const chartRef = useRef({} as any);
  const dateRef = useRef({} as any);
  const [graphData, setGraphData] = useState({ data: {}, legends: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(tree.tabs[0].type);
  const [breakdown, setBreakdown] = useState(CohortBreakdown.MediaSource);
  const [dates, setDates] = useState({from: startDateDefault.toISOString(), to: endDateDefault.toISOString()});
  const data = useGraphData(type, breakdown, props.filters, setIsLoading, props.filtersData[breakdown], dates);

    useEffect(() => {
        setGraphData(data);
    }, [data]);

  const handleToggledLegends = (datasetIndex, isVisible) => {
    chartRef.current.setDataVisibility(datasetIndex, isVisible);
  };

  const getBreakdownByReport = () => cohortBreakdownEnum.toSelectionOptions()
    .filter((option) => getReportConfig().breakdowns.includes(option.id));

  const getReportConfig = () => tree[type];

  const isGraphData = Object.keys(graphData?.data || {}).length > 0;


  const chart = useMemo(
    () => (isGraphData
      ? (
        <SuperChart
          type={ChartType.Line}
          ref={chartRef}
          data={graphData}
          options={chartOptions(false, type, [])}
        />
      )
      : null),
    [graphData]
  );

  const onDateChanged = (datesSelected) => {
      const startDate = (new Date(datesSelected?.startDate[0])).toISOString();
      const endDate = (new Date(datesSelected?.endDate[0])).toISOString();
      setDates({ from: startDate, to: endDate });
  };

  return (
      <>
        <Layout style={{ height: '100%' }}>
            <Space
                className='container'
                style={{ width: '100%', marginTop: 24 }}
                size="middle"
                direction="vertical"
            >
                <AnalyticsTabs
                  tabs={tree.tabs}
                  selectedTab={type}
                  handleChange={(typeChanged) => {
                      setType(typeChanged);
                  }}
                />
            </Space>
            <LoadingIndicator spinning={isLoading}>
                <Layout className='container' style={{ marginTop: 36, width: '100%' }}>
                    <Space direction="vertical" size={100}>
                      <Row gutter={[24, 8]}>
                        <Col span={19}>
                          <Space className='chartTab' size="middle" direction="vertical">
                          <Row justify="center">
                              <Col span={24}>
                                  <DateRangePicker allowClear={false}
                                                   key="date_range"
                                                   ref={dateRef}
                                                   title="Date Range"
                                                   onSelect={onDateChanged}
                                                   value={{startDate: dates.from, endDate: dates.to}}/>
                              </Col>
                          </Row>
                            <Row gutter={[16, 16]} justify="center">
                              <Col span={24} className='chartContainer'>
                                {chart}
                              </Col>
                              <Col>
                                <Text className='xAxisTitle'>Dates</Text>
                              </Col>
                            </Row>
                          </Space>
                        </Col>
                        <Col span={5}>
                          <Space direction="vertical" className='breakBySection'>
                            <EnumSelect
                              dropdownMatchSelectWidth
                              enumOptions={getBreakdownByReport()}
                              onChange={(breakdownData) => {
                                  setBreakdown(breakdownData);
                              }}
                              value={breakdown}
                            />
                              <div className='chartContainer' style={{overflowY: 'auto'}}>
                                <SuperChartLegends initialLegends={graphData?.legends} onToggleLegends={handleToggledLegends} />
                              </div>
                          </Space>
                        </Col>
                      </Row>
                    </Space>
                </Layout>
            </LoadingIndicator>
        </Layout>
      </>
  );
};

export default Graph;
