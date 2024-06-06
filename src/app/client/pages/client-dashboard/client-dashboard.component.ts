import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { serialize } from 'v8';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent{

  ads: any = [];
  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ){}

  getAllAds(){
    this.clientService.getAllAds().subscribe(res=>{
      this.ads = res;
    })
  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    })
    this.getAllAds();    
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res =>{
      this.ads = res;
    })
  }

  updateImg(img){
    return 'data:image/jpeg;base64,'+img;
  }

}
