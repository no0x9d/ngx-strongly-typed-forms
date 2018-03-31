export interface Hero {
  name: string;
  power: string;
  sidekick: string;
  secretLairs: Address[];
}

export class Address {
  name: string = '';
}

export interface Foo {
  field: Bar,
  array: Bar[]
}

export class Bar {
  prop: string = "";
}
