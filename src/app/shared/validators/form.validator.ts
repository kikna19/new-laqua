import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

export class FormValidator extends Validators {
  static override required = (control: AbstractControl): ValidationErrors | null => {
    return super.required(control) ? {req: ''} : null
  }

  static override minLength = (length: number) => {
    return (control: AbstractControl): ValidationErrors | null =>
      super.minLength(length)(control) ? {min: `minlength is ${length}`} : null
  }

  static override maxLength = (length: number) => {
    return (control: AbstractControl): ValidationErrors | null =>
      super.maxLength(length)(control) ? {max: `maxlength is ${length}`} : null
  }

  static override pattern = (mobileExp: RegExp) => {
    return (control: AbstractControl): ValidationErrors | null =>
      super.pattern(mobileExp)(control) ? {regex: 'incorrect pattern'} : null
  }
}
