export interface Hero {
  name: string;
  power: string;
  sidekick: string;
  secretLairs: Address[];
}

export interface Address {
  name: string;
}

export interface Foo {
  field: Bar
}

export interface Bar {
  prop: string
}
