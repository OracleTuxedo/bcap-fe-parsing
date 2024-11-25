import { Field, FieldNumber } from '@/utils/sky';

export class SAZ02F110RInVo {
  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_no: number;

  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_size: number;

  @Field({ type: 'STRING', length: 3, trim: 'RTRIM' })
  biz_ctgo_cd: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  grup_cd_id: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  msg_nm: string;

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  data_stat_cd: string;

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  lang_clcd: string;
}
