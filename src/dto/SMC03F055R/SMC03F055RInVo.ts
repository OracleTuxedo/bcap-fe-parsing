import { Field, FieldNumber } from "../../sky/decorator";

export class SMC03F055RInVo {
  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  aplc_seq_no: string;

  @Field({ type: "STRING", length: 256, trim: "RTRIM" })
  next_key_val: string;

  @Field({ type: "NUMBER", length: 6, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  page_size: number;
}
