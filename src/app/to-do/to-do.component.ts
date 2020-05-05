import { Component, OnInit } from '@angular/core';
import { ToDoService } from './shared/to-do.service';



@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [ToDoService]
})
export class ToDoComponent implements OnInit {
  constructor(private toDoService: ToDoService) { }
  toDoListArray: any[];

  task = ' ';
  errorMessage = '';
  confirmMessage = '';

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        // tslint:disable-next-line:no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line:no-string-literal
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });

        // sort array IsChecked false -> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });

      });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }

 shuffleArray(toDoListArray) {
   if ( this.alterCheck) {
    for (let i = toDoListArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toDoListArray[i], toDoListArray[j]] = [toDoListArray[j], toDoListArray[i]];
    }
  }
}



}
