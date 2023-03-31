import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  addUser(postData: any) {
    return this.http.post('http://localhost:3000/user', postData);
    // .subscribe((result: any) => {
    //   localStorage.setItem('token', result.token);
    // });
  }

  // getUser(data:any) {
  //   return this.http.post<any>('http://localhost:3000/user',data).
  //   pipe(map((res:any)=>{return res;}));
  // }

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/user');
  }
}
