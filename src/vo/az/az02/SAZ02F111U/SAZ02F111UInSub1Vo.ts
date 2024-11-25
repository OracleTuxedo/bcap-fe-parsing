import { Field } from '@/utils/sky';

export class SAZ02F111UInSub1Vo {
  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  biz_clcd: string;

  @Field({ type: 'STRING', length: 3, trim: 'RTRIM' })
  biz_ctgo_cd: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  grup_cd_id: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  data_stat_cd: string;

  @Field({ type: 'STRING', length: 1000, trim: 'RTRIM' })
  cd_expl: string;
}
