import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent {

  bookings:any;

  constructor(
    private companyService: CompanyService,
    private notification: NzNotificationService,
  ){}


  ngOnInit(){
    this.getAllAdBookings();
  }

  getAllAdBookings(){
    this.companyService.getAllAdBookings().subscribe(res =>{
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingID: number, status:string){
    this.companyService.changeBookingStatus(bookingID, status).subscribe(res =>{
      this.notification.success(
        'BAŞARILI',
        'REZERVASYON DURUMU DEĞİŞTİ',
        {nzDuration: 5000}
      )
    }, error =>{
      this.notification.error(
        'HATA',
        `${error.message}`,
        {nzDuration: 5000}
      )

    })
  }
}
