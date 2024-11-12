// import { ClassConstructor } from "class-transformer";

export enum Meta {
  FIELD = "field",
  FIELD_NUMBER = "fieldnumber",
  FIELD_LIST = "fieldlist",
}

export interface FieldMeta {
  type: "STRING" | "CHAR" | "BYTES" | "NUMBER" | "LIST" | "VO";
  length: number;
  trim: "LTRIM" | "RTRIM" | "NONE";
}

export interface FieldNumberMeta {
  type: "DECIMAL" | "DOUBLE" | "FLOAT" | "INT" | "LONG" | "SHORT";
  decimal: number;
  pointLength?: number;
  signLength?: number;
}

export interface FieldListMeta<T> {
  // classInstance: T; /// No longer needed, since created instance responsbility on its parent
  length: number;
}
