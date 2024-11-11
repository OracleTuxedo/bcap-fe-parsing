import { Field, FieldList, FieldNumber } from "../decorator";
import { SkyMessageSub } from "./SkyMessageSub";

export class SkyMessage {
  constructor() {
    this.list = [new SkyMessageSub()];
  }

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  kind: string;

  @Field({ type: "NUMBER", length: 8, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  length: number;

  @Field({ type: "STRING", length: 21, trim: "RTRIM" })
  reserved: string;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  msg_attr: number;

  @Field({ type: "NUMBER", length: 1, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  msg_alm: number;

  @Field({ type: "STRING", length: 200, trim: "RTRIM" })
  message: string;

  @Field({ type: "STRING", length: 100, trim: "RTRIM" })
  error_field_name: string;

  @Field({ type: "STRING", length: 100, trim: "RTRIM" })
  error_info: string;

  @Field({ type: "LIST", length: 0, trim: "NONE" })
  @FieldList({ length: 2 })
  list: Array<SkyMessageSub>;
}
