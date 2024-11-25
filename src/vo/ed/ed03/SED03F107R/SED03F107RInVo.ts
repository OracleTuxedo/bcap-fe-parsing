import { Field } from '@/utils/sky';

export class SED03F107RInVo {
  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  prd_tp_cd: string;

  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  sno: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  srl_stat_cd: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  srl_st_cd: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  prd_cd: string;

  @Field({ type: 'STRING', length: 22, trim: 'RTRIM' })
  icc_id: string;
}
