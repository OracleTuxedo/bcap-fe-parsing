import { Field, FieldNumber } from '@/utils/sky';
import { SAZ02F113ROutSub1Vo } from './SAZ02F113ROutSub1Vo';

export class SAZ02F113ROutVo {
  constructor() {
    this.sub1_vos = [new SAZ02F113ROutSub1Vo()];
  }

  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  next_page_exist_yn: string;

  @Field({ type: 'NUMBER', length: 6, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  next_page_no: number;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub1_vos: Array<SAZ02F113ROutSub1Vo>;
}
