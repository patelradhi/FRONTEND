//as it is,nothing changed

import { Injectable ,PLATFORM_ID, Inject} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulating authentication status with a BehaviorSubject
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    if(isPlatformBrowser(this.platformId)){
        //code that use localstorage
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            // Here you can check the actual authentication status (e.g., from localStorage) and update the BehaviorSubject accordingly
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
  }

  // Method to get the current authentication status
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Method to set the authentication status
  setAuthStatus(isAuthenticated: boolean): void {
    // Here you can update the actual authentication status (e.g., in localStorage)
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  logout(): void {
    localStorage.removeItem('access-token'); // Remove token from localStorage
    this.setAuthStatus(false); // Set authentication status to false
  }
}
