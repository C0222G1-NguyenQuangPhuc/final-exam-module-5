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
  dKey: string;
  aKey: string;

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


  order() {
    if (this.ticket.quantity < 1) {
      this.toastr.warning('Đã bán hết vé');
    } else {
      this.ticket.quantity = this.ticket.quantity - 1;
      this.ticketService.order(this.ticket).subscribe(res => {
        this.getTicketList();
        this.toastr.success('Đặt vé thành công');
      }, error => {
        console.log(error);
        this.toastr.error('Đặt vé không thành công');
      });
    }
  }

  delete() {
    this.ticketService.delete(this.ticket.ticketId).subscribe(res => {
      this.getTicketList();
      this.toastr.success('Xóa vé thành công');
    }, error => {
      this.toastr.error('Xóa vé không thành công');
    });
  }

  search() {
    this.ticketService.searchByDestination(this.dKey, this.aKey).subscribe((list: any) => {
      if (list != null) {
        this.ticketList = list.content;
      } else {
        this.toastr.warning('Không tìm thấy vé');
      }
      console.log(list);
    });
  }
}
