import { Field } from '@/utils';

export class SAZ03F010ROutSub1Vo {
  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  usr_id: string;

  @Field({ type: 'STRING', length: 13, trim: 'RTRIM' })
  emp_no: string;

  @Field({ type: 'STRING', length: 60, trim: 'RTRIM' })
  emp_nm: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  lang_clcd: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  emp_tp_cd: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  usr_ctgo_cd: string;

  @Field({ type: 'STRING', length: 10, trim: 'RTRIM' })
  dept_cd: string;

  @Field({ type: 'STRING', length: 60, trim: 'RTRIM' })
  orz_nm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  cont_stat_cd: string;

  @Field({ type: 'STRING', length: 30, trim: 'RTRIM' })
  usr_ino: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  duty_cd: string;

  @Field({ type: 'STRING', length: 64, trim: 'RTRIM' })
  usr_svc_auth_id: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  apvl_req_usr_yn: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  apvl_mgr_usr_yn: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  adm_usr_yn: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  bbrd_adm_usr_yn: string;
}
