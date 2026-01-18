export type SessionStorageSchema = {
  'is-booted': true;
};

export type SessionStorageKey = Extract<keyof SessionStorageSchema, string>;
