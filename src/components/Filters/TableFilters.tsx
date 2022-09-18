import React, {useRef} from 'react';
import { Space, Button } from 'antd';
import './filters.module.css';

import DropdownPicker from "../Pickers/DropdownPicker";

function TableFilters(props: any) {
    const gamePickerRef = useRef({} as any);
    const mediaSourcePickerRef = useRef({} as any);
    const growthManagerPickerRef = useRef({} as any);
    const socialManagerPickerRef = useRef({} as any);
    const countryPickerRef = useRef({} as any);

    const clearAll = () => {
        gamePickerRef.current.clear();
        mediaSourcePickerRef.current.clear();
        growthManagerPickerRef.current.clear();
        socialManagerPickerRef.current.clear();
        countryPickerRef.current.clear();

        props.clearFilters();
    };

    function applyFilters(key: string, val: any) {
        props.handleFilters(key, val);
    }

    return (
        <Space size={[8, 6]} wrap>
            <DropdownPicker
                label="Game Title"
                ref={gamePickerRef}
                value={props?.selectedFilters?.published_id || []}
                onSelect={(e) => applyFilters('published_id', e)}
                typesData={props.optionsFilters.published_id}
            />
            <DropdownPicker
                label="Media Source"
                ref={mediaSourcePickerRef}
                value={props?.selectedFilters?.media_source || []}
                onSelect={(e) => applyFilters('media_source', e)}
                typesData={props.optionsFilters.media_source}
            />
            <DropdownPicker
                label="Growth Managers"
                ref={growthManagerPickerRef}
                value={props?.selectedFilters?.growth_manager || []}
                onSelect={(e) => applyFilters('growth_manager', e)}
                typesData={props.optionsFilters.growth_manager}
            />
            <DropdownPicker
                label="Social Manager"
                ref={socialManagerPickerRef}
                value={props?.selectedFilters?.social_manager || []}
                onSelect={(e) => applyFilters('social_manager', e)}
                typesData={props.optionsFilters.social_manager}
            />
            <DropdownPicker
                label="Country"
                ref={countryPickerRef}
                value={props?.selectedFilters?.country_code || []}
                onSelect={(e) => applyFilters('country_code', e)}
                typesData={props.optionsFilters.country_code}
            />
            <Button
                style={{ color: '#40444E' }}
                type="link"
                onClick={clearAll}
                data-testid="creatives-library-clear-all"
            >
                Clear All
            </Button>
        </Space>
    );
}

export default TableFilters;
