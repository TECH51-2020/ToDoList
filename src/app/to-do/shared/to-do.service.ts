import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  name = ' ';
  errorMessage = '';

  submit() {
    const commaIndex = this.name.indexOf(', ');
    let error = false;


    if (this.name === '') {
      this.errorMessage = 'Name must not be empty!';
      error = true;
    } else if (commaIndex === -1) {
      this.errorMessage = 'You must include a Comma!';
      error = true;
    }
  }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  addTitle(title: string) {
    this.toDoList.push({
      title,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag});
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}
