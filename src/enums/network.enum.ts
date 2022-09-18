import { createEnum, EnumerationObject, EnumerationType } from './enum';

export enum CreativeNetwork {
  Vungle = 'vungle',
  IronSource = 'ironSource',
  Applovin = 'applovin',
  Unity = 'unity',
  TikTok = 'tikTok',
  Facebook = 'facebook',
  Snapchat = 'snapchat',
  Google = 'google',
  XPromo = 'xpromo'
}

export interface CreativeNetworkObject extends EnumerationObject {
  adsWizard: boolean;
  icon: string;
}

export enum MaturiyLevels {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  EVERYONE = 'Everyone'
}

export const creativeNetworkEnum = createEnum<CreativeNetwork, CreativeNetworkObject>(
  {
    [CreativeNetwork.Applovin]: {
      name: 'Applovin'
    },
    [CreativeNetwork.Facebook]: {
      name: 'Facebook',
      adsWizard: true
    },
    [CreativeNetwork.Google]: {
      name: 'Google',
      adsWizard: false
    },
    [CreativeNetwork.IronSource]: {
      name: 'ironSource',
      adsWizard: false
    },
    [CreativeNetwork.Snapchat]: {
      name: 'Snapchat'
    },
    [CreativeNetwork.TikTok]: {
      name: 'TikTok',
      adsWizard: true
    },
    [CreativeNetwork.Unity]: {
      name: 'Unity',
      adsWizard: true
    },
    [CreativeNetwork.Vungle]: {
      name: 'Vungle'
    }
  },
  {
    enumerationType: EnumerationType.String,
    singleDisplayText: 'Creative Network',
    pluralDisplayText: 'Creative Networks'
  }
);
