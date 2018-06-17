import {FormControl, FormGroup, toUntyped} from '../src/model';
import {Foo} from './interfaces';
import {FormControl as AngularFormControl} from '@angular/forms';

const formGroup = new FormControl<Foo>();

const untypedFormGroup: AngularFormControl = toUntyped(formGroup);
