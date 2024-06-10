import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../client/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ads: any = [];
  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  getAllAdsHomePagebyStatus() {
    this.clientService.getAllAdsHomePageByStatus().subscribe(
      res => {
        this.ads = res;
      },
      error => {
        console.error('Error fetching ads', error);
      }
    );
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    });
    this.getAllAdsHomePagebyStatus();
  }

  searchAdByNameHomePage() {
    this.clientService.searchAdByNameHomePage(this.validateForm.get(['service']).value).subscribe(
      res => {
        this.ads = res;
      },
      error => {
        console.error('Error searching ads', error);
      }
    );
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
}
