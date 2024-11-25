import { Field } from '@/utils';

export class SAZ03F010ROutSub2Vo {
  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  usr_id: string;

  @Field({ type: 'STRING', length: 2, trim: 'RTRIM' })
  mai_itm_cd: string;

  @Field({ type: 'STRING', length: 64, trim: 'RTRIM' })
  mai_itm_mskg_val: string;
}
