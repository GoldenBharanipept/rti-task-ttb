import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService, employeeDetail } from '../common.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent {
  public selectedEmployeeDetails!: employeeDetail;
  public registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
  })
  public minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  public employeeList: any = [];
  constructor(private modalService: NgbModal, private toastr: ToastrService, private commonService: CommonService) {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.commonService.getAllDataFromDB('employeeDetails').subscribe((data: any) => {
      this.employeeList = data;
    })
  }

  openModal(modal: any, type: string, item?: employeeDetail) {
    if (type == 'add') {
      this.selectedEmployeeDetails = {} as employeeDetail;
      this.registerForm.reset();
    } else {
      this.registerForm.patchValue({
        name: item!.name,
        role: item!.role,
        fromDate: item!.fromDate,
        toDate: item!.toDate,
      })
      this.selectedEmployeeDetails = item!;
    }
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: true })
  }

  employeeAction(registerForm: FormGroup, type: String, id?: number) {
    if (!registerForm.valid && type == 'add' && type == 'update') {
      this.toastr.warning('Please fill all the required fields*');
      registerForm.markAsTouched();
      return
    }
    if (type == 'add') {
      if (new Date(registerForm.value.toDate).getTime() <= new Date(registerForm.value.fromDate).getTime()) {
        this.toastr.warning('Selected To Date should be greater than From Date');
        return;
      }
      const setObj = {
        'id': (this.employeeList.length > 0) ? this.employeeList[this.employeeList.length - 1].id + 1 : 1,
        ...registerForm.value
      }
      this.commonService.addDataToDB(setObj, 'employeeDetails');
      this.modalService.dismissAll();
    } else if (type == 'update') {
      if (new Date(registerForm.value.toDate).getTime() <= new Date(registerForm.value.fromDate).getTime()) {
        this.toastr.warning('Selected From Date should be greater then To Date');
        return;
      }
      const setObj = {
        'id': this.selectedEmployeeDetails.id,
        ...registerForm.value
      }
      this.commonService.updateDataToDB(setObj, 'employeeDetails');
      this.modalService.dismissAll();
    } else {
      this.commonService.deleteDataFromDB(id!, 'employeeDetails');
    }
    this.getEmployeeList();
  }
}