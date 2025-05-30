import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppServiceService } from '../../../services/app-service.service'
import { faUser, faEllipsisV, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  faUSer = faUser
  faSignOutAlt = faSignOutAlt
  faEllipsisV = faEllipsisV
  faEdit = faEdit
  faHeart = faHeart
  isMenuCollapsed: boolean = true
  isLoggedIn: boolean = false
  BaseUrl = environment.baseUrl
  haveNotifications: boolean = false
  avatarUrl: any
  constructor(
    private appServiceService: AppServiceService,
    private router: Router,
    private cookieService: CookieService,
    public modalService: NgbModal,
    private apiService: ApiService,
    private notificationsService: NotificationsService) {
    const currentLang = localStorage.getItem('lang')
    if (currentLang) {
      const selectedLng = this.allLangs.filter(lang => lang.title == currentLang)
      if (selectedLng && selectedLng.length > 0) {
        this.activeLang = selectedLng
        this.activeLang = this.activeLang[0]
        this.langList = this.allLangs.filter(lang => lang.title != currentLang)
        this.switchLang(String(this.activeLang.title).toLowerCase())
      } else {
        this.activeLang = this.allLangs.filter(lang => lang.title == 'EN')
        this.activeLang = this.activeLang[0]
        this.langList = this.allLangs.filter(lang => lang.title != 'EN')
        this.switchLang('en')
      }
    } else {
      // RESET LANGUAGE TO BE (EN)
      localStorage.setItem('lang', 'EN')
      let defaultLang: string = 'EN'
      this.activeLang = this.allLangs.filter(lang => lang.title == defaultLang)
      this.activeLang = this.activeLang[0]
      this.langList = this.allLangs.filter(lang => lang.title != defaultLang)
      this.switchLang(defaultLang.toLocaleLowerCase())
    }
    this.sub2 = this.appServiceService.isLoggedIn$.subscribe(val => {
      const user = this.cookieService.get('user')
      if (user) {
        this.isLoggedIn = true
        this.getMyNotifications()
        this.userData = JSON.parse(user)
        this.avatarUrl = localStorage.getItem('avatarsPath')
      }

    })
  }
  sub1 = new Subscription()
  sub2 = new Subscription()
  userData: any
  allLangs = [
    {
      title: 'EN',
      flagURL: 'https://img.icons8.com/color/20/000000/british-movies.png'
    },
    {
      title: 'AR',
      flagURL: 'https://img.icons8.com/color/20/000000/spain-2.png'
    },
  ]
  activeLang: any = {}
  langList: any = []


  ngOnInit(): void {
  }
  setAvatarUrl() {
    return this.avatarUrl ? this.avatarUrl : '../../../../assets/images/Ellipse 1264.png'
  }
  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  switchLang(val: string) {
    localStorage.setItem('lang', val.toUpperCase())
    return this.appServiceService.lang$.next(val)
  }
  selectedLang(val: any) {
    this.activeLang = this.allLangs.filter(lang => lang.title == val.title)
    this.activeLang = this.activeLang[0]
    this.langList = this.allLangs.filter(lang => lang.title != val.title)
    this.switchLang(String(val.title).toLowerCase())
  }
  navigateToLogin() {
    this.router.navigate(['/login'])
  }
  navigateToNotifications() {
    this.router.navigate(['/notifications'])
  }
  navigateToUnits() {
    this.router.navigate(['/units'])
  }
  navigateToVisits() {
    this.router.navigate(['/visits'])
  }
  showConfirmModel(content: any) {
    this.modalService.open(content);
  }
  async logout() {
    this.modalService.dismissAll()
    let userID = { 'user_id': JSON.parse(this.cookieService.get('user')).id }
    const logout = await this.apiService.logout(userID)
    // if (logout === false ){}
    this.cookieService.delete('user')
    this.cookieService.delete('token')
    localStorage.removeItem('avatarsPath')
    this.appServiceService.isLoggedIn$.next(false)
    this.userData = undefined
    this.isLoggedIn = false
    this.notificationsService.showSuccess('Success logout!')
    this.router.navigate(['/home'])
  }
  navigateToEditProfile() {
    this.router.navigate(['/edit-profile'])
  }
  navigateToFavorites() {
    this.router.navigate(['/favorites'])
  }
  getMyNotifications() {
    this.apiService.getMyNotifications().subscribe(data => {
      let myNotifications = data.data
      if (data.data && data.data.length > 0) {
        myNotifications = data.data.filter((val: any) => val.read_at === null || val.read_at === undefined)
      }
      if (myNotifications.length > 0) {
        this.appServiceService.myNotifications$.next(myNotifications)
        return this.haveNotifications = true
      }
      return this.haveNotifications = false
    })
  }

}
