import { createEnum, EnumerationObject, EnumerationType } from './enum';

export enum AdUnit {
  Overview = 'overview',
  Interstitial = 'interstitial',
  RewardedVideo = 'rewarded_video',
  Banner = 'banner'
}

// tslint:disable-next-line:no-empty-interface
export interface AdUnitObject extends EnumerationObject {}

export const adUnitEnum = createEnum<AdUnit, AdUnitObject>(
  {
    [AdUnit.Overview]: {
      name: 'All Ad Units',
    },
    [AdUnit.Interstitial]: {
      name: 'Interstitial',
    },
    [AdUnit.RewardedVideo]: {
      name: 'Rewarded Video',
    },
    [AdUnit.Banner]: {
      name: 'Banner',
    },
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'Ad Unit',
    pluralDisplayText: 'Ad Units',
  },
);
