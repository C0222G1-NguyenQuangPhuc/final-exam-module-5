package com.codegym.spring_final_exam.service.impl;

import com.codegym.spring_final_exam.model.Bus;
import com.codegym.spring_final_exam.repository.IBusRepository;
import com.codegym.spring_final_exam.service.IBusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService implements IBusService {
    @Autowired
    private IBusRepository iBusRepository;

    @Override
    public List<Bus> findAllBus() {
        return iBusRepository.findAll();
    }
}
