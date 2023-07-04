import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isInitiateLoader = new BehaviorSubject(false);
  constructor(private dbService: NgxIndexedDBService, private toastr: ToastrService) { }

  addDataToDB(data: employeeDetail, tableName: string) {
    this.dbService
      .add(tableName, data)
      .subscribe((key) => {
        this.toastr.success("Added successfully");
        console.log('key: ', key);
      });
  }

  updateDataToDB(data: employeeDetail, tableName: string) {
    this.dbService
      .update(tableName, data)
      .subscribe((storeData) => {
        this.toastr.success("Updated successfully");
      });
  }

  getAllDataFromDB(tableName: string) {
    return this.dbService.getAll(tableName)
  }

  deleteDataFromDB(id: number, tableName: string) {
    this.dbService.delete(tableName, id).subscribe((data) => {
      console.log('all:', data);
      this.toastr.success("Deleted successfully");
    });
  }
}

export interface employeeDetail {
  id: number,
  name: string;
  role: string;
  fromDate: string;
  toDate: string;
}
