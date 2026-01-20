export type LocalStorageSchema = {};

export type LocalStorageKey = Extract<keyof LocalStorageSchema, string>;
