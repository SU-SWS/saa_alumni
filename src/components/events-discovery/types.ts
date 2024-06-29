// TS dupe of SBLinkType
export type EventLink = {
    id: string;
    linktype: string;
    url: string;
    fieldtype: string;
    cached_url: string;
};

export type EventRichTextNodeType = {
  type: any;
  content: any;
};

// TS dupe of SBRichTextType
export type EventRichTextType = {
  type: 'doc',
  content: EventRichTextNodeType[];
};

export type EventImage = {
  filename: string;
  alt: string;
  focus: () => void;
}

export type EventHit = {
  objectID: string;
  title: string;
  start: string;
  end: string;
  city?: string;
  region?: string;
  address?: string;
  country?: string;
  eventUrl?: EventLink;
  subject: string[];
  experience: string[];
  description?: EventRichTextType;
  image?: EventImage;
  location?: string;
  format?: string;
}
