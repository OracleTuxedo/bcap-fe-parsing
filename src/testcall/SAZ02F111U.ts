import {
  SAZ02F111UInSub1Vo,
  SAZ02F111UInSub2Vo,
  SAZ02F111UInSub3Vo,
  SAZ02F111UInSub4Vo,
  SAZ02F111UInVo,
  SAZ02F111UOutVo,
} from "../dto/SAZ02F111U";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

export function createSAZ02F111U(): SAZ02F111UInVo {
  const inVo1 = new SAZ02F111UInSub1Vo();
  inVo1.biz_clcd = "I"; // I = Create / Insert
  inVo1.biz_ctgo_cd = "EXT"; // System Division
  inVo1.grup_cd_id = "0018"; // Group Code
  inVo1.data_stat_cd = "U"; // U = Active
  inVo1.cd_expl = "Group Code EXT 0018"; // Description

  /**
   * [CMMN_CD_ID] = [CMMN_CD_NM]
   * [CMMN_CD_ID] Group Code Name itu gabungan dari:
   * - biz_ctgo_cd
   * - grup_cd_id
   *
   */

  /// Penamaan untuk Group Code Name / Messagenya lah
  const inVo2En = new SAZ02F111UInSub2Vo();
  inVo2En.biz_clcd = "I";
  inVo2En.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id;
  inVo2En.lang_clcd = "EN";
  inVo2En.msg_nm = "EN Group Code EXT 0018";
  inVo2En.data_stat_cd = "U";

  const inVo2Id = new SAZ02F111UInSub2Vo();
  inVo2Id.biz_clcd = "I";
  inVo2Id.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id;
  inVo2Id.lang_clcd = "ID";
  inVo2Id.msg_nm = "ID Group Code EXT 0018";
  inVo2Id.data_stat_cd = "U";

  const inVo3 = new SAZ02F111UInSub3Vo();
  inVo3.biz_clcd = "I"; // I = Create
  inVo3.cmmn_cd_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id;
  inVo3.dtl_cd_id = "001"; // Detail Code Id / Increment dg string length 3 padding 0
  inVo3.msg_nm = ""; // Gak butuh di Create hanya di Update
  inVo3.sort_req = 1; // Increment
  inVo3.data_stat_cd = "U";
  inVo3.clss_info_val1 = "";
  inVo3.clss_info_val2 = "";
  inVo3.clss_info_val3 = "";
  inVo3.cd_expl = "Detail Code EXT 0018"; // Description

  /**
   * [CMMN_CD_ID] Group Code = [CMMN_CD_ID] Detail Code
   * [DTL_CD_NM] Detail Code Name itu gabungan dari
   * - CMMN_CD_ID = biz_ctgo_cd + grup_cd_id
   * - DTL_CD_ID
   */

  const inVo4En = new SAZ02F111UInSub4Vo();
  inVo4En.biz_clcd = "I";
  inVo4En.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id + inVo3.dtl_cd_id;
  // inVo4En.msg_id = "";
  inVo4En.lang_clcd = "EN";
  inVo4En.msg_nm = "EN Detail Code EXT 0018 001";
  inVo4En.data_stat_cd = "U";

  const inVo4Id = new SAZ02F111UInSub4Vo();
  inVo4Id.biz_clcd = "I";
  inVo4Id.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id + inVo3.dtl_cd_id;
  // inVo4Id.msg_id = "";
  inVo4Id.lang_clcd = "ID";
  inVo4Id.msg_nm = "ID Detail Code EXT 0018 001";
  inVo4Id.data_stat_cd = "U";

  const inVo = new SAZ02F111UInVo();
  inVo.sub1_vos = [inVo1];
  inVo.sub2_vos = [inVo2En, inVo2Id];
  // inVo.sub3_vos = [];
  // inVo.sub4_vos = [];
  inVo.sub3_vos = [inVo3];
  inVo.sub4_vos = [inVo4En, inVo4Id];

  return inVo;
}

