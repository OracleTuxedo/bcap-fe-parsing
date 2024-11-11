import { ClassConstructor } from "class-transformer";
import { Field, FieldNumber } from "../decorator";

export class SkyInData<I> {
  constructor(typeClass: ClassConstructor<I>) {
    this.data = new typeClass();
  }

  @Field({ type: "STRING", length: 1, trim: "RTRIM" })
  data_type: string;

  @Field({ type: "NUMBER", length: 8, trim: "LTRIM" })
  @FieldNumber({ type: "INT", decimal: 0 })
  length: number;

  @Field({ type: "STRING", length: 21, trim: "RTRIM" })
  reserved: string;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  data: I;
}
