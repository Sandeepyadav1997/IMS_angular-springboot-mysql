package com.reIntern.repository;

import com.reIntern.model.IncomingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomingRequestRepository extends JpaRepository<IncomingRequest, Integer> {
}
