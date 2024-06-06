import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})
export class AllAdsComponent {

  ads:any;

  constructor(private companyService: CompanyService,
    private notificaiton: NzNotificationService
  ) {}

  ngOnInit(){
    this.getAllAdsByUserId();
  }

  getAllAdsByUserId(){
    this.companyService.getAllAdsByUserId().subscribe(res =>{
      this.ads = res;
    })
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

  deletedAd(adId:any) {
    this.companyService.deleteAd(adId).subscribe(res=>{
      this.notificaiton.success(
        'BAŞARILI',
        'Hizmet Silinmiştir'
      );
      this.getAllAdsByUserId();
    })
  }
}
