import React, {useEffect, useState} from 'react';
import {Typography, Layout, Row, Col, notification, Space, Spin} from 'antd';
import './Home.css';
import TableFilters from "./Filters/TableFilters";
import TableWorkspace from "./Filters/TableWorkspace";
import AlertList from "./Alerts/AlertList";
import Graph from "./Chart/Graph";
import useFiltersData from "./Chart/useFiltersData";

const { Link } = Typography;

const userName = 'Ofir';

const alerts = [
    {
        key: 'test1',
        icon: 'https://play-lh.googleusercontent.com/tsUHDkEkUOv-gfMK1SRH81LyK0VarafdsANyaV88H-pIyowzIYNhDnqQTnWq-QpTgQQ',
        os: 'ios',
        title: 'Skater Race',
        description: 'ARPU D0 has dropped by 23% in Skater Race iOS comparing to last week',
        date: 'On March 30, 2022 18:44'
    }, {
        key: 'test2',
        icon: 'https://levelsolved.com/wp-content/uploads/2021/09/Bridge-Race-Logo-300x300.png',
        os: 'android',
        title: 'Bridge Race',
        description: 'Cost has dropped by 30% in Bridge Race Android in US comparing last week',
        date: 'On March 30, 2022'
    },
    {
        key: 'test3',
        icon: 'https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/e6/35/8d/e6358d4c-a65b-06a6-af8d-5d194ce95058/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
        os: 'ios',
        title: 'Chat Master',
        description: 'ARPU D1 has dropped by 12% in Chat Master iOS in US comparing to last',
        date: 'On March 29, 2022'
    }, {
        key: 'test4',
        icon: 'https://play-lh.googleusercontent.com/UVB5IbKU40yq2cuZOPbIvGqbdhhIucfpVPa_nS0L-Cnvay-YEjiIUPJIx6knxGlFat0m',
        os: 'android',
        title: 'Get Rich',
        description: 'Cost  has dropped by 6% in Get Rich Android in US comparing last week',
        date: 'On March 29, 2022'
    },
    {
        key: 'test5',
        icon: 'https://play-lh.googleusercontent.com/y0-nS7p0zwME3wAOLAendKlOQx8vjpImD0WylIw81Gw0Uqsbd7uGYq49wiRXEwNrHQ',
        os: 'ios',
        title: 'Twerk Race',
        description: 'Cost  has dropped by 2% in Twerk Race comparing last week',
        date: 'On March 30, 2022'
    }
];

const Home = () => {
    const [alertList, setAlertList] = useState([]);
    const [isLoadingAlerts, setIsLoadingAlerts] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [optionsFilters, setOptionsFilters] = useState({});
    const optionsFiltersResponse = useFiltersData();

    useEffect(() => {
        setTimeout(() => {
            setAlertList(alerts);
            setIsLoadingAlerts(false);
            const args = {
                message: 'Cost and revenue data are all aligned',
                duration: 2,
            };
            notification.success(args);

        }, 800);
    }, []);

    useEffect(() => {
        setOptionsFilters(optionsFiltersResponse);
    }, [optionsFiltersResponse]);

    const handleFilterChanged = (key, value) => {
        const newSelectedFilters = { ...selectedFilters, [key]: value };
        if(value === null || value.length === 0) delete newSelectedFilters[key];
        setSelectedFilters(newSelectedFilters);
    };

    const clearFilters = () => {
        setSelectedFilters({});
    };

    const removeAlertItem = (key) => {
        const newAlertList = alertList.filter((item) => item.key !== key);
        setAlertList([...newAlertList]);
    };

    const updateFilters = (selectedFiltersObj) => {
        setSelectedFilters(selectedFiltersObj);
    };

    return (
        <Layout.Content>
            <Row gutter={[0, 44]}>
                <Col>
                    <TableFilters
                        handleFilters={handleFilterChanged}
                        clearFilters={clearFilters}
                        selectedFilters={selectedFilters}
                        optionsFilters={optionsFilters}
                    />
                </Col>
            </Row>
            <Row gutter={[0, 44]} className='workspace'>
                <Col>
                    <TableWorkspace
                        prefix="gm_filter"
                        filters={selectedFilters}
                        onUpdateFilters={updateFilters}
                        clearFilters={clearFilters}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Space>
                        <Link href='https://rms.supersonic.com/alerts' className='all-alerts-btn'>All Alerts</Link>
                        <Typography className="title">Good Morning {userName}!</Typography>
                    </Space>
                </Col>
            </Row>
            <Row style={{marginTop:16}}>
                <Col span={24}>
                    {isLoadingAlerts && <Spin />}
                    {!isLoadingAlerts && <AlertList list={alertList} removeItem={removeAlertItem}/>}
                </Col>
            </Row>
            <br/>
            <br/>
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} className='chart-container'>
                    <Graph
                        filters={selectedFilters}
                        filtersData={optionsFilters}
                    />
                </Col>
            </Row>
        </Layout.Content>
    );
};

export default Home;