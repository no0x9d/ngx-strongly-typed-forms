import {
  AbstractControl as NgAbstractControl,
  FormArray as NgFormArray,
  FormControl as NgFormControl,
  FormGroup as NgFormGroup
} from '@angular/forms';
import { AbstractControl, FormArray, FormControl, FormGroup, Controls} from './model';

export function toUntyped<T>(control: FormControl<T>): NgFormControl;
export function toUntyped<T extends Controls<any>>(control: FormGroup<T>): NgFormGroup;
export function toUntyped<T extends AbstractControl<any>>(control: FormArray<T>): NgFormArray;
export function toUntyped<T>(control: AbstractControl<any>): NgAbstractControl;
export function toUntyped<T>(control: any): any {
  return control as any;
}
