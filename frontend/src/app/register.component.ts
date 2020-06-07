import { Component } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styles: [`
        .error{
            background-color: #fff0f0
        }
    `]
})
export class RegisterComponent { 
    form;

    constructor(private fb: FormBuilder){
        this.form = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, emailValid()]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: matchingFields('password', 'confirmPassword')
        })
    }

    onSubmit(){
        console.log(this.form.errors);
    }

    isValid(control){
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }
}

function matchingFields(fieldOne, fieldTwo){
    return form => {
        if(form.controls[fieldOne].value !== form.controls[fieldTwo].value){
            return { mismatchedFields: true };
        }
    }
}

function emailValid(){
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return regex.test(control.value) ? null : { invalidEmail:true }
    }
}
