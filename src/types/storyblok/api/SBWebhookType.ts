export type SBStoryPublishedPayload = {
  text: string;
  action: 'published';
  space_id: number;
  story_id: number;
  full_slug: string;
};

export type SBStoryUnpublishedPayload = {
  text: string;
  action: 'unpublished';
  space_id: number;
  story_id: number;
  full_slug: string;
};

export type SBStoryDeletedPayload = {
  text: string;
  action: 'deleted';
  space_id: number;
  story_id: number;
};

export type SBReleaseMergedPayload = {
  text: string;
  action: 'merged';
  space_id: number;
  release_id: number;
}

export type SBDatasourceUpdatedPayload = {
  text: string;
  action: 'entries_updated';
  space_id: number;
  datasource_slug: string;
}

export type SBWebhookPayload = SBStoryPublishedPayload
  | SBStoryUnpublishedPayload
  | SBStoryDeletedPayload
  | SBReleaseMergedPayload
  | SBDatasourceUpdatedPayload;
