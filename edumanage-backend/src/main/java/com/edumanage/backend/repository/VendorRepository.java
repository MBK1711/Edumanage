package com.edumanage.backend.repository;

import com.edumanage.backend.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Optional<Vendor> findByUserId(Long userId);

    Optional<Vendor> findByBusinessEmail(String businessEmail);

    Boolean existsByBusinessEmail(String businessEmail);
}
