package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tcc.com.domain.shop.Shop;
import tcc.com.domain.item.Item;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    @Query("SELECT s.item FROM Shop s")
    List<Item> findAllItemsInShop();
}
