import { ClassConstructor } from "class-transformer";
import { Field } from "../decorator";
import { SkyHeader } from "./SkyHeader";
import { SkyMessage } from "./SkyMessage";
import { SkyOutData } from "./SkyOutData";

export class SkyOut<O> {
  constructor(typeClass: ClassConstructor<O>) {
    this.header = new SkyHeader();
    this.message = new SkyMessage();
    this.data = new SkyOutData(typeClass);
  }
  @Field({ type: "VO", length: 0, trim: "NONE" })
  header: SkyHeader;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  message: SkyMessage;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  data: SkyOutData<O>;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  tail: string = "@@";
}
