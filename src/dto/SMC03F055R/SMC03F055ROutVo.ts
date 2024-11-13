import { Field, FieldNumber } from "../../sky/decorator";
import { SMC03F055ROutSub1Vo } from "./SMC03F055ROutSub1Vo";

export class SMC03F055ROutVo {
  constructor() {
    this.sub1_vos = [new SMC03F055ROutSub1Vo()];
  }
  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  aplc_seq_no: string;

  @Field({ type: "STRING", length: 256, trim: "RTRIM" })
  next_key_val: string;

  @Field({ type: "NUMBER", length: 6, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  page_size: number;

  @Field({ type: "LIST", length: 0, trim: "NONE" })
  sub1_vos: Array<SMC03F055ROutSub1Vo>;
}
