import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getAllAdsByStatus(): Observable<any>{
    return this.http.get(BASIC_URL + `api/client/ads`, {
      headers : this.createAuthorizationHeader()
    })
  }

  
  getUserInfoById(userId:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/client/profile/${userId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  getUserPassword(userId:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/client/profile/${userId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  updateUserInfo(userId:any, userDTO:any): Observable<any>{
    return this.http.put(BASIC_URL + `api/client/profile/${userId}`, userDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  searchAdByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/client/search/${name}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  getAllAdsHomePageByStatus(): Observable<any> {
    return this.http.get(BASIC_URL + `api/home`);
  }

  searchAdByNameHomePage(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/ads/search?name=${name}`);
  }

  getAdDetailsByAdIdHome(adId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/home-detailedAd/${adId}`);
  }

  updatePersonalInfo(userId: any, personalInfo: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/client/profile/personal-info/${userId}`, personalInfo, {
      headers: this.createAuthorizationHeader()
    });
  }

  changePassword(userId: any, passwordInfo: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/client/profile/change-password/${userId}`, passwordInfo, {
      headers: this.createAuthorizationHeader()
    });
  }


  getAdDetailsByAdId(adId:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/client/ad/${adId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  bookService(bookDTO:any): Observable<any>{
    console.log(bookDTO)
    return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  getMyBookings(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  giveReview(reviewDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }
}
