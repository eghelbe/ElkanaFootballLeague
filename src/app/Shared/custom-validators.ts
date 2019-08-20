import { AbstractControl, ValidatorFn } from '@angular/forms';

  //Validator function for Select validation
export function selectRequiredValidator(forbiddenSelect: RegExp): ValidatorFn {
  return (control: AbstractControl) :{[key: string]: any} | null => {
    const forbidden = forbiddenSelect.test(control.value);
    return forbidden ? { 'forbiddenSelect': {value: true}} : null;
  }
}

export function teamsMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const TeamA = control.get('TeamA');
  const TeamB = control.get('TeamB');
  return TeamA && TeamB && TeamA.value == TeamB.value || TeamA.value == null || TeamB.value == null ?
  { 'match': true } : null;
}

export function positiveNumberValidator(control: AbstractControl): {[key: string]: boolean} | null {
  if (Number(control.value) < 0) {
    return {'negativeNumber': true};
  } else {
    return null;
  }
}

export function hourValidator(control: AbstractControl): {[key: string]: boolean} | null {
  if (Number(control.value) < 0 || Number(control.value) > 23) {
    return {'invalidHour': true};
  } else {
    return null;
  }
}

export function minuteValidator(control: AbstractControl): {[key: string]: boolean} | null {
  if (Number(control.value) < 0 || Number(control.value) > 59) {
    return {'invalidMinute': true};
  } else {
    return null;
  }
}