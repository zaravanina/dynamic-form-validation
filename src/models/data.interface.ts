export type FieldConfig = {
  title: string;
  alias: string;
  type: string;
  regex: string;
  message: string;
  placeholder?: string;
};

export type FieldState = {
  input: HTMLInputElement;
  errorEl: HTMLParagraphElement;
  regex: RegExp;
  message: string;
};

export type FormEntryData = {
  name: string;
  phone?: number;
  email: string;
  password: string;
  id: number;
  created_at: string;
};
