package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.item.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
