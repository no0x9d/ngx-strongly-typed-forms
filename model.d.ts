import {AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AbstractControlOptions, FormHooks} from '@angular/forms/src/model';
import {Observable} from 'rxjs/Observable';

export type Controls<T> = {[P in keyof T]: AbstractControl<T[P]>};
export type FormState<T> = T | { value: T, disabled: boolean };
export type StateAndValidators<T> = [FormState<T>] |
  [FormState<T>, ValidatorFn | ValidatorFn[]] |
  [FormState<T>, ValidatorFn | ValidatorFn[] | null, AsyncValidatorFn | AsyncValidatorFn[] | null]

export type ControlConfig<T> = FormState<T> | StateAndValidators<T> | AbstractControl<T>;
export type ControlsConfig<T> = ControlConfig<T> | {[P in keyof T]: ControlConfig<T[P]>};

export declare abstract class AbstractControl<T> {
  constructor(validator: ValidatorFn | null, asyncValidator: AsyncValidatorFn | null);

  readonly parent: FormGroup<any> | FormArray<any>;

  readonly value: T;

  readonly status: string;
  readonly valid: boolean;
  readonly invalid: boolean;
  readonly pending: boolean;
  readonly disabled: boolean;
  readonly enabled: boolean;
  readonly errors: ValidationErrors | null;
  readonly pristine: boolean;
  readonly dirty: boolean;
  readonly touched: boolean;
  readonly untouched: boolean;
  readonly valueChanges: Observable<T>;
  readonly statusChanges: Observable<any>;
  readonly updateOn: FormHooks;
  readonly root: AbstractControl<T>;

  validator: ValidatorFn | null;
  asyncValidator: AsyncValidatorFn | null;

  setValidators(newValidator: ValidatorFn | ValidatorFn[] | null): void;

  setAsyncValidators(newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null): void;

  clearValidators(): void;

  clearAsyncValidators(): void;

  markAsTouched(opts?: {
    onlySelf?: boolean;
  }): void;

  markAsUntouched(opts?: {
    onlySelf?: boolean;
  }): void;

  markAsDirty(opts?: {
    onlySelf?: boolean;
  }): void;

  markAsPristine(opts?: {
    onlySelf?: boolean;
  }): void;

  markAsPending(opts?: {
    onlySelf?: boolean;
  }): void;

  disable(opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  enable(opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  private _updateAncestors(onlySelf);

  setParent(parent: FormGroup<any> | FormArray<any>): void;

  abstract setValue(value: T, options?: Object): void;

  abstract patchValue(value: Partial<T>, options?: Object): void;

  abstract reset(value?: T, options?: Object): void;

  updateValueAndValidity(opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  private _setInitialStatus();

  private _runValidator();

  private _runAsyncValidator(emitEvent?);

  private _cancelExistingSubscription();

  setErrors(errors: ValidationErrors | null, opts?: {
    emitEvent?: boolean;
  }): void;

  get<K extends keyof T>(path: K): AbstractControl<T[K]> | null;
  get<K1 extends keyof T>(path: [K1]): AbstractControl<T[K1]> | null;
  get<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): AbstractControl<T[K1][K2]> | null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(path: [K1, K2]): AbstractControl<T[K1][K2][K3]> | null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(path: [K1, K2]): AbstractControl<T[K1][K2][K3][K4]> | null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(path: [K1, K2]): AbstractControl<T[K1][K2][K3][K4][K5]> | null;

  getError(errorCode: string, path?: string[]): any;

  hasError(errorCode: string, path?: string[]): boolean;
}

export declare class FormArray<T> extends AbstractControl<T[]> {

  constructor(controls: AbstractControl<T>[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);

  controls: AbstractControl<T>[];

  readonly length: number;

  at(index: number): AbstractControl<T>;

  get<K1 extends keyof T>(path: [K1]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(path: [K1, K2]): null;

  push(control: AbstractControl<T>): void;

  insert(index: number, control: AbstractControl<T>): void;

  removeAt(index: number): void;

  setControl(index: number, control: AbstractControl<T>): void;

  setValue(value: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  patchValue(value: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  reset(value?: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  getRawValue(): T[];
}

export declare class FormGroup<T> extends AbstractControl<T> {
  controls: Controls<T>;

  constructor(controls: Controls<T>,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);

  registerControl(name: string, control: AbstractControl<any>): AbstractControl<any>;

  addControl(name: string, control: AbstractControl<any>): void;

  removeControl<K extends keyof T>(name: K): void;

  setControl<K extends keyof T>(name: K, control: AbstractControl<T[K]>): void;

  contains(controlName: string): boolean;

  setValue(value: {
    [key: string]: any;
  }, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  patchValue(value: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  reset(value?: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  getRawValue(): T;
}

export declare class FormControl<T> extends AbstractControl<T> {
  constructor(formState?: FormState<T>,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);

  setValue(value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;

  patchValue(value: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;

  reset(formState?: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  get<K extends keyof T>(path: K): null;
  get<K1 extends keyof T>(path: [K1]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(path: [K1, K2]): null;
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(path: [K1, K2]): null;

  registerOnChange(fn: Function): void;

  registerOnDisabledChange(fn: (isDisabled: boolean) => void): void;
}

export declare class FormBuilder {

  group<T>(controlsConfig: ControlsConfig<T>, extra?: { [key: string]: any }): FormGroup<T>;

  control<T>(value: FormState<T>,
    validator?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): FormControl<T>;

  array<T>(controlsConfig: ControlConfig<T>[],
    validator?: ValidatorFn | null,
    asyncValidator?: AsyncValidatorFn | null): FormArray<T>;
}
