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

/**
 * Decoder Convert String to Object
 * @param param DecoderParam
 * @returns T | Object | null
 */
export function convertStringToObject<T>(param: DecoderParam<T>): T | null {
  const { input, classInstance } = param;

  /// Blueprint object that we want to create and casting to Object
  const obj = classInstance as Object;

  /// Defining obj metadata
  /// Metadata gives us structured blueprint of that object
  const fields: Array<FieldParam> | undefined =
    param.fields ?? Reflect.getMetadata(Meta.FIELD, obj);
  const fieldNumbers: Array<FieldNumberParam> | undefined =
    param.fieldNumbers ?? Reflect.getMetadata(Meta.FIELD_NUMBER, obj);
  const fieldLists: Array<FieldListParam<typeof obj>> | undefined =
    param.fieldLists ?? Reflect.getMetadata(Meta.FIELD_LIST, obj);

  /// Temporary string that preserves only after substring of index length
  let tempSubset: string = "";

  /// Preserve as a pointer on that input (long string)
  /// Remember that string is actually an Array of Character
  let index: number = 0;

  if (!fields) return null;

  /// Looping on fields metadata to purposely gives value on each properties within a class
  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length, trim } = field.metadata;

    /// Reset temporary string each loop
    tempSubset = "";

    /// This variable will passed down to other function and its value will be changed inside that function
    /// So Reset the value after use / loop, this is because side effect of pass by reference
    index = param.index;

    switch (type) {
      case "STRING":
        /// Substring that input (long string)
        tempSubset = input.substring(index, index + length);

        /// Trim at the end / Right Trim
        if (trim === "LTRIM") return null;
        tempSubset = tempSubset.trimEnd();

        /// Gives value to property within a class
        obj[propertyKey] = tempSubset;

        /// Increment the length after successfully gives value to property
        param.index += length;
        break;
      case "NUMBER":
        /// Substring that input (long string)
        tempSubset = input.substring(index, index + length);

        /// Trim at the start / Left Trim
        if (trim === "RTRIM") return null;
        tempSubset = tempSubset.trimStart();

        /// Find number metadata within a class based on what property to be gives value
        const fieldNumber: FieldNumberParam | undefined = fieldNumbers?.find(
          (fieldNumber) => {
            return fieldNumber.propertyKey === propertyKey;
          }
        );

        if (fieldNumber === undefined) return null;

        /// Pass by reference
        const paramNumber: ParseNumberParam = {
          tempSubset,
          fieldNumber,
        };

        /// Gives value to a specific property within a class
        obj[propertyKey] = parseFieldNumber(paramNumber);

        /// Increment the length after successfully gives value to property
        param.index += length;

        break;
      case "LIST":
        /// No Trim any input / tempSubset of that long string
        if (trim != "NONE") return null;

        /// Find list metadata within a class based on what property to be gives value
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

        /// Since paramList variable is pass by reference to another function / child function (parseFieldList)
        /// That child function can changing paramList variable inside and back to its parent function
        if (parseFieldList(paramList) === false) return null;

        /// Gives value to property within a class with paramList variable that changed inside child function (parseFieldList)
        obj[propertyKey] = paramList.obj;

        /// Increment the length after successfully gives value to property with paramList variable
        param.index = paramList.index;

        break;
      case "VO":
        /// No Trim any input / tempSubset of that long string
        if (trim != "NONE") return null;

        /// Pass by reference
        const paramVo: ParseFieldVoParam = {
          obj: obj[propertyKey],
          input,
          index,
        };

        /// Since paramVo variable is pass by reference to another function / child function (parseFieldVo)
        /// That child function can changing paramVo variable inside and back to its parent function
        if (parseFieldVo(paramVo) === false) return null;

        /// Gives value to property within a class with paramVo variable that changed inside child function (parseFieldVo)
        obj[propertyKey] = paramVo.obj;

        /// Increment the length after successfully gives value to property with paramVo variable
        param.index = paramVo.index;

        break;
      default:
        break;
    }
  }

  /// Return object after assigning value to its properties and casting back to Generic Type
  /// Generic type ensure strictly type checking powered by Typescript
  return obj as T;
}

interface ParseNumberParam {
  tempSubset: string; /// That long string that already substring / cut down from parent function
  fieldNumber: FieldNumberParam; /// Number metadata
}

function parseFieldNumber(paramNumber: ParseNumberParam): number | null {
  /// Temporer value of number
  let value: number;

  switch (paramNumber.fieldNumber.metadata.type) {
    /// Floating type of number
    case "DECIMAL":
    case "DOUBLE":
    case "FLOAT":
      /// Check whetever decimal point at metadata is exists and give default value 0 to it
      const decimal = paramNumber.fieldNumber?.metadata.decimal ?? 0;

      /// Convert that long string -> modify string -> numeric that already substring / cut down from parent function
      /// Since this is a floating number, concat "." (dots) before converting
      value = Number(
        paramNumber.tempSubset.slice(0, -1 * decimal) +
          "." +
          paramNumber.tempSubset.slice(-1 * decimal)
      );

      /// When converting modified string, it has change that modified string is not a numerical
      /// So value variable has posibilty has a value of numeric or NaN (Not a Number)
      if (isNaN(value)) {
        return null;
      }
      return value;

    /// Non Floating type of number
    case "LONG":
    case "INT":
    case "SHORT":
      /// Convert that long string that already substring / cut down from parent function
      value = Number(paramNumber.tempSubset);

      /// When converting that string, it has change that modified string is not a numerical
      /// So valua variable has posibilty has a value of number or NaN (Not a Number)
      if (isNaN(value)) {
        return null;
      }
      return value;
    default:
      return null;
  }
}

