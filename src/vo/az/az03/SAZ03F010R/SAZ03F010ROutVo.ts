import { Field, FieldNumber } from '@/utils';
import { SAZ03F010ROutSub1Vo } from './SAZ03F010ROutSub1Vo';
import { SAZ03F010ROutSub2Vo } from './SAZ03F010ROutSub2Vo';
import { SAZ03F010ROutSub3Vo } from './SAZ03F010ROutSub3Vo';

export class SAZ03F010ROutVo {
  constructor() {
    this.sub1_vos = [new SAZ03F010ROutSub1Vo()];
    this.sub2_vos = [new SAZ03F010ROutSub2Vo()];
    this.sub3_vos = [new SAZ03F010ROutSub3Vo()];
  }
  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  next_page_exist_yn: string;

  @Field({ type: 'STRING', length: 6, trim: 'RTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  next_page_no: number;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub1_vos: Array<SAZ03F010ROutSub1Vo>;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub2_vos: Array<SAZ03F010ROutSub2Vo>;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub3_vos: Array<SAZ03F010ROutSub3Vo>;
}
