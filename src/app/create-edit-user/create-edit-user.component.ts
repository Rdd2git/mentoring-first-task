import { Component, Inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import User from '../types/user';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.sass'],
})
export class CreateEditUserComponent {
  user: User[] = [];
  @Output() userCreated = new EventEmitter<User>();
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const userData = this.data?.user || {};
    this.userForm = this.fb.group({
      name: [userData.name || '', Validators.required],
      email: [userData.email || '', Validators.required],
      phone: [userData.phone || '', Validators.required],
      website: [userData.website || '', Validators.required],
    });
  }

  onClick(user: User) {
    let data = this.data;
    this.userCreated.emit(user);
    this.dialogRef.close({ user, data });
  }
}
