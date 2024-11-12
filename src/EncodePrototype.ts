import { SAC02F452RInVo } from "./dto/SAC02F452R";
import {
  getPacketSize,
  makeSkyHeader,
  makeSkyInData,
} from "./sky/mapper/Encoder";
import { SkyHeader, SkyIn, SkyInData, SkyUserDataInput } from "./sky/vo";

export function encodePrototype() {
  const inVo: SAC02F452RInVo = new SAC02F452RInVo();
  inVo.page_no = 1;
  inVo.page_size = 10;
  inVo.mid = "71000204442";
  inVo.auth_strt_date = "20240101";
  inVo.auth_end_date = "20240919";

  // console.log(inVo);

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

  const skyHeader: SkyHeader | null = makeSkyHeader(userDataInput);
  // console.log(skyHeader);
  // console.log(skyHeader?.msg_len);

  const skyInData: SkyInData<SAC02F452RInVo> | null = makeSkyInData(
    SAC02F452RInVo,
    inVo
  );

  if (!skyHeader || !skyInData) return null;

  const skyIn: SkyIn<SAC02F452RInVo> = new SkyIn(SAC02F452RInVo);
  skyIn.header = skyHeader;
  skyIn.data = skyInData;

  const countSkyIn = getPacketSize(skyIn);

  if (!countSkyIn) return null;

  skyIn.header.msg_len = countSkyIn - 8;
  console.log(skyIn);
  console.log("TIDAK NULL");

  return "Success";
}
