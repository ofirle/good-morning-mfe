import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Row, Col, Popover } from 'antd';
import { Picker, DropDownWrapper, PickerTags } from '@supersonic-studios/ui-components';

const DropdownPicker = forwardRef((props: any, pickerRef) => {
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
  }, [props.value]);

  const setTags = (selectedValues?: Array<string>, firstLoad?: boolean) => {
    if (firstLoad) {
      setSelectedTags(selectedValues);
      return;
    }
    const selection = selectedValues || ref.current.getSelection();
    // const selected = props.typesData.filter((item) => selection.includes(item.value));
    const selected = [];
    const newData = selected.map((item) => item.label);
    setSelectedTags(newData);
  };

  useImperativeHandle(pickerRef, () => ({
    clear: () => {
      setTotal(0);
      setSelectedTags([]);
      setSelectedItems([]);
      props.onSelect(null);
    }
  }));

  const handleSelect = () => {
    setTags();
    setSelectedItems(ref.current.getSelection());
    props.onSelect && props.onSelect(ref.current.getSelection());
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
          count={total}
          onSelect={handleSelect}
          onClear={() => ref.current.clear()}
          onClose={() => {
            ref.current.revert();
            setVisible(false);
          }}
        >
          <Row gutter={22}>
            <Col span={24}>
              <Picker
                onSelect={(t) => setTotal(t.length)}
                ref={ref}
                addable
                multiselect={true}
                showSearch={true}
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
        label={props.label || 'Live'}
        onClick={() => setVisible(true)}
        open={visible}
        onClear={handleClear}
      />
    </Popover>
  );
});

export default DropdownPicker;
