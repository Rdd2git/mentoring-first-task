import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import User from 'src/app/types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    let data = this.http.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    return data;
  }
}
