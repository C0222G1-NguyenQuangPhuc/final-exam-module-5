package com.codegym.spring_final_exam.service;

import com.codegym.spring_final_exam.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ITicketService {

    Page<Ticket> findAllTicket(Pageable pageable);

    void save(Ticket ticket);

    Page<Ticket> searchByDestination(Pageable pageable, String des, String arrive);

    Ticket findById(Integer id);

    void delete(Ticket ticket);

}
