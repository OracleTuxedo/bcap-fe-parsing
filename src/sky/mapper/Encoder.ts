import "reflect-metadata";
import {
  FieldParam,
  Meta,
  FieldNumberParam,
  FieldListParam,
} from "../decorator";
import { SkyUserDataInput, SkyHeader, SkyInData } from "../vo";
import moment from "moment";
import { ClassConstructor } from "class-transformer";

export function makeSkyInData<I>(
  typeClass: ClassConstructor<I>,
  data: I
): SkyInData<I> | null {
  const skyInData: SkyInData<I> = new SkyInData<I>(typeClass);
  skyInData.data_type = "D";
  skyInData.data = data;
  const count = getPacketSize(skyInData);
  if (!count) return null;

  skyInData.length = count - 9; // TODO Buat apa ada angka 9 ?
  return skyInData;
}

export function getPacketSize(obj: Object): number | null {
  let count = 0;

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

        if (!fieldNumber) return null;

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
        const countList = getPacketSize(obj[propertyKey]);
        if (!countList) return null;
        count += countList;
        break;

      case "VO":
        const countVo = getPacketSize(obj[propertyKey]);
        if (!countVo) return null;
        count += countVo;
        break;
      default:
        break;
    }
  }

  return count;
}

export function makeSkyHeader(
  userDataInput: SkyUserDataInput
): SkyHeader | null {
  const header: SkyHeader = new SkyHeader();

  const fields: Array<FieldParam> | undefined = Reflect.getMetadata(
    Meta.FIELD,
    header
  );
  if (!fields) return null;

  header.gid_sysname = "BCAP"; // TODO InetAddress.getLocalHost().getHostName();
  header.gid_yyyyymmdd = moment().format("YYYYMMDD");
  header.gid_hhmmss = moment().format("HHmmss");
  header.gid_seq = globalSeq();
  header.gid_pid = "00000"; // TODO System.getProperty("wlinstance");
  header.gid_stat = "00";
  header.tx_code = userDataInput.tx_code;
  header.inst_no = "BCAP";
  header.send_rspn_type = "S";
  header.rspn_svc_code = userDataInput.rspn_svc_code;
  header.ori_global_id = getMakeOriginalGid(header, fields);
  header.ori_send_time = getMicroTime();
  header.chnl_id = "WEB"; // TODO System.getProperty("chnl_id");
  header.client_ip_no = userDataInput.client_ip_no;
  header.client_mac = userDataInput.client_mac;
  header.scrn_id = userDataInput.scrn_id;
  header.scrn_lock_yn = "N";
  header.op_id = userDataInput.op_id;
  header.xa_begin_flag = 0;
  header.send_time = getMicroTime();
  header.rspn_time = "";
  header.sync_type = userDataInput.sync_type;
  header.async_rspn_yn =
    userDataInput.sync_type === "A" ? userDataInput.async_rspn_yn : "";
  header.call_depth = 0;
  header.msg_count_no = 0;
  header.ttl_use_flag = userDataInput.ttl_use_flag;
  header.ttl_from_time =
    userDataInput.ttl != 0 ? moment().format("HHmmss") : "";
  header.ttl = userDataInput.ttl;
  header.long_msg_type = userDataInput.long_msg_type;
  header.err_flag = 0;
  header.err_src = "";
  header.err_type = "";
  header.err_code = "";
  header.dst_inst_code =
    userDataInput.dst_inst_code != null ? userDataInput.dst_inst_code : "";
  header.fail_knd = userDataInput.fail_knd;
  header.ap_host_name = userDataInput.ap_host_name;
  header.ap_caller_id = userDataInput.ap_caller_id;
  header.inf_id = "";
  header.lang_type = userDataInput.lang_type;
  header.reserved = "";

  return header;
}

function getMicroTime(): string {
  return moment().format("YYYYMMDDSSSSSS");
}

function getMakeOriginalGid(
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

function globalSeq(): string {
  return Math.floor(100 + Math.random() * 900).toString();
}

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
      return (value * Math.pow(10, decimal)).toString().padStart(length, "0");

    case "LONG":
    case "INT":
    case "SHORT":
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
