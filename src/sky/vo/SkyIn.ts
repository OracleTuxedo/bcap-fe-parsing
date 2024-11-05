import { Field, FieldVo } from "../decorator";
import { SkyHeader } from "./SkyHeader";
import { SkyInData } from "./SkyInData";

export class SkyIn<I> {
  @Field({ type: "VO", length: 0, trim: "NONE" })
  @FieldVo({ typeClass: SkyHeader })
  header: SkyHeader;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  @FieldVo({ typeClass: SkyInData<I> })
  data: SkyInData<I>;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  tail: string = "@@";
}
