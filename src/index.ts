"use strict";

// import { prototype } from "./prototype";

// prototype();

import { SkyHeader, SkyIn } from "./sky/vo";
import { FieldParam, Meta } from "./sky/decorator";
import { Car } from "./dto/Car";

const skyHeader = new SkyHeader();

let fields: Array<FieldParam> | undefined = Reflect.getMetadata(
  Meta.FIELD,
  skyHeader
);

const skyIn = new SkyIn<Car>();

fields = Reflect.getMetadata(Meta.FIELD, skyIn);

let length = 0;

if (fields)
  for (let i = 0; i < fields?.length; i++) {
    console.log(fields[i]);
    length += fields[i].metadata.length;
  }

console.log(length);

// 00000580DEVWAS0120240918130914054mti2100SED03F107R              MTI S                        DEVWAS0120240918130914054mti210020240918130914000520WEB       172.16.20.11                                WED030120H N1787130271     020240918130914000520                    A000000      00010                                                                        ID                                                                                                                                             D00000077                     EDC  0013000011976476                                   @@
