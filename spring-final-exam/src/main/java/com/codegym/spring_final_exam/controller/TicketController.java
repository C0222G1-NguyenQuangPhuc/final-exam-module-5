package com.codegym.spring_final_exam.controller;

import com.codegym.spring_final_exam.model.Bus;
import com.codegym.spring_final_exam.model.Ticket;
import com.codegym.spring_final_exam.service.IBusService;
import com.codegym.spring_final_exam.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TicketController {
    @Autowired
    private ITicketService iTicketService;

    @Autowired
    private IBusService iBusService;

    @GetMapping("/list-ticket")
    public ResponseEntity<?> showListTicket(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("ticket_id").ascending();
        Page<Ticket> tickets = iTicketService.findAllTicket(PageRequest.of(page, 100, sort));
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @GetMapping("/list-bus")
    public ResponseEntity<?> showListBus() {
        List<Bus> busList = iBusService.findAllBus();
        return new ResponseEntity<>(busList, HttpStatus.OK);
    }

    @PostMapping("/ticket/create")
    public ResponseEntity<?> createTicket(@Valid @RequestBody Ticket ticket) {
        iTicketService.save(ticket);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/ticket/order")
    public ResponseEntity<?> orderTicket(@RequestBody Ticket ticket ){
        iTicketService.save(ticket);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{des}&{arrive}")
    public ResponseEntity<?> searchByDestination(@RequestParam(name = "page", defaultValue = "0") int page,
                                                 @PathVariable("des") String des,
                                                 @PathVariable("arrive") String arrive) {
        Sort sort = Sort.by("ticket_id").ascending();
        Page<Ticket> tickets = iTicketService.searchByDestination(PageRequest.of(page, 100, sort), des, arrive);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }
}
