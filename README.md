## How to use?

```bash
npm install ngx-strongly-typed-forms
```
**Attention:** Since version 7.2 this project does no longer follow semver version numbers.
The major and minor version represents the compatible Angular version and patch versions are bugfixes in this library.


Now you can import generic FormControl, FormGroup and FormArray and use them instead of the classes from `@angular/forms`
```typescript
import {FormArray, FormControl, FormGroup} from 'ngx-strongly-typed-forms';
```

If you want to use the FormBuilder you have to provide it from your app module
```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStronglyTypedFormsModule } from 'ngx-strongly-typed-forms';

@NgModule({
  imports: [ ReactiveFormsModule, NgxStronglyTypedFormsModule ]
})
export class AppModule {
}

```

All usages of `AbstractControl` and its subclasses now supports generic types.

This change is not backwards compatible with Angulars AbstractControl. All occurrence at minimum must be typed with `AbstractControl<any>`, or at best with an interface which describes all form fields.

## How does it work

This project does not modify any angular classes but provides new strongly typed definitions for Angulars own forms.
For convenience it re-exports these classes directly from Angular.

### Hints

* When working with `FormControl` always mention the type you want, or else the TypeScript compiler loses type safety by inferring `any`.
For the same reason the `FormArray` sub-control type should be specified unless at least one sub-control is included.
```
form = fb.group({
  foo: fb.control<string>("foo"),
  bar: fb.control<string>("bar", Validators.required),
  baz1: fb.array<FormControl<Baz>>([]),
  baz2: fb.array([fb.control<Baz>(undefined)])
});
```

* `FormArray<T>` extends `AbstractControl<T[]>`. So if you have a `FormArray<string>` you can assign it to an `AbstractControl<string[]>`. This is necessary, because for instance `FormArray.get` returns a single instance of type `T` but `FormArray.value` returns `T[]`.
It's also important when working with FormArrays as part of complex FormGroups. The generic type of the FormArray must always be the same as the generic of the Array in the model.

* Specifying a type parameter in the `FormBuilder` methods will provide the original functionality of all inner controls being typed as `AbstractControl`s. Full control type inference is supported by removing the type parameter, eg.,

``` typescript
form = fb.group({
  array: fb.array([
    fb.control<string>("")
  ])
});
// this typechecks
stringcontrol: FormControl<string> = form.controls.array[0];

* Unfortunately the type errors when using full control type inference are not good as of Typescript v3.4
  * `Types of property 'controls' are incompatible` means that the types do not align exactly - FormControl<string> will not match a model which is of ype string | undefined or an optional field such as `{ foo?: string }`
  * `Argument of type 'string[]' is not assignable to parameter of type ...` when calling `control.get([...])` means that the control "path" does not match the sub-controls defined.
```

## Alternatives

* Angulars own effort to create typed forms (https://github.com/angular/angular/pull/20040).
  But it's not yet merged and has - in my opinion - the drawback to fall back to untyped forms too easy. At the current state it also does not support typed FormBuilder.
* [ngx-typed-form](https://github.com/Quramy/ngx-typed-forms) provides typed FormBuilder, but does not enforce the structure of any parameters.
  Because of the chosen implementation FormControl, FormGroup and FormArray are only interfaces and can not be used directly

## Something does not work as expected

Beside the known limitations, everything that is possible with the native Angular Forms should be possible too.
If you find something not working as expected then there might be a problem in my type definitions. Please open an issue with an minimal example to reproduce the problem and I will try to fix it asap.

## Limitations

* AbstractControl#value is not correctly typed for TypeScript strict mode. For FormGroup it returns only values of FormControls that are not disabled. So the correct type should be a DeepPartial<T>.
  TypeScript 2.8 supports conditional types to build this structure like
  ```
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>
  };
  ```
  When Angular uses TypeScript 2.8 the return value should be changed.
* The get method on AbstractControl `AbstractControl#get(path: string|number [])` is impossible to statically type, because every subclass has a different implementation.
  FormControl always return null, FormGroup only works with string keys and FormArray only with a numerical index.
  Because I never needed a deeply nested access with both number and string, only string key up to a depth of 5 levels are currently supported. If this is not sufficient for you, please open an issue and explain your situation.
* Because of it's nature to support only strongly typed forms, forms with dynamically added fields can not be built an a typesafe way.
  Workaround: Use `AbstractControl<any>` or an interface with all possible fields set as optional.
