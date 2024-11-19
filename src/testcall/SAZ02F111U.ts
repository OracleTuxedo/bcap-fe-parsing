import { SAZ02F111UInVo, SAZ02F111UOutVo } from "../dto/SAZ02F111U";
import { convertStringToObject } from "../sky/mapper/Decoder";
import { convertObjectToString } from "../sky/mapper/Encoder";
import { makeSkyIn, makeSkyUserDataInput } from "../sky/util";
import { SkyIn, SkyOut, SkyUserDataInput } from "../sky/vo";
import axios from "axios";

export function encodeSAZ02F111U(): string | null {
  const inVo: SAZ02F111UInVo = new SAZ02F111UInVo();
  /// Not Yet

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

  return resultString;
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
