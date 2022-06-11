import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../service/bill.service';
import { Bill } from '../model/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  username: String = '';
  bills: Bill[] = [];
  bill: Bill = new Bill(0,"",0,0,0,"");
  viewList: boolean = true;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];

      let sesionUser = localStorage.getItem('username');
      if(sesionUser == this.username){
          this.list();
      }
      else {
        this.router.navigate(['/']); 
      }
    });
    
  }

  list() {
    this.billService.getBills(this.username).subscribe(
        (bills: Bill[]) => {
          this.bills = bills;
        }
    );
  }

  detail(bill: Bill){
    this.viewList = false;
    this.bill = bill;
  }

  close(){
    this.bill = new Bill(0,"",0,0,0,"");
    this.viewList = true;
  }

  delete(){
    console.log(this.bill);
    this.billService.deleteBill(this.bill).subscribe(
      (bills: Bill) => {
        this.list();
        this.viewList = true;
      }
  );
  }

}

@Component({
  selector: 'app-bill',
  templateUrl: './bill-new.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponentNew implements OnInit {

  username: String = '';
  form: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
  });
  malFormato: boolean = false;
  bill: Bill = new Bill(0,"",0,0,0,"");

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private billService: BillService,
    private formBuilder: FormBuilder,
  ) { 

    
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
  });
  }

  ngOnInit(): void {
    let sesionUser = localStorage.getItem('username');
    if(sesionUser !== this.username){
      this.router.navigate(['/']); 
    }
  }

  validate(event: Event) {
    
    this.malFormato = false;
    event.preventDefault();
    if(this.form.valid) {
      this.bill.observation = this.form.value.description;
      this.bill.value = this.form.value.value;
      this.bill.user_id = 1;
      this.bill.type = this.form.value.type;

      this.billService.saveBill(this.bill).subscribe(
        (bill: Bill) => {
          this.router.navigate(['/bill/list/' + this.username]);   
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.malFormato = true;
    }
  } 
}