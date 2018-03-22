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
d.setValue(['foo', 'bar']);
const namecontrol: AbstractControl<string> = formgroup.get('name');
const lairs: AbstractControl<Address[]> = formgroup.get('secretLairs');
