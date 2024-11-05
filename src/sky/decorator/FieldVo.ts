import "reflect-metadata";
import { FieldVoMeta, Meta } from "./Meta";

export interface FieldVoParam<T> {
  propertyKey: string;
  metadata: FieldVoMeta<T>;
}

export function FieldVo<T>(metadata: FieldVoMeta<T>) {
  return function (target: Object, propertyKey: string) {
    if (!Reflect.hasMetadata(Meta.FIELD_VO, target))
      Reflect.defineMetadata(Meta.FIELD_VO, [], target);

    const vos: Array<FieldVoParam<T>> = Reflect.getMetadata(
      Meta.FIELD_VO,
      target
    );
    vos.push({ propertyKey, metadata });
    Reflect.defineMetadata(Meta.FIELD_VO, vos, target);
  };
}
