import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { UsersService } from 'src/app/component/service/users-service.service';
import { LocalStorageService } from '../service/local-storage.service';
import { UsersApiService } from 'src/app/component/service/users-api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from 'src/app/create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;

  constructor(
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const item = this.localStorageService.getItem();
    if (item) {
      console.log(item + '11');
      this.usersService.setUsers(JSON.parse(item));
    } else {
      this.usersService.loadUsers();
      this.users$
        .pipe(
          tap((users) => JSON.stringify(users)) // Преобразование данных в строку
        )
        .subscribe({
          next: (value) => {
            console.log(`Received value: `, value);
            this.localStorageService.setItem('users', value);
          },
        });
    }
  }
  onEdit(user?: any) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '400px',
      data: { user: user || {}, isEdit: !!user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.user) {
        if (result.data.isEdit) {
          this.usersService.editUser(result.user, result.data.user.id);
          console.log(result.data, 'user updated');
        } else {
          this.usersService.saveUsers(result.user);
          console.log(result.data);
          console.log('New user created');
        }
      }
    });
  }

  onDelete(id: number) {
    this.usersService.deleteUser(id);
  }
}
