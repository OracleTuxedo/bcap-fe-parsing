import { ClassConstructor } from "class-transformer";
import { Field } from "../decorator";
import { SkyHeader } from "./SkyHeader";
import { SkyInData } from "./SkyInData";

export class SkyIn<I> {
  constructor(typeClass: ClassConstructor<I>) {
    this.header = new SkyHeader();
    this.data = new SkyInData(typeClass);
  }
  @Field({ type: "VO", length: 0, trim: "NONE" })
  header: SkyHeader;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  data: SkyInData<I>;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  tail: string = "@@";
}
