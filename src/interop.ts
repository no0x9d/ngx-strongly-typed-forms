import {
  AbstractControl as NgAbstractControl,
  FormArray as NgFormArray,
  FormControl as NgFormControl,
  FormGroup as NgFormGroup
} from '@angular/forms';
import {AbstractControl, FormArray, FormControl, FormGroup} from './model';

export function toUntyped<T>(control: FormControl<T>): NgFormControl;
export function toUntyped<T>(control: FormGroup<T>): NgFormGroup;
export function toUntyped<T>(control: FormArray<T>): NgFormArray;
export function toUntyped<T>(control: AbstractControl<T>): NgAbstractControl {
  return control as any;
}
