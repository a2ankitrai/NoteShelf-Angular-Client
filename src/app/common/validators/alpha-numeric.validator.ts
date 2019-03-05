import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

// custom validator to check that two fields match
export function AlphaNumericValidator(control: AbstractControl): { [key: string]: boolean } | null {

    if (!isAlphaNumeric(control.value)) {
        return { 'alphaNumeric': true };
    }
    return null;
}


function isAlphaNumeric(str: string) {
    let code: any, i: any, len: number;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
}
