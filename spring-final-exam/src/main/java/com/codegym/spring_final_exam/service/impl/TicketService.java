package com.codegym.spring_final_exam.service.impl;

import com.codegym.spring_final_exam.model.Ticket;
import com.codegym.spring_final_exam.repository.ITicketRepository;
import com.codegym.spring_final_exam.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TicketService implements ITicketService {

    @Autowired
    private ITicketRepository iTicketRepository;

    @Override
    public Page<Ticket> findAllTicket(Pageable pageable) {
        return iTicketRepository.findAllTicket(pageable);
    }

    @Override
    public void save(Ticket ticket) {
        iTicketRepository.save(ticket);
    }

    @Override
    public Page<Ticket> searchByDestination(Pageable pageable, String des, String arrive) {
        return iTicketRepository.searchByDestination(pageable, "%" + des + "%", "%" + arrive + "%");
    }
}
