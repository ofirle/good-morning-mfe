import React, {useEffect, useRef, useState} from 'react';
import { Space, Button } from 'antd';

import WorkspacePicker from "../Pickers/WorkspacePicker";

function TableWorkspace(props: any) {
    const workspacePickerRef = useRef({} as any);
    const [searchValue, setSearchValue] = useState('');
    const [workspaceFilters, setWorkspaceFilters] = useState([]);
    const [selectedWorkspaceFilters, setSelectedWorkspaceFilters] = useState([]);

    useEffect(() => {
        loadWorkspacesList();
    },[]);

    const loadWorkspacesList = () => {
        const options = Object.keys(localStorage)
            .reduce((previousValue, currentValue) => {
                const splitValue = currentValue.split(`${props.prefix}_`);
                if (splitValue.length > 1) { previousValue.push({ value: splitValue[1], label: splitValue[1]}); }
                return previousValue;
            }, []);
        setWorkspaceFilters(options);
        console.log(options);
    };

    const loadWorkspace = (keys) => {
        if(Array.isArray(keys) && keys.length > 0){
            const key = keys[0];
            props.onUpdateFilters(JSON.parse(localStorage.getItem(`${props.prefix}_${key}`)));
        }
        else{
            props.clearFilters();
        }
    };

    const handleSaveWorkspace = () => {
        const filterKey = `${props.prefix}_${searchValue}`;
        const data = {
            ...props.filters,
        };
        localStorage.setItem(filterKey, JSON.stringify(data));
        setWorkspaceFilters([...workspaceFilters, { value: filterKey, label: searchValue}]);
        setSelectedWorkspaceFilters([filterKey]);
        console.log(`Save Workspace: ${filterKey}`);
    };

    return (
        <Space size={[8, 6]} wrap>
            <WorkspacePicker
                onChangedSearch={(e) => setSearchValue(e)}
                onSaveWorkspace={handleSaveWorkspace}
                ref={workspacePickerRef}
                onSelect={(e) => loadWorkspace(e)}
                label="Workspace"
                value={selectedWorkspaceFilters}
                typesData={workspaceFilters}
                searchValue={searchValue}
            />
        </Space>
    );
}

export default TableWorkspace;
