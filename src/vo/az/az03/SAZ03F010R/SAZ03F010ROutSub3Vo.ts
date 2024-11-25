import { Field } from '@/utils';

export class SAZ03F010ROutSub3Vo {
  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  usr_id: string;

  @Field({ type: 'STRING', length: 3, trim: 'RTRIM' })
  biz_ctgo_cd: string;

  @Field({ type: 'STRING', length: 9, trim: 'RTRIM' })
  menu_id: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  scrn_id: string;

  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  priv_val_flag: string;
}
