import {AbstractControl, AsyncValidatorFn, FormControl, TypedAsyncValidatorFn} from '../src/model';
import {AbstractControl as NgAbstractControl} from '@angular/forms';
import {Hero} from './interfaces';

// TypedValidatorFn
new FormControl<number>(42, (c: AbstractControl<number>) => null);
// TypedValidatorFn[]
new FormControl<number>(42, [(c: AbstractControl<number>) => null]);
// ValidatorFn
new FormControl<number>(42, (c: NgAbstractControl) => null);
// ValidatorFn[]
new FormControl<number>(42, [(c: NgAbstractControl) => null]);
// mixed ValidatorFn<T>
new FormControl<number>(42, [(c: AbstractControl<number>) => null, (c: NgAbstractControl) => null]);

// // partial TypedValidatorFn
// new FormControl<Hero>(undefined, (c: AbstractControl<{ power: string }>) => null);
// new FormControl<Hero>(undefined, [(c: AbstractControl<{ power: string }>) => null,
//   (c: AbstractControl<{ sidekick: string }>) => null]);
//
// // using AbstractControlOptions
// new FormControl<Hero>(undefined, {validators: (c: AbstractControl<{ power: string }>) => null});
// new FormControl<Hero>(undefined, {validators: [(c: AbstractControl<{ power: string }>) => null]});

// TypedAsyncValidatorFn
new FormControl<number>(42, null, (c: AbstractControl<number>) => Promise.resolve(null));
// TypedAsyncValidatorFn[]
new FormControl<number>(42, null, [(c: AbstractControl<number>) => Promise.resolve(null)]);
// AsyncValidatorFn
new FormControl<number>(42, null, (c: NgAbstractControl) => Promise.resolve(null));
// AsyncValidatorFn[]
new FormControl<number>(42, null, [(c: NgAbstractControl) => Promise.resolve(null)]);
// mixed AsyncValidatorFn<T>
new FormControl<number>(42, null, [(c: AbstractControl<number>) => Promise.resolve(null),
  (c: NgAbstractControl) => Promise.resolve(null)]);

// partial AsyncTypedValidatorFn
// new FormControl<Hero>(undefined, null, (c: AbstractControl<{ power: string }>) => Promise.resolve(null));
// new FormControl<Hero>(undefined, null,
//   [(c: AbstractControl<{ power: string }>) => Promise.resolve(null),
//     (c: AbstractControl<{ sidekick: string }>) => Promise.resolve(null)]);

