import { Field, FieldNumber } from '@/utils/sky';
import { SMC03F054ROutSub1Vo } from './SMC03F054ROutSub1Vo';

export class SMC03F054ROutVo {
  constructor() {
    this.sub1_vos = [new SMC03F054ROutSub1Vo()];
  }
  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  std_date: string;

  @Field({ type: 'STRING', length: 8, trim: 'RTRIM' })
  end_date: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  apfm_pgrs_stat_cd: string;

  @Field({ type: 'STRING', length: 11, trim: 'RTRIM' })
  mid: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  next_key_val: string;

  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  page_size: number;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub1_vos: Array<SMC03F054ROutSub1Vo>;
}
