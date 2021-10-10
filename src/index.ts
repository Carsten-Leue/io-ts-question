import { isRight } from 'fp-ts/Either';
import { brand, Branded, string, type, TypeOf } from 'io-ts';

interface VersionBrand {
  readonly Version: unique symbol; // use `unique symbol` here to ensure uniqueness across modules / packages
}

export const TypeVersion = brand(
  string, // a codec representing the type to be refined
  (value: string): value is Branded<string, VersionBrand> =>
    /^\d+\.\d+\.\d+$/.test(value), // a custom type guard using the build-in helper `Branded`
  'Version' // the name must match the readonly field in the brand
);

export const TypeMyStruct = type({
  version: TypeVersion,
});

export type Version = TypeOf<typeof TypeVersion>;
export type MyStruct = TypeOf<typeof TypeMyStruct>;

export function callFunction(data: MyStruct): boolean {
  // type check
  const validation = TypeMyStruct.decode(data);
  return isRight(validation);
}
