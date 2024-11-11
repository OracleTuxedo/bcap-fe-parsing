"use strict";

// import { prototype } from "./prototype";

// prototype();

// import { SkyIn } from "./sky/vo";
import { convertStringToObject } from "./sky/mapper/Decoder";
// import { SED03F107RInVo } from "./dto/SED03F107RInVo";
import { SkyOut } from "./sky/vo/SkyOut";

import { SAC02F452ROutVo } from "./dto/SAC02F452R/";
import { SED03F107ROutVo } from "./dto/SED03F107R";

// const input =
//   "00000580DEVWAS0120240918130914054mti2100SED03F107R              MTI S                        DEVWAS0120240918130914054mti210020240918130914000520WEB       172.16.20.11                                WED030120H N1787130271     020240918130914000520                    A000000      00010                                                                        ID                                                                                                                                             D00000077                     EDC  0013000011976476                                   @@";

// const parsed: SkyIn<SED03F107RInVo> | null = convertStringToObject<
//   SkyIn<SED03F107RInVo>
// >({
//   index: 0,
//   input: input,
//   classInstance: new SkyIn(SED03F107RInVo),
// });

// console.log(
//   "------------------------------------------------------------------------------------" +
//     "------------------------------------------------------------------------------------"
// );
// console.log("RESULT");
// console.log(parsed);

// 00001164DEVWAS0120240918130914054mti2100SED03F107R              MTI R                        DEVWAS0120240918130914054mti210020240918130914000520WEB       172.16.20.11                                WED030120H N1787130271     02024091813091400052020240918130915691411A00  00        010                                                                        ID                                                                                                                                             N00000425                     30                                                                                                                                                                                                                                                                                                                                                                                                                00D00000227                              10013000011976476    Z900                                                   040101E0016     33   EDC Android PAX A920                                                                                @@

const input1 =
  "00001164DEVWAS0120240918130914054mti2100SED03F107R              MTI R                        DEVWAS0120240918130914054mti210020240918130914000520WEB       172.16.20.11                                WED030120H N1787130271     02024091813091400052020240918130915691411A00  00        010                                                                        ID                                                                                                                                             N00000425                     30                                                                                                                                                                                                                                                                                                                                                                                                                00D00000227                              10013000011976476    Z900                                                   040101E0016     33   EDC Android PAX A920                                                                                @@";

const parsed1: SkyOut<SED03F107ROutVo> | null = convertStringToObject<
  SkyOut<SED03F107ROutVo>
>({
  index: 0,
  input: input1,
  classInstance: new SkyOut(SED03F107ROutVo),
});

console.log("RESULT");
console.log(parsed1);

const input2 =
  "00002606devaps01202410020933300017498100SAC02F452R              MTI R                        devaps0120241002093330001749810020241002093330751   UNIT      192.168.1.89                    0CDD2494CF5F                           020241002093330751   20241002093348307790  0  00        000       NAZAP0001                                                        EN                                                                                                                                             N00000425                     30inquiry process success.                                                                                                                                                                                                                                                                                                                                                                                        00D00001669                             96      1020240101202401054259450300373427   6451380000000000000006589000000000000000000005    00000000000000006589000000000000000000000000000000000000000000000000000000000N20240102202401035379408870000145   1113100000000000000006000000000000000000000015    00000000000000006000000000000000000000000000000000000000000000000000000000000N20240105202401094215708100006338   0000890000000000000115000000000000000000000005    00000000000000105000000000000000000000000000000000000000000000000000000000000 20240108202401094215708100041160   2693760000000000000020000000000000000000000005    00000000000000020000000000000000000000000000000000000000000000000000000000000N20240108202401094215708100041160   2536030000000000000025000000000000000000000005    00000000000000025000000000000000000000000000000000000000000000000000000000000N20240221202402224485580000080033   1129930000000000000006535000000000000000000005    00000000000000006535000000000000000000000000000000000000000000000000000000000N20240221202402224485580000080033   1129920000000000000002305000000000000000000005    00000000000000002305000000000000000000000000000000000000000000000000000000000N20240223202402254485580000080033   1111510000000000000006250000000000000000000005    00000000000000006250000000000000000000000000000000000000000000000000000000000N20240223202402254485580000080033   1111500000000000000003200000000000000000000005    00000000000000003200000000000000000000000000000000000000000000000000000000000N20240227202402294485580000080033   1112060000000000000006589000000000000000000005    00000000000000006589000000000000000000000000000000000000000000000000000000000N@@";

const parsed2: SkyOut<SAC02F452ROutVo> | null = convertStringToObject<
  SkyOut<SAC02F452ROutVo>
>({
  index: 0,
  input: input2,
  classInstance: new SkyOut(SAC02F452ROutVo),
});

console.log(
  "------------------------------------------------------------------------------------" +
    "RESULT" +
    "------------------------------------------------------------------------------------"
);
console.log(parsed2);
console.log(parsed2?.data.data);
console.log(parsed2?.data.data.sub1_vos.length);

// SkyOut {
//   tail: '@@',
//   header: SkyHeader {
//     msg_len: 1164,
//     gid_sysname: 'DEVWAS01',
//     gid_yyyyymmdd: '20240918',
//     gid_hhmmss: '130914',
//     gid_seq: '054',
//     gid_pid: 'mti21',
//     gid_stat: '00',
//     tx_code: 'SED03F107R',
//     inst_no: 'MTI',
//     send_rspn_type: 'R',
//     rspn_svc_code: '',
//     ori_global_id: 'DEVWAS0120240918130914054mti2100',
//     ori_send_time: '20240918130914000520',
//     chnl_id: 'WEB',
//     client_ip_no: '172.16.20.11',
//     client_mac: '',
//     scrn_id: 'WED030120H',
//     scrn_lock_yn: 'N',
//     op_id: '1787130271',
//     xa_begin_flag: 0,
//     send_time: '20240918130914000520',
//     rspn_time: '20240918130915691411',
//     sync_type: 'A',
//     async_rspn_yn: '0',
//     call_depth: 0,
//     msg_count_no: 0,
//     ttl_use_flag: 0,
//     ttl_from_time: '',
//     ttl: 0,
//     long_msg_type: 1,
//     err_flag: 0,
//     err_src: '',
//     err_type: '',
//     err_code: '',
//     dst_inst_code: '',
//     fail_knd: '',
//     ap_host_name: '',
//     ap_caller_id: '',
//     inf_id: '',
//     lang_type: 'ID',
//     reserved: ''
//   },
//   message: SkyMessage {
//     list: [],
//     kind: 'N',
//     length: 425,
//     reserved: '',
//     msg_attr: 3,
//     msg_alm: 0,
//     message: '',
//     error_field_name: '',
//     error_info: ''
//   },
//   data: SkyOutData {
//     data: SED03F107ROutVo {
//       count: 1,
//       sno: '0013000011976476',
//       whous_cd: 'Z900',
//       rack_no: '',
//       icc_id: '',
//       sim_no: '',
//       srl_stat_cd: '04',
//       srl_st_cd: '01',
//       srl_loca_cd: '01',
//       vend_no: 'E0016',
//       prd_cd: '33',
//       prd_nm: 'EDC Android PAX A920'
//     },
//     data_type: 'D',
//     length: 227,
//     reserved: ''
//   }
// }
