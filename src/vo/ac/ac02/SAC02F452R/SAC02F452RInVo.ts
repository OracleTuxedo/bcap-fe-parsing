import { Field, FieldNumber } from '@/utils/sky';

export class SAC02F452RInVo {
  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_no: number;

  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_size: number;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  mid: string;

  @Field({ type: 'STRING', length: 6, trim: 'RTRIM' })
  auth_no: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  auth_strt_date: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  auth_end_date: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  pmt_strt_date: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  pmt_end_date: string;
}
