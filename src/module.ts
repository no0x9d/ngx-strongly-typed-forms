import {NgModule} from '@angular/core';
import {FormBuilder} from './model';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  providers: [FormBuilder],
  exports: [ReactiveFormsModule]
})
export class NgxStronglyTypedFormsModule {
}
