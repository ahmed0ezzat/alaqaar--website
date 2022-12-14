import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseURL = environment.baseUrl
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  private AsyncClient(url: string, method: string, params: any = null, body: any = null, headers: any = {}): Observable<any> {
    let paramsData: any = undefined
    let bodyData: any = undefined
    paramsData = {
      params: undefined,
      headers: undefined
    }
    if (params && params !== null) {
      paramsData.params = params
    }
    if (body && body !== null) {
      bodyData = {
        body
      }
    }
    if (Object.keys(headers).length > 0) {
      paramsData.headers = new HttpHeaders(headers)
    }
    if (method === 'GET') {
      return this.httpClient.get(url, paramsData).pipe(
        map((response: any) => {
          return response;
        }), catchError(err => {
          return of(false)
        })
      );
    }
    if (method === 'POST') {
      return this.httpClient.post(url, bodyData !== undefined ? bodyData : null).pipe(
        map((response: any) => {
          return response;
        }), catchError(err => {
          return of(false)
        })
      );

    }
    return of(false)
  }

  private async SyncClient(url: string, method: string, params: any = null, body: any = null, headers: any = {}): Promise<any> {
    let paramsData: any = undefined
    let bodyData: any = undefined
    paramsData = {
      params: undefined,
      headers: new HttpHeaders()
    }
    if (params && params !== null) {
      paramsData.params = params
    }
    if (body && body !== null) {
      bodyData = {
        body
      }
    }
    if (Object.keys(headers).length > 0) {
      for (const key in headers) {
        paramsData.headers.append(key, headers[key])
      }
    }
    return new Promise((resolve) => {
      if (method === 'GET') {
        this.httpClient.get(url, paramsData !== undefined ? paramsData : null).subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: () => { resolve(false) }
        })
      }
      if (method === 'POST') {
        this.httpClient.post(url, body !== undefined ? body : null).subscribe({
          next: (data: any) => {
            resolve(data);
          },
          error: () => { resolve(false) }
        })

      }
    })
  }

  public async login(phone: string): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/login`, 'POST', null, { phone })
  }

  public async register(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/registration`, 'POST', null, data)
  }
  public async resendOtp(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/resendotp`, 'POST', null, data)
  }
  public async verifyOtp(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/verfiyOtp`, 'POST', null, data)
  }
  public async logout(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/logout`, 'POST', null, data)
  }

  public async getCriteria(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/criteria_parent`, 'GET', data, null)
  }
  public async getCriteriaForSeller(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/criteria_parent_for_seller`, 'GET', data, null)
  }

  public async getCriteriaForBuyer(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/criteria_for_buyer`, 'GET', data, null)
  }
  public async getAllCriteria(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/criteria`, 'GET', data, null)
  }

  public async getImageTags(): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}/api/image_tags`, 'GET')
  }

  public async addUnit(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/addunit`, 'POST', null, data)
  }
  public async getMyUnits(body:any = {}): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/my-units`, 'POST', null, body)
  }
  public async getInquiry(body:any = {}): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/my-inquiries`, 'POST', null, body)
  }
  public async getSingleUnit(id: string): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/my-unit/${id}`, 'GET', null, null)
  }
  public async getPublicUnit(id: string): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/unit/${id}`, 'GET', null, null)
  }
  public async editUnit(id: string): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/edit-unit/${id}`, 'GET', null, null)
  }
  public async updateUnit(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/updateunit`, 'POST', null, data)
  }
  public async getCriteriaParents(data: any): Promise<any> {
    return await this.SyncClient(`${this.BaseURL}api/criteria_parent`, 'GET', data, null)
  }
  public getRecentlyAdded(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/units-last-added`, 'POST', null, data)
  }
  public addToFavorite(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/favorite-add`, 'POST', null, data)
  }
  public removeFromFavorite(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/favorite-remove`, 'POST', null, data)
  }
  public addInquiry(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/addinquiry`, 'POST', null, data)
  }
  public inquiryResult(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/inquiry-results`, 'POST', null, data)
  }
  public requestVisit(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/request-visit`, 'POST', null, data)
  }
  public myVisits(): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/my-visits`, 'POST', null, null)
  }
  public rescheduleVisits(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/resceduale-visit`, 'POST', null, data)
  }

  public updateProfile(data: any): Promise<any>  {
    return this.SyncClient(`${this.BaseURL}api/update-profile`, 'POST' , null, data)
  }

  public keepInTouch(data: any): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/keep-in-touch`, 'POST', null, data)
  }

  public termsAndConditions(): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/content/terms`, 'GET', null, null)
  }

  public PrivacyPolicy(): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/content/privacy`, 'GET', null, null)
  }
  public myFavorites(): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/my-favorites`, 'GET', null, null)
  }
  public getPriorities(): Promise<any> {
    return this.SyncClient(`${this.BaseURL}api/periorities`, 'GET', null, null)
  }
  public getGeographical() {
    return this.SyncClient(`${this.BaseURL}api/geographical`, 'GET')
  }
  public getContacts() {
    return this.SyncClient(`${this.BaseURL}api/content/contact`, 'GET')
  }
  public getSingleBlogs(id: any) {
    return this.AsyncClient(`${this.BaseURL}api/blog/${id}`, 'GET' , null, null)
  }
  public getHomeAbout() {
    return this.AsyncClient(`${this.BaseURL}api/content/home_about`, 'GET')
  }
  public getBlogs(data: any = {}) {
    return this.AsyncClient(`${this.BaseURL}api/blogs`, 'POST' , null, data)
  }
  public getHowItWorks() {
    return this.AsyncClient(`${this.BaseURL}api/content/how_it_works`, 'GET')
  }
  public getFooterContact() {
    return this.AsyncClient(`${this.BaseURL}api/content/footer_contact`, 'GET')
  }

  public getFooterAboutUsHome() {
    return this.AsyncClient(`${this.BaseURL}api/content/home_about`, 'GET')
  }

  public aboutUs() {
    return this.AsyncClient(`${this.BaseURL}api/content/about`, 'GET')
  }
  public getUnitTypes() {
    return this.AsyncClient(`${this.BaseURL}api/unit_types`, 'GET')
  }

  public getMyNotifications() {
    return this.AsyncClient(`${this.BaseURL}api/my-notifications`, 'GET')
  }
  public notificationsMarkAsRead(id: any) {
    return this.AsyncClient(`${this.BaseURL}api/notifications-mark-as-read/${id}`, 'GET')
  }

  public notificationsUpdateUnit(id: any) {
    return this.AsyncClient(`${this.BaseURL}api/update-unit-request/${id}`, 'GET')
  }

  public notificationsDeleteUnit(id: any) {
    return this.AsyncClient(`${this.BaseURL}api/delete-unit/${id}`, 'GET')
  }

  


  // public login() {
  //   return this.AsyncClient(`${this.BaseURL}api/unit_types`, 'GET')
  // }
}
