"use strict";

// import { prototype } from "./prototype";

// prototype();

import { SkyIn } from "./sky/vo";
import { convertStringToObject } from "./sky/mapper/Decoder";
import { SED03F107RInVo } from "./dto/SED03F107RInVo";

const input =
  "00000580DEVWAS0120240918130914054mti2100SED03F107R              MTI S                        DEVWAS0120240918130914054mti210020240918130914000520WEB       172.16.20.11                                WED030120H N1787130271     020240918130914000520                    A000000      00010                                                                        ID                                                                                                                                             D00000077                     EDC  0013000011976476                                   @@";

const parsed: SkyIn<SED03F107RInVo> | null = convertStringToObject<
  SkyIn<SED03F107RInVo>
>({
  index: 0,
  input: input,
  classInstance: new SkyIn(SED03F107RInVo),
});

console.log(
  "------------------------------------------------------------------------------------"
);
console.log("RESULT");
console.log(parsed);
