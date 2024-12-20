import moment from "moment";
import {
  FieldListParam,
  FieldNumberParam,
  FieldParam,
  Meta,
} from "../decorator";
import { SkyHeader } from "../vo";

export function getMicroTime(): string {
  return moment().format("YYYYMMDDSSSSSS");
}

export function globalSeq(): string {
  return Math.floor(100 + Math.random() * 900).toString();
}

export function makeOriginalGid(
  header: SkyHeader,
  fields: Array<FieldParam>
): string {
  let originalGid = "";
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { length } = field.metadata;
    if (propertyKey.startsWith("gid_")) {
      originalGid += (header[propertyKey] as string).padEnd(length, " ");
    }
  }
  return originalGid;
}

export function getPacketSize(obj: Object): number | null {
  let count = 0;
  // console.log(obj);

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
  // console.log(fields);
  if (!fields) return null;

  for (let i = 0; i < fields?.length; i++) {
    const field = fields[i];
    const { propertyKey } = field;
    const { type, length } = field.metadata;

    switch (type) {
      case "STRING":
        count += length;
        break;

      case "NUMBER":
        const fieldNumber: FieldNumberParam | undefined = fieldNumbers?.find(
          (fieldNumber) => {
            return fieldNumber.propertyKey === propertyKey;
          }
        );

        if (!fieldNumber) {
          // console.log("propertyKey :" + propertyKey);
          return null;
        }

        const { pointLength, signLength } = fieldNumber.metadata;
        count += length;
        count += pointLength ?? 0;
        count += signLength ?? 0;
        break;

      case "LIST":
        const fieldList: FieldListParam<typeof obj> | undefined =
          fieldLists?.find((fieldList) => {
            return fieldList.propertyKey === propertyKey;
          });

        if (!fieldList) {
          count += 8;
        } else {
          count += fieldList.metadata.length;
        }
        let countList = 0;
        if (!obj[propertyKey]) break;
        for (let i = 0; i < obj[propertyKey].length; i++) {
          countList += getPacketSize(obj[propertyKey][i]) ?? 0;
        }

        if (!countList) {
          // console.log("propertyKey :" + propertyKey);
          // console.log(obj[propertyKey]);
          return null;
        }
        count += countList;
        break;

      case "VO":
        const countVo = getPacketSize(obj[propertyKey]);
        if (!countVo) {
          // console.log("propertyKey :" + propertyKey);
          return null;
        }
        count += countVo;
        break;
      default:
        break;
    }
  }

  return count;
}
