import { Field } from '@/utils/sky';

export class SAZ02F111UInSub4Vo {
  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  biz_clcd: string;

  @Field({ type: 'STRING', length: 100, trim: 'RTRIM' })
  msg_id: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  lang_clcd: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  msg_nm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  data_stat_cd: string;
}
