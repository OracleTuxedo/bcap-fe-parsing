import { Field, FieldNumber } from '@/utils/sky';
import { SAC02F452ROutSub1Vo } from './SAC02F452ROutSub1Vo';

export class SAC02F452ROutVo {
  constructor() {
    this.sub1_vos = [new SAC02F452ROutSub1Vo()];
  }
  @Field({ type: 'NUMBER', length: 10, trim: 'LTRIM' })
  @FieldNumber({ type: 'LONG', decimal: 0 })
  tot_cnt: number;

  @Field({ type: 'LIST', length: 0, trim: 'NONE' })
  sub1_vos: Array<SAC02F452ROutSub1Vo>;
}
