import { Field, FieldNumber } from '@/utils';

export class SAZ03F000UOutVo {
  @Field({ type: 'NUMBER', length: 10, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  trns_cnt: number;
}
