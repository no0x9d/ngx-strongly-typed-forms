import {AbstractControl, FormArray, FormControl, FormGroup} from '../model';
import {Address, Bar, Foo, Hero} from './interfaces';

let fooFormGroup: FormGroup<Foo> = new FormGroup<Foo>({
  field: new FormControl<Bar>(undefined),
  array: new FormArray([])
});
fooFormGroup = new FormGroup<Foo>({
  field: new FormControl<Bar>(undefined),
  array: new FormArray([new FormControl<Bar>({prop: ""}), new FormControl<Bar>(undefined)])
});
let barControl: AbstractControl<Bar> | null = fooFormGroup.get(['field']);
barControl = fooFormGroup.get('field');
let stringControl: AbstractControl<string> | null = fooFormGroup.get(['field', 'prop']);
let s: string = fooFormGroup.get(['field', 'prop'])!.value;
stringControl = fooFormGroup.get('field')!.get('prop');
const barArray: AbstractControl<Bar[]> | null = fooFormGroup.get('array');

const heroFormGroup: FormGroup<Hero> = {} as FormGroup<Hero>;
const namecontrol: AbstractControl<string> | null = heroFormGroup.get('name');
const lairsControl: AbstractControl<Address[]> | null = heroFormGroup.get('secretLairs');

// partial Reset
fooFormGroup.reset({field: new Bar()});