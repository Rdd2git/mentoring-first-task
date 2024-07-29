import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import User from 'src/app/types/user';
import { BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api-service.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private usersApiService: UsersApiService
  ) {}

  setUsers(data: User[]): void {
    this.usersSubject.next(data);
  }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe((data: User[]) => {
      this.setUsers(data);
    });
  }

  randomID() {
    return Math.floor(Math.random() * 100);
  }

  saveUsers(data: any) {
    let users = this.usersSubject.value;
    let id = this.randomID();

    // Проверяем, существует ли уже пользователь с таким ID
    while (users.some((u) => u.id === id)) {
      id = this.randomID();
    }

    data.id = id;
    users = [...users, data];
    this.usersSubject.next(users);
    this.localStorageService.setItem('users', users);
  }
  editUser(user: User, id: number) {
    let users = this.usersSubject.value;

    // Находим индекс пользователя, которого нужно обновить
    const index = users.findIndex((u) => u.id === id);

    if (index !== -1) {
      // Обновляем пользователя в массиве
      users[index] = { ...user, id }; // Объединяем текущего пользователя с новыми данными

      // Обновляем BehaviorSubject с новым массивом пользователей
      this.usersSubject.next([...users]);
    } else {
      console.error('Пользователь с указанным id не найден');
    }
  }

  deleteUser(id: number) {
    this.usersSubject.next(
      this.usersSubject.value.filter((user) => user.id !== id)
    );
  }
}
