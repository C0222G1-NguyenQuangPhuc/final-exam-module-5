package com.codegym.spring_final_exam.repository;

import com.codegym.spring_final_exam.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ITicketRepository extends JpaRepository<Ticket, Integer> {

    @Query(value = "select * from ticket", nativeQuery = true)
    Page<Ticket> findAllTicket(Pageable pageable);

    @Modifying
    @Query(value = "insert into ticket (destination, arrive, day_start, time_start, bus_id, price, quantity) values (:destination, :arrive, :dStart, :tStart, :bId, :price, :quantity)", nativeQuery = true)
    void save(@Param("destination") String destination, @Param("arrive") String arrive, @Param("dStart") String dStart, @Param("tStart") String tStart, @Param("bId") Integer bId, @Param("price") Integer price, @Param("quantity") Integer quantity);


    @Modifying
    @Query(value = "update ticket set quantity = (quantity - 1) where ticket_id = :id", nativeQuery = true)
    void update(@Param("id") Integer id);

    @Query(value = "select * from ticket where destination like :des and arrive like :arrive", nativeQuery = true)
    Page<Ticket> searchByDestination(Pageable pageable, @Param("des") String des, @Param("arrive") String arrive);
}
