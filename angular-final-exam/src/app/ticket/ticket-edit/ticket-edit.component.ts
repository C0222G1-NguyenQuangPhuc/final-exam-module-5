import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../service/ticket.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bus} from '../../bus';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  formEdit: FormGroup = new FormGroup({
    ticketId: new FormControl(),
    destination: new FormControl(''),
    arrive: new FormControl('', [Validators.required]),
    dayStart: new FormControl('', [Validators.required]),
    timeStart: new FormControl('', [Validators.required]),
    bus: new FormGroup({
      busId: new FormControl('', Validators.required)
    }),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });
  busList: Bus[] = [];

  constructor(private ticketService: TicketService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.getTicket(id);
    this.getBusList();
  }

  getBusList() {
    this.ticketService.getBusList().subscribe(busList => {
      this.busList = busList;
    });
  }

  getTicket(id: number) {
    this.ticketService.findById(id).subscribe(
      ticket => {
        console.log(ticket);
        this.formEdit.patchValue(ticket);
      });
  }

  edit() {
    console.log('edit log');
    console.log(this.formEdit.value);
    this.ticketService.edit(this.formEdit.value).subscribe(res => {
      this.toastr.success('Chỉnh sửa thành công');
      this.router.navigateByUrl('/ticket');
    }, error => {
      console.log(error);
      this.toastr.error('Chỉnh sửa không thành công');
    });
  }
}
