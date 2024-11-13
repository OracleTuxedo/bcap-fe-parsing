import { Field } from "../../sky/decorator";

export class SMC03F055ROutSub1Vo {
  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  aplc_seq_no: string;

  @Field({ type: "STRING", length: 3, trim: "RTRIM" })
  info_chng_tp_cd: string;

  @Field({ type: "STRING", length: 1000, trim: "RTRIM" })
  chng_bef_ctnts: string;

  @Field({ type: "STRING", length: 1000, trim: "RTRIM" })
  chng_aftr_ctnts: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  apfm_auth_stat_cd: string;

  @Field({ type: "STRING", length: 8, trim: "RTRIM" })
  auth_date: string;

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  auth_lev_clcd: string;

  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  mid: string;

  @Field({ type: "STRING", length: 15, trim: "RTRIM" })
  inp_usr_id: string;

  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  inp_pgm_id: string;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  data_inp_dttm: string;

  @Field({ type: "STRING", length: 15, trim: "RTRIM" })
  chng_usr_id: string;

  @Field({ type: "STRING", length: 11, trim: "RTRIM" })
  chng_pgm_id: string;

  @Field({ type: "STRING", length: 20, trim: "RTRIM" })
  data_chng_dttm: string;
}
