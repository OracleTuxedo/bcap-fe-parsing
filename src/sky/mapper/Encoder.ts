import "reflect-metadata";
import { FieldParam } from "../decorator/Field";
import { Meta } from "../decorator/Meta";
import { FieldNumberParam } from "../decorator/FieldNumber";

export function convertObjectToString(obj: Object): string | null {
  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    obj
  );
  const fieldNumbers: Array<FieldNumberParam> | undefined = Reflect.getMetadata(
    Meta.FIELD_NUMBER,
    obj
  );

  if (!fields) return null;

  let resultString: string = "";

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length } = field.metadata;

    switch (type) {
      case "STRING":
        resultString += (obj[propertyKey] as string).padEnd(length, " ");
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
        const param: {
          objArray: Array<Object>;
        } = { objArray: obj[propertyKey] };

        // Pass by reference
        resultString += parseFieldList(param);
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
      return (value * Math.pow(10, decimal)).toString().padStart(length, "0");

    case "LONG":
    case "INT":
    case "SHORT":
      return value.toString().padStart(length, "0");

    default:
      return "";
  }
}

function parseFieldList(param: { objArray: Array<Object> }): string | null {
  if (!param.objArray) return null;
  let resultString = "";

  resultString += param.objArray.length.toString().padStart(8, "0");

  for (let i = 0; i < param.objArray.length; i++) {
    resultString += convertObjectToString(param.objArray[i]);
  }
  return resultString;
}
