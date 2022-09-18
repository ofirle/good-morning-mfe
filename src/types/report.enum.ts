import { AdUnit } from './ad-unit.enum';
import { ChartUnit } from './chartUnit.enum';
import { CohortBreakdown } from './cohort-breakdown.enum';
import { createEnum, EnumerationObject, EnumerationType } from './enum';

export enum Report {
  AdRevenue = 'ads',
  InAppRevenue = 'iap',
  TotalRevenue = 'total_revenue',
  Impressions = 'impressions',
  APPU = 'appu',
  Playtime = 'playtime',
  Retention = 'retention',
  EngagementRate = 'engagement_rate',
  UsageRate = 'usage_rate',
  ImpressionsPerDAU = 'impressions_per_dau',
  FullScreenFrequency = 'full_screen_frequency'
}

export enum ReportTypes {
  PlayerAnalytics = 'player_analytics',
  AdsAnalyitcs = 'ads',
  ArpuAnalytics = 'arpu_analytics'
}

export enum AdUnits {
  Interstitial = 'interstitial',
  RewardedVideo = 'rewarded_video',
  Banner = 'banner'
}

export enum AnalyticsView {
  Cumulative = 'cumulative',
  Daily = 'daily'
}

export enum AnalyticsType {
  FullScreenFrequency = 'full_screen_frequency',
  Impressions = 'impressions',
  ShowRate = 'show_rate',
  UsageRate = 'usage_rate',
  ImperssionsPerDAU = 'impressions_per_dau'
}

// tslint:disable-next-line:no-empty-interface
export interface ReportObject extends EnumerationObject {
  chartUnit: ChartUnit;
  isCohorted: boolean;
  adminOnly: boolean;
  adUnits: [AdUnit];
}

export const reportTypesEnum = createEnum<ReportTypes, ReportObject>(
  {
    [ReportTypes.ArpuAnalytics]: {
      name: 'ARPU Reports',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      adminOnly: true,
    },
    [ReportTypes.AdsAnalyitcs]: {
      name: 'Ads Reports',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      adminOnly: true,
    },
    [ReportTypes.PlayerAnalytics]: {
      name: 'Player Reports',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      adminOnly: true,
    },
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'ReportType',
    pluralDisplayText: 'ReportTypes',
  },
);

export const reportEnum = createEnum<Report, ReportObject>(
  {
    ['cost']: {
      name: 'Cost',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      breakdowns: [
        CohortBreakdown.MediaSource,
        // CohortBreakdown.Title,
        // CohortBreakdown.Country,
      ],
      adUnits: [],
      adminOnly: true,
    },
    ['installs']: {
      name: 'Installs',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      breakdowns: [
        CohortBreakdown.MediaSource,
        // CohortBreakdown.Title,
        // CohortBreakdown.Country,
      ],
      adUnits: [],
      adminOnly: true,
    },
    ['revenue']: {
      name: 'Revenue',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      breakdowns: [
        CohortBreakdown.MediaSource,
        // CohortBreakdown.Title,
        // CohortBreakdown.Country,
      ],
      adUnits: [],
      adminOnly: true,
    },
    ['profit']: {
      name: 'Profit',
      chartUnit: ChartUnit.Currency,
      isCohorted: true,
      breakdowns: [
        CohortBreakdown.MediaSource,
        // CohortBreakdown.Title,
        // CohortBreakdown.Country,
      ],
      adUnits: [],
      adminOnly: true,
    },
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'Report',
    pluralDisplayText: 'Reports',
  }
);
