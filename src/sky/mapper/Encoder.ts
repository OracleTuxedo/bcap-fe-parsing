import "reflect-metadata";
import {
  FieldParam,
  Meta,
  FieldNumberParam,
  FieldListParam,
} from "../decorator";

export function convertObjectToString(obj: Object): string | null {
  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    obj
  );
  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    obj
  );
  const fieldLists: Array<FieldListParam<typeof obj>> | undefined =
    Reflect.getMetadata(Meta.FIELD_LIST, obj);

  if (!fields) return null;

  let resultString: string = "";

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length } = field.metadata;

    switch (type) {
      case "STRING":
        if (!obj[propertyKey]) resultString += "".padEnd(length, " ");
        else resultString += (obj[propertyKey] as string).padEnd(length, " ");
        // resultString += (obj[propertyKey] as string).padEnd(length, " ");
        break;

      case "NUMBER":
        const fieldNumber: FieldNumberParam | undefined = fieldNumbers?.find(
          (fieldNumber) => {
            return fieldNumber.propertyKey === propertyKey;
          }
        );

        if (fieldNumber === undefined) return null;

        resultString += parseFieldNumber(
          obj[propertyKey] as number,
          field,
          fieldNumber
        );
        break;

      case "LIST":
        const fieldList: FieldListParam<typeof obj> | undefined =
          fieldLists?.find((fieldList) => {
            return fieldList.propertyKey === propertyKey;
          });

        resultString += parseFieldList(obj[propertyKey], fieldList);
        break;

      case "VO":
        const tempResultString = convertObjectToString(obj[propertyKey]);
        if (!tempResultString) return null;
        resultString += tempResultString;
        break;

      default:
        break;
    }
  }

  return resultString;
}

function parseFieldNumber(
  value: number,
  field: FieldParam,
  fieldNumber: FieldNumberParam
): string {
  const { length } = field.metadata;
  const { decimal } = fieldNumber.metadata;

  switch (fieldNumber.metadata.type) {
    case "DECIMAL":
    case "DOUBLE":
    case "FLOAT":
      if (!value) return "".padStart(length, "0");
      return (value * Math.pow(10, decimal)).toString().padStart(length, "0");

    case "LONG":
    case "INT":
    case "SHORT":
      if (!value) return "".padStart(length, "0");
      return value.toString().padStart(length, "0");

    default:
      return "";
  }
}

function parseFieldList(
  obj: Array<Object>,
  fieldList: FieldListParam<Object> | undefined
): string | null {
  if (!obj) return null;
  let resultString = "";
  const length = fieldList?.metadata.length ?? 8;
  resultString += obj.length.toString().padStart(length, "0");

  for (let i = 0; i < obj.length; i++) {
    resultString += convertObjectToString(obj[i]);
  }
  return resultString;
}
