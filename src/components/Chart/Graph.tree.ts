import {ChartUnit} from '../../types/chartUnit.enum';
import {CohortBreakdown} from '../../types/cohort-breakdown.enum';

export const tree = {
  tabs: [
    {
      icon: 'fsf_',
      text: 'Cost',
      type: 'cost',
      tooltipContent: 'cost tooltip',
    },
    {
      icon: 'installs',
      text: 'Installs',
      type: 'installs',
      tooltipContent: 'installs tooltip',
    },
    {
      icon: 'revenue',
      text: 'Revenue',
      type: 'revenue',
      tooltipContent: 'revenue tooltip',
    },
  ],
  cost: {
    isCohorted: false,
    breakdowns: [CohortBreakdown.MediaSource, CohortBreakdown.Title, CohortBreakdown.Country]
  },
  installs: {
    isCohorted: false,
    breakdowns: [CohortBreakdown.MediaSource, CohortBreakdown.Title, CohortBreakdown.Country]
  },
  revenue: {
    isCohorted: false,
    breakdowns: [CohortBreakdown.MediaSource, CohortBreakdown.Title, CohortBreakdown.Country]
  },
  profit: {
    isCohorted: false,
    breakdowns: [CohortBreakdown.MediaSource, CohortBreakdown.Title, CohortBreakdown.Country]
  },
  total_revenue: {
    view: [
      { id: 'cumulative', displayText: 'Cumulative', preselected: true },
      { id: 'daily', displayText: 'Daily' },
    ],
    chartUnit: ChartUnit.Currency,
    breakdowns: [CohortBreakdown.None, CohortBreakdown.MediaSource, CohortBreakdown.Title, CohortBreakdown.Country],
    isCohorted: true,
  },
};
