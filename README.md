## How to use?

```bash
npm install ngx-strongly-typed-forms
```

Now you can import generic FormControl, FormGroup and FormArray and use them instead of the classes from `@angular/forms`
```typescript
import {FormArray, FormControl, FormGroup} from 'ngx-strongly-typed-forms';
```

If you want to use the FormBuilder you have to provide it from your app module
```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from 'ngx-strongly-typed-forms';

@NgModule({
  imports: [ ReactiveFormsModule ]
  providers: [ FormBuilder ]
})
export class AppModule {
}

```

All usages of `AbstractControl` and its subclasses now supports generic types.

This change is not backwards compatible with Angulars AbstractControl. All occurrence at minimum must be typed with `AbstractControl<any>`, or at best with a interface which describes all form fields.

## How does it work

This project does not modify any angular classes but provides new strongly typed definitions for Angulars own forms.
For convenience it reexports this classes directly from angular

### Hints

* When working with FormBuilder and FormGroups always mention the type you want, or else the Typescript compiler tries to match
every property, which does not work with nestet FormArrays or FormGroups.
```
form = fb.group<MyModel>({
  foo: null,
  bar: ["bar", Validators.required],
  baz: fb.array([])
})
```

* `FormArray<T>` extends `AbstractControl<T[]>`. So if you have a `FormArray<string>` you can assign it to an `AbstractControl<string[]>`. This is necessary, because for instance `FormArray.get` returns a single instance of type `T` but `FormArray.value` returns `T[]`.
It's also important when working with FormArrays as part of complex FormGroups. The generic type of the FormArray must always be the same as the generic of the Array in the model.

## Alternatives

* Angulars own effort to create typed forms (https://github.com/angular/angular/pull/20040).
  But it's not yet merged and has - in my opinion - the drawback to fall back to untyped forms to easy. At the current state it also does not support typed FormBuilder.
* [ngx-typed-form](https://github.com/Quramy/ngx-typed-forms) provides typed FormBuilder, but does not enforce the structure of any parameters.
  Because of the chosen implementation FormControl, FormGroup and FormArray are only interfaces and can not be used directly

## Something does not work as expected

Beside the known limitations, everything that is possible with the native Angular Forms should be possible too.
If you find something not working as expected then there might be a problem in my type definitions. Please open an issue with an minimal example to reproduce the problem and I will try to fix it asap.

## Limitations

* The get method on AbstractControl `AbstractControl#get(path: string|number [])` is impossible to statically type, because every subclass has a different implementation.
  FormControll always return null, FormGroup only works with string keys and FormArray only with a numerical index.
  Because I never needed a deeply nested access with both number and string, only string key up to a depth of 5 levels are currently supported. If this is not sufficient for you, please open an issue and explain your situation.
* Because of it's nature to support only strongly typed forms, forms with dynamically added fields can not be build an a typesafe way.
  Workaround: Use `AbstractControl<any>` or an interface with all possible fields set as optional.
