import { Priorities } from "./enums";

export const isValidTitle = (value: string | undefined) => {
  if (value !== "") return true;
  return false;
};
export const isValidDescription = (value: string | undefined) => {
  if (value !== "") return true;
  return false;
};
export const isValidDate = (value: string | undefined) => {
  if (true) return true;
  return false;
};
export const isValidPriority = (value: any) => {
  if (
    value === Priorities.low ||
    value === Priorities.middle ||
    value === Priorities.high ||
    value === ""
  )
    return true;
  return false;
};

export const onAccessRef = (ref: any) => {
  // When working with `inputRef`,
  // access it with `this.inputRef`
  // as a regular class field.
  if (!ref.current.value) return "";
  return ref.current.value;
};
