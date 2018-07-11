import {FormControl,} from '../src/model';
import {Foo} from './interfaces';
import {FormControl as AngularFormControl} from '@angular/forms';
import {toUntyped} from '../src/interop';

const formGroup = new FormControl<Foo>();

const untypedFormGroup: AngularFormControl = toUntyped(formGroup);
