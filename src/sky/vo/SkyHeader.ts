import { Field, FieldNumber } from "../decorator";

export class SkyHeader {
  @Field({ type: "NUMBER", length: 8, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  msg_len: number;

  @Field({ type: "STRING", length: 8, trim: "RTRIM" })
  gid_sysname: string;

  @Field({ type: "STRING", length: 8, trim: "RTRIM" })
  gid_yyyyymmdd: string;

  @Field({ type: "STRING", length: 6, trim: "RTRIM" })
  gid_hhmmss: string;

  @Field({ type: "STRING", length: 3, trim: "RTRIM" })
  gid_seq: string;

  @Field({ type: "STRING", length: 5, trim: "RTRIM" })
  gid_pid: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  gid_stat: string;

  @Field({ type: "STRING", length: 24, trim: "RTRIM" })
  tx_code: string;

  @Field({ type: "STRING", length: 4, trim: "RTRIM" })
  inst_no: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  send_rspn_type: string;

  @Field({ type: "STRING", length: 24, trim: "RTRIM" })
  rspn_svc_code: string;

  @Field({ type: "STRING", length: 32, trim: "RTRIM" })
  ori_global_id: string;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  ori_send_time: string;

  @Field({ type: "STRING", length: 10, trim: "RTRIM" })
  chnl_id: string;

  @Field({ type: "STRING", length: 32, trim: "RTRIM" })
  client_ip_no: string;

  @Field({ type: "STRING", length: 12, trim: "RTRIM" })
  client_mac: string;

  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  scrn_id: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  scrn_lock_yn: string;

  @Field({ type: "STRING", length: 15, trim: "RTRIM" })
  op_id: string;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  xa_begin_flag: number;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  send_time: string;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  rspn_time: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  sync_type: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  async_rspn_yn: string;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  call_depth: number;

  @Field({ type: "NUMBER", length: 3, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  msg_count_no: number;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  ttl_use_flag: number;

  @Field({ type: "STRING", length: 6, trim: "RTRIM" })
  ttl_from_time: string;

  @Field({ type: "NUMBER", length: 3, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  ttl: number;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  long_msg_type: number;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  err_flag: number;

  @Field({ type: "STRING", length: 4, trim: "RTRIM" })
  err_src: string;

  @Field({ type: "STRING", length: 3, trim: "RTRIM" })
  err_type: string;

  @Field({ type: "STRING", length: 9, trim: "RTRIM" })
  err_code: string;

  @Field({ type: "STRING", length: 4, trim: "RTRIM" })
  dst_inst_code: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  fail_knd: string;

  @Field({ type: "STRING", length: 16, trim: "RTRIM" })
  ap_host_name: string;

  @Field({ type: "STRING", length: 10, trim: "RTRIM" })
  ap_caller_id: string;

  @Field({ type: "STRING", length: 24, trim: "RTRIM" })
  inf_id: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  lang_type: string;

  @Field({ type: "STRING", length: 141, trim: "RTRIM" })
  reserved: string;
}
