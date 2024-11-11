import "reflect-metadata";
// import { ClassConstructor } from "class-transformer";
import {
  Meta,
  FieldParam,
  FieldNumberParam,
  FieldListParam,
  // FieldVoParam,
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

  // const fieldVos: Array<FieldVoParam<Object>> | undefined =
  //   param.fieldVos ?? Reflect.getMetadata(Meta.FIELD_VO, obj);

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

        if (fieldList === undefined) return null;

        /// Pass by reference
        const paramList: ParseFieldListParam = {
          obj: obj[propertyKey],
          input,
          index,
          fieldList,
        };

        if (parseFieldList(paramList) === false) return null;

        /// No need, because that object changed by reference within parseFieldList function
        // obj[propertyKey] = paramList.obj[propertyKey];
        obj[propertyKey] = paramList.obj;
        param.index = paramList.index;

        break;
      case "VO":
        // const fieldVo: FieldVoParam<Object> | undefined = fieldVos?.find(
        //   (fieldVo) => {
        //     return fieldVo.propertyKey === propertyKey;
        //   }
        // );
        // if (fieldVo === undefined) return null;

        /// Pass by reference
        const paramVo: ParseFieldVoParam = {
          obj: obj[propertyKey],
          input,
          index,
          // fieldVo,
        };

        if (parseFieldVo(paramVo) === false) return null;

        /// No need, because that object changed by reference within parseFieldVo function
        // obj[propertyKey] = paramVo.obj[propertyKey];
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
  fieldList: FieldListParam<Object>;
}

function parseFieldList(paramList: ParseFieldListParam): boolean {
  // const { propertyKey } = paramList.fieldList;
  // const { classInstance } = metadata;

  if (paramList.obj.length === 0) return false;

  const thatObject = paramList.obj[0];

  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    thatObject
  );

  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    thatObject
  );

  const fieldLists: Array<FieldListParam<Object>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, thatObject);

  if (fields === undefined) return false;
  let lengthInput = 0;
  for (const field of fields) {
    lengthInput += field.metadata.length;
  }
  paramList.obj = [] as Array<typeof thatObject>;

  // Get count of list, usually 8 char before List at DevonC
  const tempSubset: string = paramList.input.substring(
    paramList.index,
    paramList.index + (paramList.fieldList.metadata.count ?? 8)
  );
  paramList.index += paramList.fieldList.metadata.count ?? 8;
  const count: number = Number(tempSubset);
  if (isNaN(count)) return false;

  for (let i = 0; i < count; i++) {
    /// Perform Deep Copy

    const copyClassInstance = structuredClone(thatObject);
    // const copyClassInstance = JSON.parse(
    //   JSON.stringify(classInstance)
    // ) as typeof classInstance;

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
    // const param: DecoderParam<Object> = getParam(childInput, classInstance);
    const parsedInput = convertStringToObject<typeof thatObject>(param);
    if (parsedInput === null) return false;
    paramList.obj.push(parsedInput as typeof thatObject);
    paramList.index += lengthInput;
  }

  return true;
}

interface ParseFieldVoParam {
  obj: Object;
  input: string;
  index: number;
  // fieldVo: FieldVoParam<Object>;
}

function parseFieldVo(paramVo: ParseFieldVoParam): boolean {
  // const { metadata } = paramVo.fieldVo;
  // const { classInstance } = metadata;

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
    /// TODO constructor dari parameter tersebut membutuhkan parameter dari SED03F107RInVo
    /// How to solve this ?
    classInstance: paramVo.obj,
    fields,
    fieldNumbers,
    fieldLists,
  };

  paramVo.obj = convertStringToObject<Object>(param) ?? {};
  paramVo.index = param.index;

  return true;
}
