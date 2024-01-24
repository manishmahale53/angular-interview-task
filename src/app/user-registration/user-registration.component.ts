import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


export interface Tags {
  name: string;
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {


  reader = new FileReader();

  readImage() {
    // this.reader.readAsDataURL()
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tags[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Tags): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Tags, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }


  constructor(private fb: FormBuilder, private service: DataService, private router: Router) {

  }

  fileToUpload: any = null;
  imageUrl: string  = ''


  handleFileInput(files: any){
    console.log(files.target.files.item(0))
     this.fileToUpload = files.target.files.item(0)

     const reader = new FileReader();
     reader.onload = (event: any) => {
      console.log(event)
      this.imageUrl = event.target.result
    }
     reader.readAsDataURL(this.fileToUpload)
     this.userForm.patchValue({image: this.imageUrl})
  }



  onTypeChange(event: any) {
    // reset the other fields when the type changes
    this.userForm.patchValue({
      homeAddress1: '',
      homeAddress2: '',
      companyAddress1: '',
      companyAddress2: ''
    });
  }


  userForm: FormGroup = this.fb.group({
    image: [''],
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]{1,20}$')]],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
    age: ['40', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    address: this.fb.group({
      type: ['', Validators.required],
      homeAddress1: ['', Validators.required],
      homeAddress2: [],
      companyAddress1: [''],
      companyAddress2: []
    }, {Validators : this.addressValidator}),
    tags: ['', Validators.required],
  })

  addressValidator(userForm: FormGroup){
    const type = userForm.get('type')?.value
    const homeAddress1 = userForm.get('homeAddress1');
    const companyAddress1 = userForm.get('companyAddress1');

    if(type === 'home'){
      homeAddress1?.setValidators(Validators.required)
      companyAddress1?.clearValidators();
    }else if(type === 'company'){
      companyAddress1?.setValidators(Validators.required)
      homeAddress1?.clearValidators();
    }

    homeAddress1?.updateValueAndValidity();
    companyAddress1?.updateValueAndValidity();
  }

  submitForm() {
    console.log(this.userForm)
    this.service.addUser(this.userForm.value).subscribe((res) => {
      if (res) {
        console.log('User Added')
      }
    })
    this.router.navigate(['/user-profile'])
  }

  validateFormFields(formControl: string) {
    return this.userForm.get(formControl)?.invalid
  }
}









