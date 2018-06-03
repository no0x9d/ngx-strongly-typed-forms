import {AbstractControl, FormControl} from '../model';
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

// partial TypedValidatorFn
new FormControl<Hero>(undefined, (c: AbstractControl<{power: string}>) => null);
new FormControl<Hero>(undefined, [(c: AbstractControl<{power: string}>) => null, (c: AbstractControl<{sidekick: string}>) => null]);
