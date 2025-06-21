import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  saveMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['965', Validators.required],
      phone: ['', Validators.required],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.profileForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        email: this.user.email || '',
        phoneCode: this.user.phoneCode || '965',
        phone: this.user.phone || ''
      });
    }
  }

  onSave() {
    if (this.profileForm.invalid) {
      return;
    }

    // Update user data in localStorage
    const updatedUser = { ...this.user, ...this.profileForm.value };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.user = updatedUser; // Update the component's user object

    // Show success message
    this.saveMessage = 'Profile saved successfully!';
    setTimeout(() => {
      this.saveMessage = null;
    }, 3000); // Hide message after 3 seconds
  }
}
