import { Field } from '@/utils/sky';

export class SAZ02F113ROutSub1Vo {
  @Field({ type: 'STRING', length: 20, trim: 'RTRIM' })
  dtl_cd_id: string;

  @Field({ type: 'STRING', length: 256, trim: 'RTRIM' })
  dtl_cd_nm: string;
}
