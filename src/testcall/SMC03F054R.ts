import { SMC03F054ROutVo, SMC03F054RInVo } from "../dto/SMC03F054R";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

/// Request Unit Test
// [00000813                                SMC03F054R              MTI S                                                                            UNIT      192.168.1.89                    0CDD2494CF5F                           020241113155906176                         00000      00000                                                                        EN                                                                                                                                              00000000                     20220101202412117071000638409                                                                                                                                                                                                                                                                000020]
// [00000817MTI     202411131608571320000000SMC03F054R              MTI S                        MTI     20241113160857132000000020241113322000      WEB       172.16.20.11                                WMC0302500 N1787130271     020241113322000                          A000000      00010                                                                        EN                                                                                                                                             D00000314                     20220101202412117071000638409                                                                                                                                                                                                                                                                00000020@@]

/// Response Unit Test
// [00002970devaps01202411131559120022008700SMC03F054R              MTI R                        devaps0120241113155912002200870020241113155906176   UNIT      192.168.1.89                    0CDD2494CF5F                           020241113155906176   20241113155912231479  0  00        000       NAZAP0005                                                        EN                                                                                                                                             N00000525                     30The Transaction Successfully Ended.                                                                                                                                                                                                                                                                                                                                                                             01The Transaction Successfully Ended.                                                                 D00001933                     20220101202412117071000638409                                                                                                                                                                                                                                                                    20       120000057850           12023112020231120707100063840920231120BMC02V080U                                                                  20240901                                                                                                                                                                              1Online Onboarding - MY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  1batch          bmc02v080u 20231120093941253848batch          bmc02v080u 20231120093941257864 Online Onboarding - MY                                                                                                                                                                                  @@]
// [00001357MTI     202411131608571320000000SMC03F054R              MTI R                        MTI     20241113160857132000000020241113322000      WEB       172.16.20.11                                WMC0302500 N1787130271     020241113322000      20241113160904376927A00  00        010       NAZAP0006                                                        EN                                                                                                                                             N00000525                     30The Next Data Exists.                                                                                                                                                                                                                                                                                                                                                                                           01The Next Data Exists.                                                                               D00000320                     2022010120241211707100063840920231120093941253848                                                                                                                                                                                                                                                 0       0@@]

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

  return resultString;
}

export function decodeSMC03F054R(
  responseFromTuxedo: string
): SkyOut<SMC03F054ROutVo> | null {
  const parsed: SkyOut<SMC03F054ROutVo> | null = convertStringToObject<
    SkyOut<SMC03F054ROutVo>
  >({
    index: 0,
    input: responseFromTuxedo,
    classInstance: new SkyOut(SMC03F054ROutVo),
  });
  return parsed;
}

export async function callSMC03F054R() {
  console.log("ENCODER START");
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
  console.log("-----------------------------------------------------------");
  console.log("-----------------------------------------------------------");
  console.log("DECODER START");

  const parsed = decodeSMC03F054R(responseFromTuxedo);
  console.log(parsed);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data.sub1_vos);
  console.log("DECODER END");
}
