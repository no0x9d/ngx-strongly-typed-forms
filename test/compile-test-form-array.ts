import {AbstractControl, FormArray, FormControl} from '../src/model';
import {Bar} from './interfaces';

let barArray: FormArray<FormControl<Bar>> = new FormArray([new FormControl<Bar>({prop: ""}), new FormControl<Bar>(undefined)]);
let barsControll: AbstractControl<Bar[]> = barArray;
