// Generated from the GatherDeal public API contracts. Do not edit.

export type ContentParam = {
  kind: "none";
} | {
  kind: "text";
  text: string;
};

export interface CreateItemParam {
  content: ContentParam;
}

export interface Item {
  revision: string;
}