export function updateSAZ02F111U(): SAZ02F111UInVo {
  const inVo1 = new SAZ02F111UInSub1Vo();
  inVo1.biz_clcd = "U"; // U = Update
  inVo1.biz_ctgo_cd = "ZZA"; // System Division
  inVo1.grup_cd_id = "6969"; // Group Code
  inVo1.data_stat_cd = "U"; // U = Active
  inVo1.cd_expl = "Group Code 6969 Update"; // Description

  /**
   * [CMMN_CD_ID] = [CMMN_CD_NM]
   * [CMMN_CD_ID] Group Code Name itu gabungan dari:
   * - biz_ctgo_cd
   * - grup_cd_id
   *
   */

  /// Penamaan untuk Group Code Name / Messagenya lah
  const inVo2En = new SAZ02F111UInSub2Vo();
  inVo2En.biz_clcd = "U"; // U = Update
  inVo2En.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id; // ZZA6969
  inVo2En.lang_clcd = "EN";
  inVo2En.msg_nm = "EN Group Code 6969 Update";
  inVo2En.data_stat_cd = "U";

  const inVo2Id = new SAZ02F111UInSub2Vo();
  inVo2Id.biz_clcd = "U"; // U = Update
  inVo2Id.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id; // ZZA6969
  inVo2Id.lang_clcd = "ID";
  inVo2Id.msg_nm = "ID Group Code 6969 Update";
  inVo2Id.data_stat_cd = "U";

  const inVo3 = new SAZ02F111UInSub3Vo();
  inVo3.biz_clcd = "U"; // U = Update
  inVo3.cmmn_cd_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id; // ZZA6969
  inVo3.dtl_cd_id = "001"; // Detail Code Id / Increment dg string length 3
  inVo3.msg_nm = ""; // Gak butuh di Create hanya di Update (data_stat_cd != data existing)
  inVo3.sort_req = 1; // Increment
  inVo3.data_stat_cd = "U"; // U -> D ?
  inVo3.clss_info_val1 = "";
  inVo3.clss_info_val2 = "";
  inVo3.clss_info_val3 = "";
  inVo3.cd_expl = "Detail Code 6969 Update"; // Description

  /**
   * [CMMN_CD_ID] Group Code = [CMMN_CD_ID] Detail Code
   * [DTL_CD_NM] Detail Code Name itu gabungan dari
   * - CMMN_CD_ID = biz_ctgo_cd + grup_cd_id
   * - DTL_CD_ID
   */

  const inVo4En = new SAZ02F111UInSub4Vo();
  inVo4En.biz_clcd = "U"; // U = Update
  inVo4En.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id + inVo3.dtl_cd_id;
  inVo4En.lang_clcd = "EN";
  inVo4En.msg_nm = "EN Detail Code 6969 Update";
  inVo4En.data_stat_cd = "U";

  const inVo4Id = new SAZ02F111UInSub4Vo();
  inVo4Id.biz_clcd = "U"; // U = Update
  inVo4Id.msg_id = inVo1.biz_ctgo_cd + inVo1.grup_cd_id + inVo3.dtl_cd_id;
  inVo4Id.lang_clcd = "ID";
  inVo4Id.msg_nm = "ID Detail Code 6969 Update";
  inVo4Id.data_stat_cd = "U";

  const inVo = new SAZ02F111UInVo();
  inVo.sub1_vos = [inVo1];
  inVo.sub2_vos = [inVo2En, inVo2Id];
  inVo.sub3_vos = [inVo3];
  inVo.sub4_vos = [inVo4En, inVo4Id];

  return inVo;
}

export function encodeSAZ02F111U(): string | null {
  /////////////////////////////////////////////////////
  const inVo = createSAZ02F111U();

  // const inVo = updateSAZ02F111U();

  console.log(
    "###########################################################################"
  );
  console.log(inVo);

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SAZ02F111U",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SAZ02F111UInVo> | null = makeSkyIn<SAZ02F111UInVo>({
    typeClass: SAZ02F111UInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  console.log(resultString);

  return resultString;
  // return null;
}

export function decodeSAZ02F111U(
  responseFromTuxedo: string
): SkyOut<SAZ02F111UOutVo> | null {
  const parsed: SkyOut<SAZ02F111UOutVo> | null = convertStringToObject<
    SkyOut<SAZ02F111UOutVo>
  >({
    index: 0,
    input: responseFromTuxedo,
    classInstance: new SkyOut(SAZ02F111UOutVo),
  });
  return parsed;
}

export async function callSAZ02F111U() {
  console.log("ENCODER START");

  const requestToTuxedo: string | null = encodeSAZ02F111U();

  if (!requestToTuxedo) return;

  let responseFromTuxedo = "";

  try {
    const response = await axios.post<string>(
      "http://localhost:8080/example/message",
      requestToTuxedo,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    // console.log(response);
    responseFromTuxedo = response.data;
  } catch (error) {
    console.log("error");
    console.log(error);
    return;
  }
  console.log(`[${requestToTuxedo}]`);
  console.log("-----------------------------------------------------------");
  console.log(`[${responseFromTuxedo}]`);

  console.log("ENCODER END");
  console.log("-----------------------------------------------------------");
  console.log("-----------------------------------------------------------");
  console.log("-----------------------------------------------------------");
  console.log("DECODER START");

  const parsed = decodeSAZ02F111U(responseFromTuxedo);
  console.log(parsed);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data.sub1_vos);
  console.log("DECODER END");
}
