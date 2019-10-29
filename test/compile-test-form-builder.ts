import {Validators} from '@angular/forms'
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '../src/model';
import {Address, Bar, Foo, Hero} from './interfaces';

const fb = new FormBuilder();
// FormControl

let stringFormControl: FormControl<string>;

stringFormControl = fb.control('');
stringFormControl = fb.control({value: '', disabled: true});
// FormArray
let stringFormArray: FormArray<string>;

stringFormArray = fb.array<string>(['2345', 'ieiae', fb.control<string>('uieie')]);
stringFormArray = fb.array<string>([fb.control<string>('uieie')]);
stringFormArray.setValue(['foo', 'bar']);
let barFormArray: FormArray<Bar>;
barFormArray = fb.array([fb.control({prop: ''})]);
barFormArray = fb.array<Bar>([[{prop: ''}, Validators.required]]);
barFormArray = fb.array<Bar>([[{prop: ''}, [Validators.required]]]);
barFormArray = fb.array<Bar>([[{prop: ''}, [Validators.required, Validators.minLength(5)]]]);

// FormGroup
const heroFormGroup: FormGroup<Hero> = fb.group<Hero>({
  name: '',
  secretLairs: fb.array<Address>([new Address(), {name: 'foo'}]),
  power: '',
  sidekick: ''
});
const namecontrol: AbstractControl<string> | null = heroFormGroup.get('name');
const lairs: AbstractControl<Address[]> | null = heroFormGroup.get('secretLairs');

let barFormGroup: FormGroup<Bar>;
barFormGroup= fb.group<Bar>({prop: ''});
barFormGroup = fb.group<Bar>({prop: {value: '', disabled: true}});
barFormGroup = fb.group<Bar>({prop: ['', Validators.required]});
barFormGroup = fb.group<Bar>({prop: ['', [Validators.required, Validators.minLength(5)]]});

let barFormControl: FormControl<Bar>;
barFormControl= fb.control<Bar>({prop: ''});
barFormControl = fb.control<Bar>({value: {prop: ''}, disabled: true});
barFormControl = fb.control<Bar>({prop: ''}, Validators.required);
barFormControl = fb.control<Bar>({prop: ''}, [Validators.required, Validators.minLength(5)]);
