import { SAZ02F116RInVo, SAZ02F116ROutVo } from "../vo/az/az02/SAZ02F116R";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

export function encodeSAZ02F116R(): string | null {
  const inVo: SAZ02F116RInVo = new SAZ02F116RInVo();
  inVo.page_no = 1;
  inVo.page_size = 20;
  inVo.msg_id = "ACA000631";

  const userDataInput: SkyUserDataInput = makeSkyUserDataInput({
    tuxedoCode: "SAZ02F116R",
    screenId: "WMC0302500",
  });

  const skyIn: SkyIn<SAZ02F116RInVo> | null = makeSkyIn<SAZ02F116RInVo>({
    typeClass: SAZ02F116RInVo,
    data: inVo,
    userDataInput: userDataInput,
  });

  if (!skyIn) return null;

  const resultString = convertObjectToString(skyIn);

  return resultString;
}

export function decodeSAZ02F116R(
  responseFromTuxedo: string
): SkyOut<SAZ02F116ROutVo> | null {
  const parsed: SkyOut<SAZ02F116ROutVo> | null = convertStringToObject<
    SkyOut<SAZ02F116ROutVo>
  >({
    index: 0,
    input: responseFromTuxedo,
    classInstance: new SkyOut(SAZ02F116ROutVo),
  });
  return parsed;
}

export async function callSAZ02F116R() {
  console.log("ENCODER START");

  const requestToTuxedo: string | null = encodeSAZ02F116R();

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

  const parsed = decodeSAZ02F116R(responseFromTuxedo);
  console.log(parsed);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data);
  console.log("-----------------------------------------------------------");
  console.log(parsed?.data.data.sub1_vos);
  console.log("DECODER END");
}
