package com.reIntern.service;

import com.reIntern.model.IncomingRequest;
import com.reIntern.repository.IncomingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncomingRequestService {

    @Autowired
    private IncomingRequestRepository incomingRequestRepository;

    public void saveIncomingRequest(IncomingRequest incomingRequest) {
        incomingRequestRepository.save(incomingRequest);
    }
}
