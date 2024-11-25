import { Field } from '@/utils/sky';

export class SAZ02F110ROutSub1Vo {
  @Field({ type: 'STRING', length: 3, trim: 'RTRIM' })
  biz_ctgo_cd: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  grup_cd_id: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  msg_nm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  data_stat_cd: string;

  @Field({ type: 'STRING', length: 1000, trim: 'RTRIM' })
  cd_expl: string;
}
