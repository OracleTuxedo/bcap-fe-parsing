import { Field, FieldNumber } from '@/utils/sky';

export class SAZ02F111UInSub3Vo {
  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  biz_clcd: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  cmmn_cd_id: string;

  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  dtl_cd_id: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  msg_nm: string;

  @Field({ type: 'NUMBER', length: 5, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  sort_req: number;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  data_stat_cd: string;

  @Field({ type: 'STRING', length: 128, trim: 'RTRIM' })
  clss_info_val1: string;

  @Field({ type: 'STRING', length: 128, trim: 'RTRIM' })
  clss_info_val2: string;

  @Field({ type: 'STRING', length: 128, trim: 'RTRIM' })
  clss_info_val3: string;

  @Field({ type: 'STRING', length: 1000, trim: 'RTRIM' })
  cd_expl: string;
}
