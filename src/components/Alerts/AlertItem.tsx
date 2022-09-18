import React, { memo } from 'react';
import {
    Card, Space, Avatar, Typography, Image
} from 'antd';
const { Link } = Typography;
import './AlertCard.css';

const defaultIcon = 'https://ui-assets.supersonic.com/common/icons/placeholderSmall.svg';

function AlertCard(props) {
    const osIcons = new Map<string, string>([
        ["ios", "https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg"],
        ["android", "https://cdn-icons-png.flaticon.com/512/38/38002.png"]
    ]);

    const removeItem = (e, key) => {
        console.log(`Remove Item. key: ${key}`);
        props.removeItem(key);
    };

    const openDetails = (e, key) => {
        console.log(`open details. key: ${key}`);
    };

    return (
        <div style={{width: 305, height: 164, boxSizing:'content-box'}}>
            <Card
                style={{ borderRadius: 8, overflow: 'hidden'}}
                hoverable
                actions={[
                ]}
                bordered={false}
                className='shadow'
            >
                <Space direction="vertical" size="small">
                    <Space>
                        <Avatar style={{ width: 32, height: 32, borderRadius: 5 }} src={props.icon || defaultIcon} />
                        <Space direction="vertical" size="large" align="center">
                            <Space>
                                <Image preview={false} style={{height: props.os === 'ios' ? 12 : 14}} src={osIcons.get(props.os)} />
                                <Typography.Text className='game-title'>{props.title}</Typography.Text>
                            </Space>
                        </Space>
                        <Link onClick={event => props.removeItem(props.id)} className='close-btn' style={{color: '#8C8C8C'}}>X</Link>
                    </Space>
                    <span className='description'>
                        {props.description}
                    </span>
                    <span className='date'>
                        {props.date}
                    </span>
                    <Link onClick={event => openDetails(event, props.id)} className='more-details-btn' style={{color:'#2F54EB'}}>More Details</Link>
                </Space>
            </Card>
        </div>
    );
}

export default AlertCard;
