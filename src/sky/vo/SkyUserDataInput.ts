export class SkyUserDataInput {
  tx_code: string;

  client_ip_no: string;

  client_mac: string;

  scrn_id: string;

  op_id: string;

  sync_type: string;

  async_rspn_yn: string;

  rspn_svc_code: string;

  ttl_use_flag: number = 0;

  ttl: number = 0;

  long_msg_type: number = 1;

  dst_inst_code: string;

  fail_knd: string;

  ap_host_name: string;

  ap_caller_id: string;

  lang_type: string = "EN";
}
