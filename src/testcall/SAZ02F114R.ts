import { SAZ02F114RInVo, SAZ02F114ROutVo } from "../dto/SAZ02F114R";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

export function encodeSAZ02F114R(): string | null {
  const inVo: SAZ02F114RInVo = new SAZ02F114RInVo();
  inVo.page_no = 1;
  inVo.page_size = 20;
  inVo.biz_ctgo_cd = "AZA";
  inVo.grup_cd_id = "3006";
  inVo.lang_clcd = "EN";

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SAZ02F114R",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SAZ02F114RInVo> | null = makeSkyIn<SAZ02F114RInVo>({
    typeClass: SAZ02F114RInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  return resultString;
}

export function decodeSAZ02F114R(
  responseFromTuxedo: string
): SkyOut<SAZ02F114ROutVo> | null {
  const parsed: SkyOut<SAZ02F114ROutVo> | null = convertStringToObject<
    SkyOut<SAZ02F114ROutVo>
  >({
    index: 0,
    input: responseFromTuxedo,
    classInstance: new SkyOut(SAZ02F114ROutVo),
  });
  return parsed;
}

export async function callSAZ02F114R() {
  console.log("ENCODER START");

  const requestToTuxedo: string | null = encodeSAZ02F114R();

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

  const parsed = decodeSAZ02F114R(responseFromTuxedo);
  console.log(parsed);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data.sub1_vos);
  console.log("DECODER END");
}
