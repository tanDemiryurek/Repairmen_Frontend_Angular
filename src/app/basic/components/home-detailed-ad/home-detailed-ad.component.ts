import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../client/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-home-detailed-ad',
  templateUrl: './home-detailed-ad.component.html',
  styleUrls: ['./home-detailed-ad.component.scss']
})
export class HomeDetailedAdComponent implements OnInit {

  adId: string | null = null;
  avatarURL: any;
  ad: any;
  reviews: any;
  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedroute: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.adId = this.activatedroute.snapshot.paramMap.get('adId');
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]]
    });

    if (this.adId) {
      this.getAdDetailsByAdIdHome();
    } else {
      // Handle the case where adId is not available
      this.notification.error(
        'Error',
        'Ad ID is not available',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/home'); // Redirect to home or another appropriate page
    }
  }

  getAdDetailsByAdIdHome() {
    this.clientService.getAdDetailsByAdIdHome(this.adId!).subscribe(res => {
      console.log(res);
      this.avatarURL = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
      this.reviews = res.reviewDTOList;
    }, error => {
      this.notification.error(
        'Error',
        'Unable to load ad details',
        { nzDuration: 5000 }
      );
    });
  }

  bookService() {
    const bookServiceDTO = {
      bookDate: this.validateForm.get(['bookDate']).value,
      adId: this.adId,
      userId: UserStorageService.getUserId(),
    };

    this.clientService.bookService(bookServiceDTO).subscribe(res => {
      this.notification.success(
        'BAŞARILI',
        'Rezervasyon İsteğiniz Alınmıştır',
        { nzDuration: 5000 }
      );
    }, error => {
      this.notification.error(
        'HATA',
        'Lütfen Giriş Yapınız',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/login');
    });
  }
}
