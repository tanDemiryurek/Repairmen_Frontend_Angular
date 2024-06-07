import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getPendingAds(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/ads?status=PENDING`, { headers });
  }

  approveAd(adId: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/approve-ad/${adId}`, {}, { headers });
  }

  rejectAd(adId: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}/reject-ad/${adId}`, {}, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    return headers.set('Authorization', `Bearer ${UserStorageService.getToken()}`);
  }
}
