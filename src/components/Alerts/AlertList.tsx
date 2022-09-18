import React from 'react';
import {Space} from "antd";
import AlertCard from "./AlertItem";

function AlertList(props) {
    return (
        <Space size={24}>
            {props.list.map((item) =>
                <AlertCard
                    icon={item.icon}
                    os={item.os}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    key={item.key}
                    id={item.key}
                    removeItem={props.removeItem}
                />
            )}
        </Space>
    );
}

export default AlertList;
