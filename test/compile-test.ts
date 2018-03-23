import {Validators} from '@angular/forms'
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '../model';

interface ViewModel {
  name: string;
  power: string;
  sidekick: string;
  secretLairs: Address[];
}

interface Address {
  name: string;
}

const fb = new FormBuilder();
const formgroup: FormGroup<ViewModel> = fb.group<ViewModel>({
  name: '',
  secretLairs: fb.array<Address[]>([]),
  power: '',
  sidekick: ''
});

const control1: FormControl<string> = fb.control('');
const control2: FormControl<string> = fb.control({value: '', disabled: true});

const c: FormArray<string> = fb.array<string>(['2345', 'ieiae', fb.control<string>('uieie')]);
const d: FormArray<string> = fb.array<string>([fb.control<string>('uieie')]);
const e: FormArray<Bar> = fb.array([fb.control({prop: ''})]);

const s: AbstractControl<string> = c.get('toString');

d.setValue(['foo', 'bar']);
const namecontrol: AbstractControl<string> = formgroup.get('name');
const lairs: AbstractControl<Address[]> = formgroup.get('secretLairs');

interface Foo {
  field: Bar
}

interface Bar {
  prop: string
}

const barFormArray = fb.array<Bar>([[{prop: ''}, Validators.required],
  [{prop: 'bar'}, Validators.required, Validators.email]]);
const group1: FormGroup<Bar> = fb.group<Bar>([{prop: ''}]);
const group2: FormGroup<Bar> = fb.group<Bar>([{value: {prop: ''}, disabled:true}]);
const group3: FormGroup<Bar> = fb.group<Bar>([{prop: ''}, Validators.required]);
const group4: FormGroup<Bar> = fb.group<Bar>([{prop: ''}, [Validators.required, Validators.minLength(5)]]);

const formGroupFoo: FormGroup<Foo> = undefined;
const group6: AbstractControl<Bar> = formGroupFoo.get(['field']);
const group7: AbstractControl<string> = formGroupFoo.get(['field', 'prop']);