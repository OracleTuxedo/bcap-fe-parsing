import { Field, FieldNumber } from '@/utils/sky';

export class SAZ02F113RInVo {
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

  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  lang_clcd: string;
}
