import { Field } from '@/utils/sky';

export class SAZ02F116ROutSub1Vo {
  @Field({ type: 'STRING', length: 5, trim: 'RTRIM' })
  lang_clcd: string;

  @Field({ type: 'STRING', length: 100, trim: 'RTRIM' })
  msg_nm: string;
}
