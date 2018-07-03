import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormBuilder} from './model';

@NgModule()
export class NgxStronglyTypedFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxStronglyTypedFormsModule,
      providers: [FormBuilder]
    }
  }
}
