import "reflect-metadata";
// import { ClassConstructor } from "class-transformer";
import {
  Meta,
  FieldParam,
  FieldNumberParam,
  FieldListParam,
  FieldVoParam,
  // FieldVoParam,
} from "../decorator";
export interface DecoderParam<T> {
  index: number;
  input: string;
  classInstance: Object | T;
}

export function convertStringToObject<T>(param: DecoderParam<T>): T | null {
  const { input, classInstance } = param;
  const obj = classInstance as Object;

  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    obj
  );

  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    obj
  );

  const fieldLists: Array<FieldListParam<Object>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, obj);

  const fieldVos: Array<FieldVoParam<Object>> | undefined = Reflect.getMetadata(
    Meta.FIELD_VO,
    obj
  );

  let tempSubset: string = "";

  if (!fields) return null;

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length, trim } = field.metadata;

    tempSubset = "";

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
        if (fieldList === undefined) return null;

        /// Pass by reference
        const paramList: ParseFieldListParam = {
          obj,
          input,
          index: param.index,
          fieldList,
        };

        if (parseFieldList(paramList) === false) return null;

        /// No need, because that object changed by reference within parseFieldList function
        // obj[propertyKey] = paramList.obj[propertyKey];
        // param.index = paramList.index;

        break;
      case "VO":
        const fieldVo: FieldVoParam<Object> | undefined = fieldVos?.find(
          (fieldVo) => {
            return fieldVo.propertyKey === propertyKey;
          }
        );
        if (fieldVo === undefined) return null;

        /// Pass by reference
        const paramVo: ParseFieldVoParam = {
          obj,
          input,
          index: param.index,
          fieldVo,
        };

        if (parseFieldVo(paramVo) === false) return null;

        /// No need, because that object changed by reference within parseFieldVo function
        // obj[propertyKey] = paramVo.obj[propertyKey];
        // param.index = paramVo.index;

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
  obj: Object;
  input: string;
  index: number;
  fieldList: FieldListParam<Object>;
}

function parseFieldList(paramList: ParseFieldListParam): boolean {
  const { propertyKey, metadata } = paramList.fieldList;
  const { classInstance } = metadata;
  console.log(classInstance); // [Function Tire] atau Tire{}

  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    classInstance
  );
  if (fields === undefined) return false;
  let lengthInput = 0;
  for (const field of fields) {
    lengthInput += field.metadata.length;
  }
  paramList.obj[propertyKey] = [];

  // Get count of list, usually 8 char before List at DevonC
  const tempSubset: string = paramList.input.substring(
    paramList.index,
    paramList.index + 8
  );
  paramList.index += 8;
  const count: number = Number(tempSubset);
  if (isNaN(count)) return false;

  for (let i = 0; i < count; i++) {
    /// Perform Deep Copy
    const copyClassInstance = JSON.parse(
      JSON.stringify(classInstance)
    ) as typeof classInstance;
    console.log(copyClassInstance);

    const childInput = paramList.input.substring(
      paramList.index,
      paramList.index + lengthInput
    );
    console.log(childInput);
    const param: DecoderParam<Object> = {
      index: 0,
      input: childInput,
      classInstance: copyClassInstance,
    };
    const parsedInput = convertStringToObject(param);
    if (parsedInput === null) return false;
    paramList.obj[propertyKey].push(parsedInput as typeof classInstance);
    paramList.index += lengthInput;
  }
  return true;
}

interface ParseFieldVoParam {
  obj: Object;
  input: string;
  index: number;
  fieldVo: FieldVoParam<Object>;
}

function parseFieldVo(paramVo: ParseFieldVoParam): boolean {
  const { propertyKey, metadata } = paramVo.fieldVo;
  const { classInstance } = metadata;

  const param: DecoderParam<Object> = {
    index: paramVo.index,
    input: paramVo.input,
    /// TODO constructor dari parameter tersebut membutuhkan parameter dari SED03F107RInVo
    /// How to solve this ?
    classInstance: classInstance,
  };

  paramVo.obj[propertyKey] = convertStringToObject<Object>(param);
  paramVo.index = param.index;

  return true;
}
