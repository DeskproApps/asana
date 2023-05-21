/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

/** Deskpro */
export const APP_PREFIX = "asana";

export const ENTITY = "linkedAsanaTask";

export const placeholders = {
  ACCESS_TOKEN: "__access_tokens__",
};

/** Asana */
export const BASE_URL = "https://app.asana.com/api/1.0";

export const TAG_FIElDS = ["name", "color"];

export const MEMBER_FIELDS = ["email", "name", "photo"];

export const WORKSPACE_FIELDS = ["name"];

export const PROJECT_FIELDS = ["name", "permalink_url"];

export const TASK_FIELDS = [
  "name",
  "completed",
  "due_at",
  "due_on",
  "permalink_url",
  ...TAG_FIElDS.map((field) => `tags.${field}`),
  ...MEMBER_FIELDS.map((field) => `assignee.${field}`),
  ...PROJECT_FIELDS.map((field) => `projects.${field}`),
]
