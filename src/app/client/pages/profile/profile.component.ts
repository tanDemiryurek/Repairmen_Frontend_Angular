import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EyeInvisibleOutline, EyeOutline } from '@ant-design/icons-angular/icons';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId: any = this.activatedroute.snapshot.params['id'];

  personalInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  oldPasswordVisible = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;
  passwordStrength: string;

  constructor(
    private fb: FormBuilder, 
    private iconService: NzIconService,
    private clientService: ClientService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private notification: NzNotificationService
  ) {
    this.iconService.addIcon(...[EyeOutline, EyeInvisibleOutline]);
  }

  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    this.getUserInfoById();
  }

  
  getUserInfoById() {
    this.clientService.getUserInfoById(this.userId).subscribe(res => {
      console.log(res);
      this.personalInfoForm.patchValue(res);
    });
  }

  updateUserInfo(){
    const formData: FormData = new FormData();

    formData.append('name', this.personalInfoForm.get('name').value);
    formData.append('lastname', this.personalInfoForm.get('lastname').value);
    formData.append('email', this.personalInfoForm.get('email').value);
    formData.append('phone', this.personalInfoForm.get('phone').value);

    this.clientService.updateUserInfo(this.userId, formData).subscribe(res =>{
      this.notification.success(
        'BAŞARILI',
        'Profiliniz BAŞARIYLA GÜNCELLENDİ!',
        { nzDuration: 5000}
      );
      this.router.navigateByUrl('/client/dashboard');
    }, error =>{
      this.notification.error(
        'HATA',
        'Profiliniz Güncellenemedi',
        { nzDuration: 5000}
      )
    })
  }

  onSubmitChangePassword(): void {

    const formData: FormData = new FormData();
    console.log(this.changePasswordForm)
    formData.append('oldPassword', this.changePasswordForm.get('oldPassword').value);
    formData.append('newPassword', this.changePasswordForm.get('newPassword').value);
    formData.append('confirmNewPassword', this.changePasswordForm.get('confirmNewPassword').value);

    this.clientService.changePassword(this.userId, this.changePasswordForm.get('oldPassword').value,this.changePasswordForm.get('newPassword').value)
    .subscribe(res =>{
      this.notification.success(
        'BAŞARILI',
        'Şifreniz BAŞARIYLA GÜNCELLENDİ!',
        { nzDuration: 5000}
      );
      this.router.navigateByUrl('/client/dashboard');
    }, error =>{
      this.notification.error(
        'HATA',
        'Şifreniz Güncellenemedi',
        { nzDuration: 5000}
      )
    })
  }

  toggleOldPasswordVisibility(): void {
    this.oldPasswordVisible = !this.oldPasswordVisible;
  }

  toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  passwordMatchValidator(form: FormGroup): null | object {
    return form.get('newPassword').value === form.get('confirmNewPassword').value
      ? null : { mismatch: true };
  }

  checkPasswordStrength(): void {
    const password = this.changePasswordForm.get('newPassword').value;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
      this.passwordStrength = 'Strong';
    } else if (password.length >= 6) {
      this.passwordStrength = 'Medium';
    } else {
      this.passwordStrength = 'Weak';
    }
  }
}
