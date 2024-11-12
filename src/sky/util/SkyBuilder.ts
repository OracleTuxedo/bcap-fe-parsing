import { ClassConstructor } from "class-transformer";
import { SkyHeader, SkyIn, SkyInData, SkyUserDataInput } from "../vo";
import { FieldParam, Meta } from "../decorator";
import {
  globalSeq,
  getMicroTime,
  makeOriginalGid,
  getPacketSize,
} from "./SkyUtil";
import moment from "moment";

export function makeSkyIn<I>(
  typeClass: ClassConstructor<I>,
  inVo: I,
  userDataInput: SkyUserDataInput
): SkyIn<I> | null {
  const skyHeader: SkyHeader | null = makeSkyHeader(userDataInput);
  const skyInData: SkyInData<I> | null = makeSkyInData(typeClass, inVo);

  if (!skyHeader || !skyInData) return null;

  const skyIn: SkyIn<I> = new SkyIn(typeClass);
  skyIn.header = skyHeader;
  skyIn.data = skyInData;

  const countSkyIn = getPacketSize(skyIn);

  if (!countSkyIn) return null;

  skyIn.header.msg_len = countSkyIn - 8;

  return skyIn;
}

function makeSkyInData<I>(
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

function makeSkyHeader(userDataInput: SkyUserDataInput): SkyHeader | null {
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
  header.ori_global_id = makeOriginalGid(header, fields);
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
