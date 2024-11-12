import { SAC02F452RInVo } from "./dto/SAC02F452R";
import { convertObjectToString } from "./sky/mapper/Encoder";
import { makeSkyIn } from "./sky/util";
import { SkyIn, SkyUserDataInput } from "./sky/vo";

export function encodePrototype() {
  const inVo: SAC02F452RInVo = new SAC02F452RInVo();
  inVo.page_no = 1;
  inVo.page_size = 10;
  inVo.mid = "71000204442";
  inVo.auth_strt_date = "20240101";
  inVo.auth_end_date = "20240919";

  const userDataInput: SkyUserDataInput = new SkyUserDataInput();
  userDataInput.tx_code = "SAC02F452R";
  userDataInput.scrn_id = "WED030120H";
  userDataInput.client_ip_no = "172.16.20.11";
  userDataInput.op_id = "1787130271";
  userDataInput.sync_type = "A";
  userDataInput.rspn_svc_code = "";
  userDataInput.async_rspn_yn = "0";
  userDataInput.ttl_use_flag = 0;
  userDataInput.lang_type = "EN";

  const skyIn: SkyIn<SAC02F452RInVo> | null = makeSkyIn<SAC02F452RInVo>(
    SAC02F452RInVo,
    inVo,
    userDataInput
  );

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  console.log(`[${resultString}]`);

  return "Success";
}

// 00000585BCAP    202411121416501680000000SAC02F452R              BCAPS                        BCAP    20241112141650168000000020241112720000      WEB       172.16.20.11                                WED030120H N1787130271     020241112720000                          A000000      00010                                                                        EN                                                                                                                                             D00000082                     00000100001071000204442      2024010120240919                @@
// 00000585MAAS    202411121402224390000000SAC02F452R              BCAPS                        MAAS    20241112140222439000000020241112346000      WEB       172.16.20.11                                WED030120H N1787130271     020241112346000                          A000000      00010                                                                        EN                                                                                                                                             D00000082                     00000100001071000204442      2024010120240919                @@
// 00000585LeRuccoL202411121226010020000000SAC02F452R              MTI S                        LeRuccoL20241112122601002000000020241112122601000138WEB       172.16.20.11                                WED030120H N1787130271     020241112122601000140                    A000000      00010                                                                        EN                                                                                                                                             D00000082                     00000100001071000204442      2024010120240919                @@
