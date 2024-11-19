import { Field, FieldNumber } from "../../sky/decorator";
import { SAZ02F111UOutSub1Vo } from "./SAZ02F111UOutSub1Vo";

export class SAZ02F111UOutVo {
  constructor() {
    this.sub1_vos = [new SAZ02F111UOutSub1Vo()];
  }
  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  next_page_exist_yn: string;

  @Field({ type: "NUMBER", length: 6, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  next_page_no: number;

  @Field({ type: "NUMBER", length: 10, trim: "LTRIM" })
  @FieldNumber({ type: "LONG", decimal: 0 })
  all_cnt: number;

  @Field({ type: "LIST", length: 0, trim: "NONE" })
  sub1_vos: Array<SAZ02F111UOutSub1Vo>;
}
