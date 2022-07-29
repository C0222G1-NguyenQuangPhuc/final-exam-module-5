import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../service/ticket.service';
import {Ticket} from '../../ticket';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ticketList: Ticket[] = [];
  p = 1;
  ticket: Ticket;
  destination: string;
  arrive: string;
  timeStart: string;
  dayStart: string;

  constructor(private ticketService: TicketService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getTicketList();
  }

  getTicketList() {
    this.ticketService.getTicketList().subscribe((ticketList: any) => {
      this.ticketList = ticketList.content;
      console.log(this.ticketList);
    });
  }

  getInfo(ticket: Ticket) {
    this.ticket = ticket;
    this.destination = ticket.destination;
    this.arrive = ticket.arrive;
    this.timeStart = ticket.timeStart;
    this.dayStart = ticket.dayStart;
  }

  edit() {
    if (this.ticket.quantity < 1) {
      this.toastr.warning('Đã bán hết vé');
    } else {
      this.ticket.quantity = this.ticket.quantity - 1;
      this.ticketService.edit(this.ticket).subscribe(res => {
        this.toastr.success('Đặt vé thành công');
        this.getTicketList();
      }, error => {
        console.log(error);
        this.toastr.error('Đặt vé không thành công');
      });
    }
  }

  searchByDestination(des: string, arrive: string) {
    this.ticketService.searchByDestination(des, arrive).subscribe(list => {
      this.ticketList = list;
    });
  }
}
