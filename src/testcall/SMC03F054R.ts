import { SMC03F054ROutVo } from "../dto/SMC03F054R";
import { SMC03F054RInVo } from "../dto/SMC03F054R/SMC03F054RInVo";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

/// Request Unit Test
// 00000813                                SMC03F054R              MTI S                                                                            UNIT      192.168.1.89                    0CDD2494CF5F                           020241112162112550                         00000      00000                                                                        EN                                                                                                                                              00000000                     20220101202412117071000638409                                                                                                                                                                                                                                                                000020

/// Response
// 00002970devaps01202411121621160014254000SMC03F054R              MTI R                        devaps0120241112162116001425400020241112162112550   UNIT      192.168.1.89                    0CDD2494CF5F                           020241112162112550   20241112162117445951  0  00        000       NAZAP0005                                                        EN                                                                                                                                             N00000525                     30The Transaction Successfully Ended.                                                                                                                                                                                                                                                                                                                                                                             01The Transaction Successfully Ended.                                                                 D00001933                     20220101202412117071000638409                                                                                                                                                                                                                                                                    20       120000057850           12023112020231120707100063840920231120BMC02V080U                                                                  20240901                                                                                                                                                                              1Online Onboarding - MY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  1batch          bmc02v080u 20231120093941253848batch          bmc02v080u 20231120093941257864 Online Onboarding - MY                                                                                                                                                                                  @@
/**
 * std_date [20220101]
 * end_date [20241211]
 * apfm_pgrs_stat_cd [70]
 * mid [71000638409]
 * next_key_val
 * page_size [000020]
 */

export function SMC03F054R() {
  const input =
    "00002970devaps01202411121621160014254000SMC03F054R              MTI R                        devaps0120241112162116001425400020241112162112550   UNIT      192.168.1.89                    0CDD2494CF5F                           020241112162112550   20241112162117445951  0  00        000       NAZAP0005                                                        EN                                                                                                                                             N00000525                     30The Transaction Successfully Ended.                                                                                                                                                                                                                                                                                                                                                                             01The Transaction Successfully Ended.                                                                 D00001933                     20220101202412117071000638409                                                                                                                                                                                                                                                                    20       120000057850           12023112020231120707100063840920231120BMC02V080U                                                                  20240901                                                                                                                                                                              1Online Onboarding - MY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  1batch          bmc02v080u 20231120093941253848batch          bmc02v080u 20231120093941257864 Online Onboarding - MY                                                                                                                                                                                  @@";

  const parsed: SkyOut<SMC03F054ROutVo> | null = convertStringToObject<
    SkyOut<SMC03F054ROutVo>
  >({
    index: 0,
    input: input,
    classInstance: new SkyOut(SMC03F054ROutVo),
  });

  console.log("Response");
  console.log(parsed);
  console.log(parsed?.message.list);
  console.log(parsed?.data.data.sub1_vo);

  console.log("--------------------------------------------------------------");

  const inVo: SMC03F054RInVo = new SMC03F054RInVo();
  inVo.std_date = "20220101";
  inVo.end_date = "20241211";
  inVo.apfm_pgrs_stat_cd = "70";
  inVo.mid = "71000638409";
  inVo.page_size = 20;

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SMC03F054R",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SMC03F054RInVo> | null = makeSkyIn<SMC03F054RInVo>({
    typeClass: SMC03F054RInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  if (!resultString) return "GAGAL";

  console.log(`[${resultString}]`);

  return "Success";
}

export function encodeSMC03F054R(): string | null {
  const inVo: SMC03F054RInVo = new SMC03F054RInVo();
  inVo.std_date = "20220101";
  inVo.end_date = "20241211";
  inVo.apfm_pgrs_stat_cd = "70";
  inVo.mid = "71000638409";
  inVo.page_size = 20;

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SMC03F054R",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SMC03F054RInVo> | null = makeSkyIn<SMC03F054RInVo>({
    typeClass: SMC03F054RInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  if (!resultString) return "GAGAL";

  // console.log(`[${resultString}]`);

  return resultString;
}

export async function callSMC03F054R() {
  console.log("ENCODER START");
  // const requestToTuxedo: string | null =
  //   "00000813                                SMC03F054R              MTI S                                                                            UNIT      192.168.1.89                    0CDD2494CF5F                           020241112162112550                         00000      00000                                                                        EN                                                                                                                                              00000000                     20220101202412117071000638409                                                                                                                                                                                                                                                                000020";
  const requestToTuxedo: string | null = encodeSMC03F054R();
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
}
