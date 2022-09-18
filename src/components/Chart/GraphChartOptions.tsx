import moment from 'moment';
import { ChartUnit, chartUnitEnum } from '../../types/chartUnit.enum';
import { reportEnum } from '../../types/report.enum';
import { shortNumberTransform } from '../../utils/numbers.utils';

export const chartOptions = (isCohorted, type, users) => ({
  ...{
    tooltip: {
      borderWidth: 1,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#bfbfbf',
      titleColor: '#595959',
      titleFont: { size: '12px' },
      bodyFont: { size: '12px' },
      bodyColor: '#595959',
      backgroundColor: 'white',
      usePointStyle: true,
      boxWidth: 8,
      boxHeight: 8,
      callbacks: isCohorted
        ? {
          title(context) {
            return `${context[0].dataIndex} days since install`;
          },
          label(context) {
            return [
              `${context.dataset.label}: ${
                reportEnum.get(type).chartUnit === ChartUnit.Time
                  ? Math.round(Number(context.raw))
                  : Number(context.raw).toFixed(1)
              }${chartUnitEnum.get(reportEnum.get(type).chartUnit)?.sign}`,
            ];
          },
          labelPointStyle() {
            return {
              pointStyle: 'circle',
              rotation: 0,
            };
          },
          afterLabel(context) {
            return `Users: ${shortNumberTransform(users[context.dataIndex][context.dataset.id])}`;
          },
        }
        : {
          title() {
            return '';
          },
          label(context) {
            return `${context.dataset.label}`;
          },
          labelPointStyle() {
            return {
              pointStyle: 'circle',
              rotation: 0,
            };
          },
          afterLabel(context) {
            return `${moment(context.label).format('DD/MM/YY')}\n${reportEnum.get(type)?.name}: 
              ${
  reportEnum.get(type).chartUnit === ChartUnit.Time
    ? Math.round(Number(context.raw))
    : Number(context.raw).toFixed(1)
  }
              ${chartUnitEnum.get(reportEnum.get(type)?.chartUnit)?.sign}`;
          },
        },
    },
  },
  ...(!isCohorted && {
    scales: {
      x: {
        ticks: {
          callback(val) {
            return moment(this.getLabelForValue(val)).format('DD/MM');
          },
          color: '#A3A3A3',
        },
        grid: {
          display: false,
        },
      },
    },
  }),
});
