package com.reIntern.controller;

import com.reIntern.model.IncomingRequest;
import com.reIntern.service.IncomingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/incoming-request")
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class IncomingRequestController {

    @Autowired
    private IncomingRequestService incomingRequestService;

    @PostMapping("/add")
    public void addIncomingRequest(@RequestBody IncomingRequest incomingRequest) {
    	System.out.println(incomingRequest);
        incomingRequestService.saveIncomingRequest(incomingRequest);
    }
}
