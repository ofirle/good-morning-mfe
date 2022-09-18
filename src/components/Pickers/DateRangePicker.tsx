import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import { Row, Col, Popover } from 'antd';
import { DatePicker, DropDownWrapper, PickerTags } from '@supersonic-studios/ui-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Namespace } from '../../types/i18n.enum';

const option: any = {
  label: 'All Times',
  amount: undefined,
  unit: 'days',
  action: 'subtract',
  key: 'all',
};

const options = [
  {
    ...option, key: '7days', label: 'Last 7 days', amount: 6,
  },
  {
    ...option, key: '14days', label: 'Last 14 days', amount: 13,
  },
  {
    ...option, key: '30days', label: 'Last 30 days', amount: 29,
  },
];

function toDate(date) {
  return date && new Date(date);
}

const DateRangePicker = forwardRef((props: any, pickerRef) => {
  const { t } = useTranslation(Namespace.Common);

  const [total] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef({} as any);
  const [selected, setSelected] = useState({
    from: toDate(props.value?.startDate),
    to: toDate(props.value?.endDate),
  } as any);

  useImperativeHandle(pickerRef, () => ({
    clear: () => {
      setSelected({ from: undefined, to: undefined });
      if (props.onSelect) {
        props.onSelect({ startDate: null, endDate: null });
      }
    },
  }));

  const getOptionByKey = (key: string) => {
    console.log(key);
    const op = key && options.find((o) => o.key === key);
    return op && op.label;
  };

  const toFormattedDates = (date) => (date
    ? [moment(date).format('YYYY-MM-DD')]
    : []);
  const handleSelect = () => {
    const { from, to, key } = ref.current.getSelection();
    setSelected({ from, to });
    setVisible(false);
      console.log({ startDate: toFormattedDates(from), endDate: toFormattedDates(to || from) });
    if (key === 'all') {
      if (props.onSelect) {
        props.onSelect({ startDate: null, endDate: null });
      }
    } else if (props.onSelect) {
      props.onSelect({ startDate: toFormattedDates(from), endDate: toFormattedDates(to || from) });
    }
  };

  function formatTag() {
    const from = selected?.from?.toLocaleDateString
      ? selected.from.toLocaleDateString()
      : '';
    const to = selected?.to?.toLocaleDateString
      ? selected.to.toLocaleDateString()
      : '';
    if (!from) {
      return [];
    }
    if (!to || from === to) {
      return [from];
    }
    return [`${from}-${to}`];
  }

  let tags: any = formatTag();
  if (selected.key) {
    tags = [getOptionByKey(selected.key)];
  }

  const handleClear = () => {
    setSelected({ from: undefined, to: undefined });
    if (props.onSelect) {
      props.onSelect({ startDate: null, endDate: null });
    }
  };

  return (
    <Popover
      visible={visible}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      placement="bottomLeft"
      className="super-picker"
      onVisibleChange={(v) => {
        setVisible(v);
      }}
      trigger="click"
      content={() => (
        <DropDownWrapper
          showFooter
          count={total + total2}
          onSelect={handleSelect}
          onClear={() => ref.current.clear()}
          onClose={() => setVisible(false)}
        >
          <Row gutter={22}>
            <Col span={24}>
              <DatePicker
                hideTitle
                ref={ref}
                range
                options={options}
                placeholder=""
                value={selected}
                onSelect={(tt) => setTotal2(tt && tt.from ? 1 : 0)}
              />
            </Col>
          </Row>
        </DropDownWrapper>
      )}
    >
      <PickerTags
        selected={tags}
        maxTagCount={3}
        onClear={handleClear}
        label={props.title}
        onClick={() => setVisible(true)}
        allowClear={props.allowClear}
      />
    </Popover>
  );
});

export default DateRangePicker;
