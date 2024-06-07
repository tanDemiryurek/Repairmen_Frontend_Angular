import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  pendingAds: any[] = [];

  constructor(
    private adminService: AdminService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.fetchPendingAds();
  }

  fetchPendingAds(): void {
    this.adminService.getPendingAds().subscribe(
      (res) => {
        this.pendingAds = res;
      },
      (error) => {
        this.notification.error('Error', 'Unable to load pending ads', { nzDuration: 5000 });
      }
    );
  }

  approveAd(adId: number): void {
    this.adminService.approveAd(adId).subscribe(
      () => {
        this.notification.success('Success', 'Ad approved successfully');
        this.fetchPendingAds();
      },
      (error) => {
        this.notification.error('Error', 'Failed to approve ad');
      }
    );
  }

  rejectAd(adId: number): void {
    this.adminService.rejectAd(adId).subscribe(
      () => {
        this.notification.success('Success', 'Ad rejected successfully');
        this.fetchPendingAds();
      },
      (error) => {
        this.notification.error('Error', 'Failed to reject ad');
      }
    );
  }
}
