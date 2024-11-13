import { SMC03F055RInVo, SMC03F055ROutVo } from "../dto/SMC03F055R";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

// Request Unit Test
// [00000795                                SMC03F055R              MTI S                                                                            UNIT      192.168.1.89                    0CDD2494CF5F                           020241113164043478                         00000      00000                                                                        EN                                                                                                                                              00000000                     2000005917620240717035444506768                                                                                                                                                                                                                                            000020]
// [00000797MTI     202411131648472320000000SMC03F055R              MTI S                        MTI     20241113164847232000000020241113150000      WEB       172.16.20.11                                WMC0302500 N1787130271     020241113150000                          A000000      00010                                                                        EN                                                                                                                                             D00000294                     2000005917620240717035444506768                                                                                                                                                                                                                                            000020@@]

// Response Unit Test
// [00003366devaps01202411131640490032008700SMC03F055R              MTI R                        devaps0120241113164049003200870020241113164043478   UNIT      192.168.1.89                    0CDD2494CF5F                           020241113164043478   20241113164049481780  0  00        000                                                                        EN                                                                                                                                             N00000425                     30                                                                                                                                                                                                                                                                                                                                                                                                                00D00002429                     20000059176                                                                                                                                                                                                                                                                    20       120000059176304                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Host-Trust                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              120231110371000626701               bmc03v102u 17-JUL-24 03                       bmc03v102u 17-JUL-24 0320240717@@]
// [00003366MTI     202411131648472320000000SMC03F055R              MTI R                        MTI     20241113164847232000000020241113150000      WEB       172.16.20.11                                WMC0302500 N1787130271     020241113150000      20241113164853014304A00  00        010                                                                        EN                                                                                                                                             N00000425                     30                                                                                                                                                                                                                                                                                                                                                                                                                00D00002429                     20000059176                                                                                                                                                                                                                                                                    20       120000059176304                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Host-Trust                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              120231110371000626701               bmc03v102u 17-JUL-24 03                       bmc03v102u 17-JUL-24 0320240717@@]

export function encodeSMC03F055R(): string | null {
  const inVo: SMC03F055RInVo = new SMC03F055RInVo();
  inVo.aplc_seq_no = "20000059176";
  inVo.next_key_val = "20240717035444506768";
  inVo.page_size = 20;

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SMC03F055R",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SMC03F055RInVo> | null = makeSkyIn<SMC03F055RInVo>({
    typeClass: SMC03F055RInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  return resultString;
}

export function decodeSMC03F055R(
  responseFromTuxedo: string
): SkyOut<SMC03F055ROutVo> | null {
  const parsed: SkyOut<SMC03F055ROutVo> | null = convertStringToObject<
    SkyOut<SMC03F055ROutVo>
  >({
    index: 0,
    input: responseFromTuxedo,
    classInstance: new SkyOut(SMC03F055ROutVo),
  });
  return parsed;
}

export async function callSMC03F055R() {
  console.log("ENCODER START");
  const requestToTuxedo: string | null = encodeSMC03F055R();
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

  const parsed = decodeSMC03F055R(responseFromTuxedo);
  console.log(parsed);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data.sub1_vos);
  console.log("DECODER END");
}
