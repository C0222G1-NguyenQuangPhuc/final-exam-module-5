import {Component, OnInit} from '@angular/core';
import {Bus} from '../../bus';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TicketService} from '../../service/ticket.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  busList: Bus[] = [];

  formAddNew: FormGroup = new FormGroup({
    destination: new FormControl('', Validators.required),
    arrive: new FormControl('', Validators.required),
    bus: new FormGroup({
      busId: new FormControl('', Validators.required),
    }),
    dayStart: new FormControl('', Validators.required),
    timeStart: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(private ticketService: TicketService,
              private toasrt: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBusList();
  }

  getBusList() {
    this.ticketService.getBusList().subscribe(busList => {
      this.busList = busList;
    });
  }

  create() {
    console.log(this.formAddNew.value);

    this.ticketService.create(this.formAddNew.value).subscribe(
      value => {
        console.log(value);
        console.log('success');
        this.formAddNew.reset();
        this.router.navigateByUrl('/ticket');
        this.toasrt.success('Tạo mới thành công');
      },
      error => {
        console.log(error);
        this.toasrt.error('Tạo mới không thành công');
      });
  }
}
