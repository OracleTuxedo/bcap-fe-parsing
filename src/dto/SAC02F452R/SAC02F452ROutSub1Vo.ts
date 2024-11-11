import { Field, FieldNumber } from "../../sky/decorator";

export class SAC02F452ROutSub1Vo {
  @Field({ type: "STRING", length: 8, trim: "RTRIM" })
  auth_date: string;

  @Field({ type: "STRING", length: 8, trim: "RTRIM" })
  pmt_date: string;

  @Field({ type: "STRING", length: 19, trim: "RTRIM" })
  card_no: string;

  @Field({ type: "STRING", length: 6, trim: "RTRIM" })
  auth_no: string;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  sale_amt: number;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  nonfareamt: number;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  sale_knd_clcd: string;

  @Field({ type: "NUMBER", length: 5, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  ins_mcnt: number;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  sale_pamt: number;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  sale_svc_fee: number;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  sale_tax: number;

  @Field({ type: "NUMBER", length: 18, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  pwcw_csh_amt: number;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  dcctrans_yn: string;
}
