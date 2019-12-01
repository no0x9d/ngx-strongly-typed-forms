import {
  AsyncValidatorFn as NgAsyncValidatorFn,
  ValidationErrors,
  ValidatorFn as NgValidatorFN,
  AbstractControl as NgAbstractControl,
  FormArray as NgFormArray,
  FormGroup as NgFormGroup,
  FormControl as NgFormControl
} from '@angular/forms';
import {Observable} from 'rxjs';

export type FormHooks = 'change' | 'blur' | 'submit';

export type ValidatorFn<T> = NgValidatorFN | TypedValidatorFn<T>
export type AsyncValidatorFn<T> = NgAsyncValidatorFn | TypedAsyncValidatorFn<T>

export type Controls<T = unknown> = { [P in keyof T]: AbstractControl<T[P]> };
export type FormState<T> = T | { value: T, disabled: boolean };
export type StateAndValidators<T> = [FormState<T>] |
  [FormState<T>, ValidatorFn<T> | ValidatorFn<T>[]] |
  [FormState<T>, ValidatorFn<T> | ValidatorFn<T>[] | null, AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null]

export type ControlConfig<T> = FormState<T> | StateAndValidators<T> | AbstractControl<T>;
export type ControlsConfig<T> = { [P in keyof T]: ControlConfig<T[P]> };

export interface AbstractControlOptions<T> {
  validators?: ValidatorFn<T> | ValidatorFn<T>[] | null;
  asyncValidators?: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null;
  updateOn?: FormHooks;
}

export interface TypedValidatorFn<T> {
  (control: AbstractControl<T>): ValidationErrors | null;
}

export interface TypedAsyncValidatorFn<T> {
  (control: AbstractControl<T>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}

export interface Validator<T> {
  validate(c: AbstractControl<T>): ValidationErrors | null;

  registerOnValidatorChange?(fn: () => void): void;
}

export interface AsyncValidator<T> extends Validator<T> {
  validate(c: AbstractControl<T>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}

// helpers to support typing 'get'
type HasControls = FormArray | FormGroup;
type GetControls<T extends HasControls> = T['controls'];
type GetControlKeys<T extends HasControls> = keyof GetControls<T>;
type GetControl<T extends HasControls, K extends GetControlKeys<T>> = GetControls<T>[K];

/**
 * Get the type of the data stored by a control.
 */
export type Static<T extends TypedAbstractControl<any>> = T['value'];

/**
 * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * @see [Forms Guide](/guide/forms)
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 * @see [Dynamic Forms Guide](/guide/dynamic-form)
 *
 */
// <T> is the type of the value stored by the control, <C> is the type of the inner controls, if any
export interface TypedAbstractControl<T = unknown, C = unknown> {

  /**
   * The current value of the control.
   *
   * * For a `FormControl`, the current value.
   * * For a `FormGroup`, the values of enabled controls as an object
   * with a key-value pair for each member of the group.
   * * For a `FormArray`, the values of enabled controls as an array.
   *
   */
  readonly value: T;

  /**
   * A multicasting observable that emits an event every time the value of the control changes, in
   * the UI or programmatically.
   */
  readonly valueChanges: Observable<T>;

  validator: ValidatorFn<T> | null;
  asyncValidator: AsyncValidatorFn<T> | null;

  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing sync validators.
   */
  setValidators(newValidator: ValidatorFn<T> | ValidatorFn<T>[] | null): void;

  /**
   * Sets the async validators that are active on this control. Calling this
   * overwrites any existing async validators.
   */
  setAsyncValidators(newValidator: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): void;

  /**
   * Sets the value of the control. Abstract method (implemented in sub-classes).
   */
  setValue(value: T, options?: Object): void;

  /**
   * Patches the value of the control. Abstract method (implemented in sub-classes).
   */
  patchValue(value: T, options?: Object): void;

