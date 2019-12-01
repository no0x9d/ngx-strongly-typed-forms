import {FormArray, FormControl, FormGroup, Static} from '../src/model';
import {Bar} from './interfaces';

let fooFormGroup = new FormGroup({
  field: new FormControl<Bar>(undefined),
  group: new FormGroup({
    prop: new FormControl('')
  }),
  array: new FormArray(new Array<FormControl<Bar>>())
});
fooFormGroup = new FormGroup({
  field: new FormControl<Bar>(undefined),
  group: new FormGroup({
    prop: new FormControl('')
  }),
  array: new FormArray([new FormControl<Bar>({prop: ""}), new FormControl<Bar>(undefined)])
});
let barControl: FormControl<Bar> = fooFormGroup.get(['field']);
barControl = fooFormGroup.get('field');
barControl = fooFormGroup.controls.field;

// This is correctly recognised as an error
// Unfortunately the error message isn't very helpful: Argument of type 'string[]' is not assignable to parameter of type '"field" | "array"'
// let stringControl = fooFormGroup.get(['field', 'prop']);

// the group version works as expected
let stringControl: FormControl<string> = fooFormGroup.get(['group', 'prop']);
stringControl = fooFormGroup.controls.group.controls.prop;

const nullControl: null = fooFormGroup.get('field')!.get('prop');

let barArray: FormArray<FormControl<Bar>> = fooFormGroup.get('array');
barArray = fooFormGroup.controls.array;

// Typescript array dereference is never null so the "get" must also not return null to be consistent, even if sometimes incorrect.
barControl = fooFormGroup.get(['array', 0]);
barControl = fooFormGroup.controls.array.controls[0];

// partial Reset
fooFormGroup.reset({field: new Bar()});
type Foo = Static<typeof fooFormGroup>;
const foo: Foo = {
  field: new Bar(),
  group: {
    prop: ''
  },
  array: [new Bar()]
}
