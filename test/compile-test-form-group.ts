import {AbstractControl, FormArray, FormControl, FormGroup} from '../src/model';
import {AbstractControl as NgAbstractControl} from '@angular/forms';
import {Address, Bar, Foo, Hero} from './interfaces';

let fooFormGroup: FormGroup<Foo> = new FormGroup<Foo>({
  field: new FormControl<Bar>(undefined),
  array: new FormArray<Bar>([])
});
fooFormGroup = new FormGroup<Foo>({
  field: new FormControl<Bar>(undefined),
  array: new FormArray([new FormControl<Bar>({prop: ""}), new FormControl<Bar>(undefined)])
});
let barControl: AbstractControl<Bar> = fooFormGroup.get(['field']);
barControl = fooFormGroup.get('field');
// should be null as 'prop' is only a field in the 'field' FormControl and FormControl.get always returns null
let stringControl: AbstractControl<string> | null = fooFormGroup.get(['field', 'prop']);
// should be null as 'prop' is only a field in the 'field' FormControl and FormControl.get always returns null
let s: string = fooFormGroup.get(['field', 'prop'])!.value;
// should be null as 'prop' is only a field in the 'field' FormControl and FormControl.get always returns null
const untypedControl: NgAbstractControl | null = fooFormGroup.get('field').get('prop');
const barArray: AbstractControl<Bar[]> | null = fooFormGroup.get('array');

const heroFormGroup: FormGroup<Hero> = {} as FormGroup<Hero>;
const namecontrol: AbstractControl<string> | null = heroFormGroup.get('name');
const lairsControl: AbstractControl<Address[]> | null = heroFormGroup.get('secretLairs');

// partial Reset
fooFormGroup.reset({field: new Bar()});
