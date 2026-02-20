package com.edumanage.backend.repository;

import com.edumanage.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByVendorId(Long vendorId);

    List<Item> findByCategory(String category);

    List<Item> findByAvailableTrue();
}
