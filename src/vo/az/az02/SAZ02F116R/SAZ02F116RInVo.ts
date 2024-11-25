import { Field, FieldNumber } from '@/utils/sky';

export class SAZ02F116RInVo {
  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_no: number;

  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_size: number;

  @Field({ type: 'STRING', length: 100, trim: 'RTRIM' })
  msg_id: string;
}
