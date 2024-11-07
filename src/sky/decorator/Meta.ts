// import { ClassConstructor } from "class-transformer";

export enum Meta {
  FIELD = "field",
  FIELD_NUMBER = "fieldnumber",
  FIELD_LIST = "fieldlist",
  FIELD_VO = "fieldvo",
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
  classInstance: T;
}

export interface FieldVoMeta<T> {
  classInstance: T;
}
