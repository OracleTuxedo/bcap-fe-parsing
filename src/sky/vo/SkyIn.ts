import { ClassConstructor } from "class-transformer";
import { Field, FieldVo } from "../decorator";
import { SkyHeader } from "./SkyHeader";
import { SkyInData } from "./SkyInData";

export class SkyIn<I> {
  constructor(typeClass: ClassConstructor<I>) {
    this.data = new SkyInData(typeClass);
    console.log("SkyIn");
    console.log(typeClass);
    const skyInDataInstance = this.data.constructor;

    console.log(skyInDataInstance);
    FieldVo({ typeClass: SkyInData })(this, "data");

    // const skyInDataInstance = this.data.constructor as ClassConstructor<I>;
    // console.log("SkyIn");
    // console.log(skyInDataInstance);
    // FieldVo({ typeClass: skyInDataInstance })(this, "data");
  }
  @Field({ type: "VO", length: 0, trim: "NONE" })
  @FieldVo({ typeClass: SkyHeader })
  header: SkyHeader;

  @Field({ type: "VO", length: 0, trim: "NONE" })
  // @FieldVo({ typeClass: SkyInData<I> })
  data: SkyInData<I>;

  @Field({ type: "STRING", length: 2, trim: "RTRIM" })
  tail: string = "@@";
}