  /**
   * Resets the control. Abstract method (implemented in sub-classes).
   */
  reset(value?: T, options?: Object): void;

  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   *
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name']);`
   */
  get<K1 extends keyof C>(path: [K1]): C[K1];
  get<K1 extends keyof C, C2 extends C[K1] & HasControls, K2 extends GetControlKeys<C2>>(path: [K1, K2]): GetControl<C2, K2>;
  get<K1 extends keyof C, C2 extends C[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>>(path: [K1, K2, K3]): GetControl<C3, K3>;
  get<K1 extends keyof C, C2 extends C[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>>(path: [K1, K2, K3, K4]): GetControl<C4, K4>;
  get<K1 extends keyof C, C2 extends C[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>, C5 extends GetControl<C4, K4> & HasControls, K5 extends GetControlKeys<C5>>(path: [K1, K2, K3, K4, K5]): GetControl<C5, K5>;

  get<K1 extends keyof C>(path: K1): C[K1];
}

export type AbstractControl<T = any> = NgAbstractControl & TypedAbstractControl<T>;

/**
 * Tracks the value and validity state of an array of `FormControl`,
 * `FormGroup` or `FormArray` instances.
 *
 * A `FormArray` aggregates the values of each child `FormControl` into an array.
 * It calculates its status by reducing the status values of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormGroup`.
 *
 * @usageNotes
 *
 * ### Create an array of form controls
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * ### Create a form array with array-level validators
 *
 * You include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * The two types of validators are passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * ### Set the updateOn property for all controls in a form array
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const arr = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls from a form array
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that result in strange and unexpected behavior such
 * as broken change detection.
 *
 *
 */
export class FormArray<T extends AbstractControl<any> = AbstractControl> extends NgFormArray implements TypedAbstractControl<Array<Static<T>>, Array<T>> {
  controls: Array<T>;

  /**
   * The current value of the control.
   *
   * Which is the values of enabled controls as an array.
   *
   */
  readonly value: Array<Static<T>>;

  /**
   * A multicasting observable that emits an event every time the value of the control changes, in
   * the UI or programmatically.
   */
  readonly valueChanges: Observable<Array<Static<T>>>;

  validator: ValidatorFn<T[]> | null;
  asyncValidator: AsyncValidatorFn<T[]> | null;

  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * wheh it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls: Array<T>,
    validatorOrOpts?: ValidatorFn<Static<T>> | ValidatorFn<Static<T>>[] | AbstractControlOptions<Static<T>> | null,
    asyncValidator?: AsyncValidatorFn<Static<T>> | AsyncValidatorFn<Static<T>>[] | null) {
    super(controls)
  };

  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing sync validators.
   */
  setValidators(newValidator: ValidatorFn<T[]> | ValidatorFn<T[]>[] | null): void {
  }

  /**
   * Sets the async validators that are active on this control. Calling this
   * overwrites any existing async validators.
   */
  setAsyncValidators(newValidator: AsyncValidatorFn<T[]> | AsyncValidatorFn<T[]>[] | null): void {
  }

  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control
   */
  at(index: number): T {
    return this.controls[index]
  };

  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   */
  push(control: T): void {
  };

  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control
   * @param control Form control to be inserted
   */
  insert(index: number, control: T): void {
  };

  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control
   * @param control The `AbstractControl` control to replace the existing control
   */
  setControl(index: number, control: T): void {
  };

  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  setValue(value: Static<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  patchValue(value: Static<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(this.arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * this.arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(this.arr.value);  // ['name', 'last name']
   * console.log(this.arr.get(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  reset(value?: Static<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   * For enabled controls only, the `value` property is the best way to get the value of the array.
   */
  getRawValue(): Static<T> {
    throw undefined
  };

  get<K1 extends keyof Array<T>>(path: [K1]): Array<T>[K1];
  get<K1 extends keyof Array<T>, C2 extends Array<T>[K1] & HasControls, K2 extends GetControlKeys<C2>>(path: [K1, K2]): GetControl<C2, K2>;
  get<K1 extends keyof Array<T>, C2 extends Array<T>[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>>(path: [K1, K2, K3]): GetControl<C3, K3>;
  get<K1 extends keyof Array<T>, C2 extends Array<T>[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>>(path: [K1, K2, K3, K4]): GetControl<C4, K4>;
  get<K1 extends keyof Array<T>, C2 extends Array<T>[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>, C5 extends GetControl<C4, K4> & HasControls, K5 extends GetControlKeys<C5>>(path: [K1, K2, K3, K4, K5]): GetControl<C5, K5>;

  get<K1 extends keyof Array<T>>(path: K1): Array<T>[K1];

  get(path: any): any {
  }
}

/**
 * Tracks the value and validity state of a group of `FormControl` instances.
 *
 * A `FormGroup` aggregates the values of each child `FormControl` into one object,
 * with each control name as the key.  It calculates its status by reducing the status values
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with `FormControl` and `FormArray`.
 *
 * When instantiating a `FormGroup`, pass in a collection of child controls as the first
 * argument. The key for each child registers the name for the control.
 *
 * @usageNotes
 *
 * ### Create a form group with 2 controls
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * ### Create a form group with a group-level validator
 *
 * You include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like `FormControl` instances, you choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
 * ```
 *
 * ### Set the updateOn property for all controls in a form group
 *
 * The options object is used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *   one: new FormControl()
 * }, { updateOn: 'blur' });
 * ```
 */
type ControlsStaticType<T extends { [_: string]: AbstractControl }> = { [K in keyof T]: Static<T[K]> };
export class FormGroup<T extends Controls<any> = Controls> extends NgFormGroup implements TypedAbstractControl<ControlsStaticType<T>, T> {
  controls: T;

  /**
   * The current value of the control.
   *
   * Which is the values of enabled controls as an object
   * with a key-value pair for each member of the group.
   */
  readonly value: ControlsStaticType<T>;

  /**
   * A multicasting observable that emits an event every time the value of the control changes, in
   * the UI or programmatically.
   */
  readonly valueChanges: Observable<ControlsStaticType<T>>;

  validator: ValidatorFn<T> | null;
  asyncValidator: AsyncValidatorFn<T> | null;

  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls: T,
    validatorOrOpts?: ValidatorFn<ControlsStaticType<T>> | ValidatorFn<ControlsStaticType<T>>[] | AbstractControlOptions<ControlsStaticType<T>> | null,
    asyncValidator?: AsyncValidatorFn<ControlsStaticType<T>> | AsyncValidatorFn<ControlsStaticType<T>>[] | null) {
    super(controls)
  };

  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing sync validators.
   */
  setValidators(newValidator: ValidatorFn<T> | ValidatorFn<T>[] | null): void {
  }

  /**
   * Sets the async validators that are active on this control. Calling this
   * overwrites any existing async validators.
   */
  setAsyncValidators(newValidator: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): void {
  }

  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   *
   * ```
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you excluding the value of a control.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */
  setValue(value: ControlsStaticType<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * ### Patch the value for a form group
   *
   *  ```
   *  const form = new FormGroup({
   *     first: new FormControl(),
   *     last: new FormControl()
   *  });
   *  console.log(form.value);   // {first: null, last: null}
   *
   *  form.patchValue({first: 'Nancy'});
   *  console.log(form.value);   // {first: 'Nancy', last: null}
   *
   *  ```
   *
   * @param value The object that matches the structure of the group
   * @param options Configure options that determines how the control propagates changes and
   * emits events after the value is patched
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  patchValue(value: Partial<ControlsStaticType<T>>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * Resets the `FormGroup`, marks all descendants are marked `pristine` and `untouched`, and
   * the value of all descendants to null.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param formState Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(this.form.value);  // {first: 'name', last: 'last name'}
   * console.log(this.form.get('first').status);  // 'DISABLED'
   * ```
   */
  reset(value?: Partial<ControlsStaticType<T>>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   * The `value` property is the best way to get the value of the group, because
   * it excludes disabled controls in the `FormGroup`.
   */
  getRawValue(): ControlsStaticType<T> {
    throw undefined
  };

  get<K1 extends keyof T>(path: [K1]): T[K1];
  get<K1 extends keyof T, C2 extends T[K1] & HasControls, K2 extends GetControlKeys<C2>>(path: [K1, K2]): GetControl<C2, K2>;
  get<K1 extends keyof T, C2 extends T[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>>(path: [K1, K2, K3]): GetControl<C3, K3>;
  get<K1 extends keyof T, C2 extends T[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>>(path: [K1, K2, K3, K4]): GetControl<C4, K4>;
  get<K1 extends keyof T, C2 extends T[K1] & HasControls, K2 extends GetControlKeys<C2>, C3 extends GetControl<C2, K2> & HasControls, K3 extends GetControlKeys<C3>, C4 extends GetControl<C3, K3> & HasControls, K4 extends GetControlKeys<C4>, C5 extends GetControl<C4, K4> & HasControls, K5 extends GetControlKeys<C5>>(path: [K1, K2, K3, K4, K5]): GetControl<C5, K5>;

  get<K1 extends keyof T>(path: K1): T[K1];

  get(path: any): any {
  }
}

/**
 * Tracks the value and validation status of an individual form control.
 *
 * This is one of the three fundamental building blocks of Angular forms, along with
 * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
 * implements most of the base functionality for accessing the value, validation status,
 * user interactions and events.
 *
 * @see `AbstractControl`
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see [Usage Notes](#usage-notes)
 *
 * @usageNotes
 *
 * ### Initializing Form Controls
 *
 * Instantiate a `FormControl`, with an initial value.
 *
 * ```ts
 * const control = new FormControl('some value');
 * console.log(control.value);     // 'some value'
 *```
 *
 * The following example initializes the control with a form state object. The `value`
 * and `disabled` keys are required in this case.
 *
 * ```ts
 * const control = new FormControl({ value: 'n/a', disabled: true });
 * console.log(control.value);     // 'n/a'
 * console.log(control.status);    // 'DISABLED'
 * ```
 *
 * The following example initializes the control with a sync validator.
 *
 * ```ts
 * const control = new FormControl('', Validators.required);
 * console.log(control.value);      // ''
 * console.log(control.status);     // 'INVALID'
 * ```
 *
 * The following example initializes the control using an options object.
 *
 * ```ts
 * const control = new FormControl('', {
 *    validators: Validators.required,
 *    asyncValidators: myAsyncValidator
 * });
 * ```
 *
 * ### Configure the control to update on a blur event
 *
 * Set the `updateOn` option to `'blur'` to update on the blur `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'blur' });
 * ```
 *
 * ### Configure the control to update on a submit event
 *
 * Set the `updateOn` option to `'submit'` to update on a submit `event`.
 *
 * ```ts
 * const control = new FormControl('', { updateOn: 'submit' });
 * ```
 *
 * ### Reset the control back to an initial value
 *
 * You reset to a specific form state by passing through a standalone
 * value or a form state object that contains both a value and a disabled state
 * (these are the only two properties that cannot be calculated).
 *
 * ```ts
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 *
 * control.reset('Drew');
 *
 * console.log(control.value); // 'Drew'
 * ```
 *
 * ### Reset the control back to an initial value and disabled
 *
 * ```
 * const control = new FormControl('Nancy');
 *
 * console.log(control.value); // 'Nancy'
 * console.log(control.status); // 'VALID'
 *
 * control.reset({ value: 'Drew', disabled: true });
 *
 * console.log(control.value); // 'Drew'
 * console.log(control.status); // 'DISABLED'
 *
 */
export class FormControl<T> extends NgFormControl implements TypedAbstractControl<T, void> {
  /**
   * The current value of the control.
   */
  readonly value: T;

  /**
   * A multicasting observable that emits an event every time the value of the control changes, in
   * the UI or programmatically.
   */
  readonly valueChanges: Observable<T>;

  validator: ValidatorFn<T> | null;
  asyncValidator: AsyncValidatorFn<T> | null;
  
  /**
   * Creates a new `FormControl` instance.
   *
   * @param formState Initializes the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(formState?: FormState<T>,
    validatorOrOpts?: ValidatorFn<T> | ValidatorFn<T>[] | AbstractControlOptions<T> | null,
    asyncValidator?: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null) {
    super()
  };

  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing sync validators.
   */
  setValidators(newValidator: ValidatorFn<T> | ValidatorFn<T>[] | null): void {
  }

  /**
   * Sets the async validators that are active on this control. Calling this
   * overwrites any existing async validators.
   */
  setAsyncValidators(newValidator: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): void {
  }

  /**
   * Sets a new value for the form control.
   *
   * @param value The new value for the control.
   * @param options Configuration options that determine how the control proopagates changes
   * and emits events when the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
   * `onChange` event to
   * update the view.
   * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
   * `ngModelChange`
   * event to update the model.
   *
   */
  setValue(value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void {
  };

  /**
   * Patches the value of a control.
   *
   * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
   * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
   * `FormArrays`, where it does behave differently.
   *
   * @see `setValue` for options
   */
  patchValue(value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void {
  };

  /**
   * Resets the form control, marking it `pristine` and `untouched`, and setting
   * the value to null.
   *
   * @param formState Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   *
   */
  reset(formState?: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
  };

  get(path: any): null {
    return null;
  };
}

export interface FormBuilderFormGroupOptions<T> {
  validator?: ValidatorFn<T> | ValidatorFn<T>[] | null;
  asyncValidator?: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null;
}

/**
 * @description
 * Creates an `AbstractControl` from a user-specified configuration.
 *
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
 * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
 * forms.
 *
 * @see [Reactive Forms Guide](/guide/reactive-forms)
 *
 * @publicApi
 */
export class FormBuilder {

  /**
   * @description
   * Construct a new `FormGroup` instance.
   *
   * @param controlsConfig A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param options Configuration options object for the `FormGroup`. The object can
   * have two shapes:
   *
   * 1) `AbstractControlOptions` object (preferred), which consists of:
   * * `validators`: A synchronous validator function, or an array of validator functions
   * * `asyncValidators`: A single async validator or array of async validator functions
   * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur' |
   * submit')
   *
   * 2) Legacy configuration object, which consists of:
   * * `validator`: A synchronous validator function, or an array of validator functions
   * * `asyncValidator`: A single async validator or array of async validator functions
   *
   */
  group<T extends Controls<any>>(controlsConfig: T, options?: FormBuilderFormGroupOptions<ControlsStaticType<T>> | AbstractControlOptions<ControlsStaticType<T>>): FormGroup<T>;
  group<T>(controlsConfig: ControlsConfig<T>, options?: FormBuilderFormGroupOptions<T> | AbstractControlOptions<T>): FormGroup<Controls<T>>;
  group(controlsConfig: any, options?: any): any {
    throw undefined
  };

  /**
   * @description
   * Construct a new `FormControl` with the given state, validators and options.
   *
   * @param formState Initializes the control with an initial state value, or
   * with an object that contains both a value and a disabled status.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   *
   * @usageNotes
   *
   * ### Initialize a control as disabled
   *
   * The following example returns a control with an initial value in a disabled state.
   *
   * <code-example path="forms/ts/formBuilder/form_builder_example.ts"
   *   linenums="false" region="disabled-control">
   * </code-example>
   */
  control<T>(formState: FormState<T>,
    validatorOrOpts?: ValidatorFn<T> | ValidatorFn<T>[] | null,
    asyncValidator?: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): FormControl<T> {
    throw undefined
  };

  /**
   * Constructs a new `FormArray` from the given array of configurations,
   * validators and options.
   *
   * @param controlsConfig An array of child controls or control configs. Each
   * child control is given an index when it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   */
  array<T extends AbstractControl<any>>(controlsConfig: Array<T>,
    validatorOrOpts?: ValidatorFn<Static<T>> | ValidatorFn<Static<T>>[] | null,
    asyncValidator?: AsyncValidatorFn<Static<T>> | AsyncValidatorFn<Static<T>>[] | null): FormArray<T>;
  array<T>(controlsConfig: ControlConfig<T>[],
    validatorOrOpts?: ValidatorFn<T> | ValidatorFn<T>[] | null,
    asyncValidator?: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): FormArray<AbstractControl<T>>;
  array(controlsConfig: any): any {
    throw undefined
  };
}
