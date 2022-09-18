import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {Row, Col, Popover, Button} from 'antd';
import { Picker, DropDownWrapper, PickerTags } from '@supersonic-studios/ui-components';

const WorkspacePicker = forwardRef((props: any, pickerRef) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef({} as any);

  useEffect(() => {
    if (props.value) {
      setTags(props.value, true);
      setSelectedItems(props.value);
    }
  }, []);

  const setTags = (selectedValues?: Array<string>, firstLoad?: boolean) => {
    if (firstLoad) {
      setSelectedTags(selectedValues);
      return;
    }
    const selection = selectedValues || ref.current.getSelection();
    // const selected = props.typesData.filter((item) => selection.includes(item.value));
    // const selected = [];
    const newData = selection.map((item) => item);
    setSelectedTags(newData);
    props.onSelect(selection[0]);
  };

  useImperativeHandle(pickerRef, () => ({
    clear: () => {
      setTotal(0);
      setSelectedTags([]);
      setSelectedItems([]);
      props.onSelect(null);
    }
  }));

  const handleSelect = (value) => {
    console.log(value, "1");
    setTags(value);
    setSelectedItems(value);
    props.onSelect && props.onSelect(value);
    setVisible(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
    props.onSelect(null);
    setSelectedTags([]);
  };

  return (
    <Popover
      visible={visible}
      placement="bottomLeft"
      className="super-picker"
      onVisibleChange={(v) => {
        if (!v) {
          ref.current.revert();
        }
        setVisible(v);
      }}
      trigger="click"
      content={() => (
        <DropDownWrapper
          showFooter
          onCreate={props.onSaveWorkspace}
          showAddButton={true}
          enableAddButton={props.searchValue !== ''}
          enableManageButton={false}
          count={total}
          onClear={() => ref.current.clear()}
          onClose={() => {
            ref.current.revert();
            setVisible(false);
          }}
        >
          <Row gutter={22}>
            <Col span={24}>
              <Picker
                onSelect={(t) => handleSelect(t)}
                onSearchChange={props.onChangedSearch}
                ref={ref}
                addable
                multiselect={false}
                alwaysShowSearch={true}
                hideAllRow={true}
                placeholder={props.label}
                value={selectedItems}
                options={props?.typesData || []}
              />
            </Col>
          </Row>
        </DropDownWrapper>
      )}
    >
      <PickerTags
        selected={selectedTags}
        maxTagCount={2}
        label={props.label}
        onClick={() => setVisible(true)}
        open={visible}
        onClear={handleClear}
      />
    </Popover>
  );
});

export default WorkspacePicker;
