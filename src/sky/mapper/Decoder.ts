import "reflect-metadata";

import {
  Meta,
  FieldParam,
  FieldNumberParam,
  FieldListParam,
} from "../decorator";

export interface DecoderParam<T> {
  index: number;
  input: string;
  classInstance: Object | T;
  fields?: Array<FieldParam> | undefined;
  fieldNumbers?: Array<FieldNumberParam> | undefined;
  fieldLists?: Array<FieldListParam<Object>> | undefined;
}

export function convertStringToObject<T>(param: DecoderParam<T>): T | null {
  const { input, classInstance } = param;

  const obj = classInstance as Object;

  const fields: Array<FieldParam> | undefined =
    param.fields ?? Reflect.getMetadata(Meta.FIELD, obj);

  const fieldNumbers: Array<FieldNumberParam> | undefined =
    param.fieldNumbers ?? Reflect.getMetadata(Meta.FIELD_NUMBER, obj);

  const fieldLists: Array<FieldListParam<Object>> | undefined =
    param.fieldLists ?? Reflect.getMetadata(Meta.FIELD_LIST, obj);

  let tempSubset: string = "";
  let index: number = 0;

  if (!fields) return null;

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length, trim } = field.metadata;

    tempSubset = "";
    index = param.index;

    switch (type) {
      case "STRING":
        tempSubset = input.substring(param.index, param.index + length);

        if (trim === "LTRIM") return null;
        tempSubset = tempSubset.trimEnd();

        obj[propertyKey] = tempSubset;
        param.index += length;
        break;
      case "NUMBER":
        tempSubset = input.substring(param.index, param.index + length);

        if (trim === "RTRIM") return null;
        tempSubset = tempSubset.trimStart();

        const fieldNumber: FieldNumberParam | undefined = fieldNumbers?.find(
          (fieldNumber) => {
            return fieldNumber.propertyKey === propertyKey;
          }
        );

        if (fieldNumber === undefined) return null;

        obj[propertyKey] = parseFieldNumber(tempSubset, fieldNumber);
        param.index += length;

        break;
      case "LIST":
        const fieldList: FieldListParam<Object> | undefined = fieldLists?.find(
          (fieldList) => {
            return fieldList.propertyKey === propertyKey;
          }
        );

        /// Pass by reference
        const paramList: ParseFieldListParam = {
          obj: obj[propertyKey],
          input,
          index,
          fieldList,
        };

        if (parseFieldList(paramList) === false) return null;

        obj[propertyKey] = paramList.obj;
        param.index = paramList.index;

        break;
      case "VO":
        /// Pass by reference
        const paramVo: ParseFieldVoParam = {
          obj: obj[propertyKey],
          input,
          index,
          // fieldVo,
        };

        if (parseFieldVo(paramVo) === false) return null;

        obj[propertyKey] = paramVo.obj;
        param.index = paramVo.index;

        break;
      default:
        break;
    }
  }

  return obj as T;
}

function parseFieldNumber(
  tempSubset: string,
  fieldNumber: FieldNumberParam
): number | null {
  let value: number;

  switch (fieldNumber.metadata.type) {
    case "DECIMAL":
    case "DOUBLE":
    case "FLOAT":
      const decimal = fieldNumber?.metadata.decimal ?? 0;
      value = Number(
        tempSubset.slice(0, -1 * decimal) + "." + tempSubset.slice(-1 * decimal)
      );
      if (isNaN(value)) {
        return null;
      }
      return value;
    case "LONG":
    case "INT":
    case "SHORT":
      value = Number(tempSubset);
      if (isNaN(value)) {
        return null;
      }
      return value;
    default:
      return null;
  }
}

interface ParseFieldListParam {
  obj: Array<Object>;
  input: string;
  index: number;
  fieldList: FieldListParam<Object> | undefined;
}

function parseFieldList(paramList: ParseFieldListParam): boolean {
  if (paramList.obj.length === 0 && !paramList.obj[0]) return false;

  const childObject = paramList.obj[0];

  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    childObject
  );

  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    childObject
  );

  const fieldLists: Array<FieldListParam<Object>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, childObject);

  if (fields === undefined) return false;

  let lengthInput = 0;
  for (const field of fields) {
    lengthInput += field.metadata.length;
  }

  paramList.obj = [] as Array<typeof childObject>;

  const lengthList: number = paramList.fieldList?.metadata.length ?? 8;

  const tempSubset: string = paramList.input.substring(
    paramList.index,
    paramList.index + lengthList
  );
  paramList.index += lengthList;

  const count: number = Number(tempSubset);
  if (isNaN(count)) return false;

  for (let i = 0; i < count; i++) {
    /// Perform Deep Copy
    const copyClassInstance = structuredClone(childObject);

    const childInput = paramList.input.substring(
      paramList.index,
      paramList.index + lengthInput
    );

    const param: DecoderParam<Object> = {
      index: 0,
      input: childInput,
      classInstance: copyClassInstance,
      fields,
      fieldNumbers,
      fieldLists,
    };

    const parsedInput = convertStringToObject<typeof childObject>(param);
    if (parsedInput === null) return false;
    paramList.obj.push(parsedInput as typeof childObject);
    paramList.index += lengthInput;
  }

  return true;
}

interface ParseFieldVoParam {
  obj: Object;
  input: string;
  index: number;
}

function parseFieldVo(paramVo: ParseFieldVoParam): boolean {
  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    paramVo.obj
  );

  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    paramVo.obj
  );

  const fieldLists: Array<FieldListParam<Object>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, paramVo.obj);

  const param: DecoderParam<Object> = {
    index: paramVo.index,
    input: paramVo.input,
    classInstance: paramVo.obj,
    fields,
    fieldNumbers,
    fieldLists,
  };

  paramVo.obj = convertStringToObject<Object>(param) ?? {};
  paramVo.index = param.index;

  return true;
}