interface ParseFieldListParam {
  obj: Array<Object>; /// Instance of current array object child
  input: string; /// Long string
  index: number; /// Preserve as a pointer on that input (long string) that currently pointing at
  fieldList: FieldListParam<Object> | undefined; /// Metadata of its current object
}

function parseFieldList(paramList: ParseFieldListParam): boolean {
  /// Check whetever current object child is undefined.
  /// It means when creating a DTO class and one of its property is a Array of other DTO.
  /// That property (current array object child) must have initialization at least one instance inside the array
  /// It is a mandatory, because that current object child gives structured blueprint when defining metadata
  if (paramList.obj.length === 0 && !paramList.obj[0]) return false;

  /// Takes one object child from Array
  const childObject = paramList.obj[0];

  /// Defining obj metadata
  /// Metadata gives us structured blueprint of that object child
  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    childObject
  );
  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    childObject
  );
  const fieldLists: Array<FieldListParam<typeof childObject>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, childObject);

  if (fields === undefined) return false;

  /// Length of input of that long string that will be pointing to be trimmed for creating Array of Object
  let lengthInput = 0;
  for (const field of fields) {
    lengthInput += field.metadata.length;
  }

  /// Reset that Array of Object since we already has a metadata (fields, fieldNumbers, fieldLists) of that object.
  /// That metadata gives us structured blueprint of object child.
  paramList.obj = [] as Array<typeof childObject>;

  /// Length before Array to be substring / cut down, usually 8 char at DevonC default configuration
  /// To indicate how many list preserve at the input (long string)
  const lengthList: number = paramList.fieldList?.metadata.length ?? 8;

  /// Substring input (long string)
  const tempSubset: string = paramList.input.substring(
    paramList.index,
    paramList.index + lengthList
  );

  /// Increment
  paramList.index += lengthList;

  /// When converting substring input, it has change that substring input is not a numerical
  /// So value variable has posibilty has a value of numeric or NaN (Not a Number)
  const count: number = Number(tempSubset);
  if (isNaN(count)) return false;

  /// Looping based on number of object child need to be created
  for (let i = 0; i < count; i++) {
    /// Perform Deep Copy so it does not referencing into the same object and create a new one instead
    const copyClassInstance = structuredClone(childObject);

    /// Substring input (long string) into modified string that will be created into one single object child
    const childInput = paramList.input.substring(
      paramList.index,
      paramList.index + lengthInput
    );

    /// Pass by reference
    /// Since we give modified input that already substring / cut down, so the index will start at 0
    /// That metadata from object child will be passing down as a blueprint to create object child
    /// Also passing down a new created object child that its property will be valued based its own metadata
    const param: DecoderParam<Object> = {
      index: 0,
      input: childInput,
      classInstance: copyClassInstance,
      fields,
      fieldNumbers,
      fieldLists,
    };

    /// This is a Recursive Part
    /// We give that responsbility of creating object child back to convertStringToObject child function
    /// Return value is an object that we give as parameter that already modified
    const parsedInput = convertStringToObject<typeof childObject>(param);

    if (parsedInput === null) return false;

    /// Gives value to property within a class with paramList variable that changed inside child function (parseFieldList)
    /// Push that one object that had been created by convertStringToObject child function into Array of Object
    /// Remember paramList variable is pass by reference variable from its parent function
    paramList.obj.push(parsedInput as typeof childObject);

    /// Increment the length after successfully push object child into array
    paramList.index += lengthInput;
  }

  return true;
}

interface ParseFieldVoParam {
  obj: Object; /// Instance of current object child
  input: string; /// Long string
  index: number; /// Preserve as a pointer on that input (long string) that currently pointing at
}

function parseFieldVo(paramVo: ParseFieldVoParam): boolean {
  /// Defining obj metadata
  /// Metadata gives us structured blueprint of that object child
  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    paramVo.obj
  );
  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    paramVo.obj
  );
  const fieldLists: Array<FieldListParam<typeof paramVo.obj>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, paramVo.obj);

  /// Pass by reference
  /// We give input (long string) and index same as parent.
  /// That metadata from object child will be passing down as a blueprint to create object child
  /// Also passing down a new created object child that its property will be valued based its own metadata
  const param: DecoderParam<typeof paramVo.obj> = {
    index: paramVo.index,
    input: paramVo.input,
    classInstance: paramVo.obj,
    fields,
    fieldNumbers,
    fieldLists,
  };

  /// This is a Recursive Part
  /// We give that responsbility of creating object child back to convertStringToObject child function
  /// Return value is an object that we give as parameter that already modified
  /// Remember paramVo variable is pass by reference variable from its parent function
  paramVo.obj = convertStringToObject<typeof paramVo.obj>(param) ?? {};

  /// Since param.index is a pass by reference, so the value will be modified inside convertStringToObject child function
  /// So paramVo.index must has the same value to it.
  paramVo.index = param.index;

  return true;
}
