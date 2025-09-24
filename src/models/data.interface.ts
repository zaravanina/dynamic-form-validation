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
