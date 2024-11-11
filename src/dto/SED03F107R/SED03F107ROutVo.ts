import { Field, FieldNumber } from "../../sky/decorator";

export class SED03F107ROutVo {
  @Field({ type: "NUMBER", length: 10, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  count: number;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  sno: string;

  @Field({ type: "STRING", length: 5, trim: "RTRIM" })
  whous_cd: string;

  @Field({ type: "STRING", length: 10, trim: "RTRIM" })
  rack_no: string;

  @Field({ type: "STRING", length: 22, trim: "RTRIM" })
  icc_id: string;

  @Field({ type: "STRING", length: 18, trim: "RTRIM" })
  sim_no: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  srl_stat_cd: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  srl_st_cd: string;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  srl_loca_cd: string;

  @Field({ type: "STRING", length: 10, trim: "RTRIM" })
  vend_no: string;

  @Field({ type: "STRING", length: 5, trim: "RTRIM" })
  prd_cd: string;

  @Field({ type: "STRING", length: 100, trim: "RTRIM" })
  prd_nm: string;
}
