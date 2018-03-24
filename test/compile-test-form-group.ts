import {AbstractControl, FormGroup} from '../model';
import {Address, Bar, Foo, Hero} from './interfaces';

const fooFormGroup: FormGroup<Foo> = {} as FormGroup<Foo>;
const group6: AbstractControl<Bar> | null = fooFormGroup.get(['field']);
const group7: AbstractControl<string> | null = fooFormGroup.get(['field', 'prop']);

const heroFormGroup: FormGroup<Hero> = {} as FormGroup<Hero>;
const namecontrol: AbstractControl<string> | null = heroFormGroup.get('name');
const lairs: AbstractControl<Address[]> | null = heroFormGroup.get('secretLairs');