import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Popover, Space, Typography } from 'antd';
import { Picker, DropDownWrapper, PickerTags, useDataFetchHook, GameIcon } from '@supersonic-studios/ui-components';

const { Text } = Typography;
const GamesPicker = forwardRef((props: any, gamePickerRef) => {
  const [state] = useState({
    showFooter: true,
    showSearch: true,
    multiselect: true
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef({} as any);

  useEffect(() => {
    if (props.value) {
      setSelectedItems(props.value);
    }
  }, []);

  useImperativeHandle(gamePickerRef, () => ({
    clear: () => {
      setTotal(0);
      setSelectedItems([]);
      props.onSelect(null);
    }
  }));

  const { data, mapped } = useDataFetchHook({
    useQueryString: false,
    httpConfig: {
      url: `${window.platforms.apiHost}/v1/admin/published-games?`,
      params: {
        include_prototypes: !!props.includePrototypes
      }
    },
    defaultFilters: {
      _limit: [1000],
      _order: ['asc'],
      _page: [1],
      _sort: ['name'],
      q: ['']
    },
    mapByKey: 'id'
  });
  const options = (data || []).map((m) => ({ label: m.name, value: m.id, img: m?.iconUrl }));

  const handleSelect = () => {
    setSelectedItems(ref.current.getSelection());
    props.onSelect(ref.current.getSelection());
    setVisible(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
    props.onSelect(null);
  };

  const closeDropDown = () => {
    ref.current.revert();
    setVisible(false);
  };
  const tags = selectedItems.map((m) => (mapped[m] ? mapped[m].name : ''));
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
        <DropDownWrapper showFooter count={total} onSelect={handleSelect} onClear={handleClear} onClose={closeDropDown}>
          <Row gutter={22}>
            <Col span={24}>
              <Picker
                onSelect={(t) => setTotal(t.length)}
                ref={ref}
                addable
                maxItems={50}
                itemRender={(option: any) => (
                  <Space>
                    <GameIcon img={option.img} size={20} />
                    <Text>{option?.label}</Text>
                  </Space>
                )}
                multiselect={state.multiselect}
                showSearch={state.showSearch}
                placeholder="Game Title"
                value={selectedItems}
                options={options}
              />
            </Col>
          </Row>
        </DropDownWrapper>
      )}
    >
      <PickerTags
        selected={tags?.[0] ? tags : []}
        maxTagCount={2}
        label="Game Title"
        onClick={() => setVisible(true)}
        open={visible}
        onClear={handleClear}
      />
    </Popover>
  );
});

export default GamesPicker;
