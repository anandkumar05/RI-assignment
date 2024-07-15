import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notOnlyWhitespace(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.trim() === '') {
      return { 'notOnlyWhitespace': true };
    }
    return null;
  };
}

export function noNumbersOrSpecialChars(): ValidatorFn {
  const pattern = /^[A-Za-z\s]+$/; // Only allows letters and spaces

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && !pattern.test(value)) {
      return { 'noNumbersOrSpecialChars': true };
    }

    return null;
  };
}