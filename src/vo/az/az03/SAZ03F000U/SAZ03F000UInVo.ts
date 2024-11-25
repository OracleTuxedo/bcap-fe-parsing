import { Field } from '@/utils';

export class SAZ03F000UInVo {
  @Field({ type: 'STRING', length: 1, trim: 'RTRIM' })
  usr_conn_clcd: string;

  @Field({ type: 'STRING', length: 15, trim: 'RTRIM' })
  usr_id: string;

  @Field({ type: 'STRING', length: 64, trim: 'RTRIM' })
  usr_paswd: string;
}
