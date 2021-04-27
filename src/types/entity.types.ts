export type Studio = {
  accountManagerId?: string;
  autoApproval?: string;
  createdAt?: Date;
  gameAnalyticsId?: number;
  id: string;
  name?: string;
  publishingManagerId?: string;
  salesforceId?: string;
  type?: string;
};

export type User = {
  createdAt: string;
  createdBy: string;
  email: string;
  id: string;
  name: string;
  password: string;
  roleId: string;
  studio: Studio;
  studioId: string;
  updatedAt: string;
  updatedBy: string;
};
