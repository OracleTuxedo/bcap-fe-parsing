import { Field } from '@/utils/sky';

export class SMC03F054ROutSub1Vo {
  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  aplc_seq_no: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  sls_obj_seq_no: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  aplc_clcd: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  aplc_date: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  end_date: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  apfm_pgrs_stat_cd: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  mid: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  apfm_reg_date: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  apfm_reg_chg_emp_no: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  aplc_inp_date: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  aplc_inp_chg_emp_no: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  apfm_conf_date: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  apfm_conf_chg_emp_no: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  apfm_riskcofm_date: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  apfm_riskcofm_chg_emp_no: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  apfm_fnl_conf_date1: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  apfm_fnl_conf_chg_emp_no1: string;

  @Field({ type: 'STRING', length: 10, trim: 'RTRIM' })
  apfm_fnl_conf_chg_dept_cd1: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  apfm_fnl_conf_date2: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  apfm_fnl_conf_chg_emp_no2: string;

  @Field({ type: 'STRING', length: 10, trim: 'RTRIM' })
  apfm_fnl_conf_chg_dept_cd2: string;

  @Field({ type: 'STRING', length: 60, trim: 'RTRIM' })
  chng_emp_nm: string;

  @Field({ type: 'STRING', length: 60, trim: 'RTRIM' })
  orz_nm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  apfm_auth_stat_cd: string;

  @Field({ type: 'STRING', length: 1000, trim: 'RTRIM' })
  apfm_memo_ctnts: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  rslt_notic_stat_cd: string;

  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  inp_usr_id: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  inp_pgm_id: string;

  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  data_inp_dttm: string;

  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  chng_usr_id: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  chng_pgm_id: string;

  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  data_chng_dttm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  apfm_dcln_rson_cd: string;

  @Field({ type: 'STRING', length: 200, trim: 'RTRIM' })
  chg_cmnt: string;
}
