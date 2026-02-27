import { useEffect, useState } from "react";
import {
  MantineProvider,
  Container,
  Title,
  Space,
  Button,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { OrderReducerActionsEnums, useOrders } from "./hooks/useOrders.js";
import OrderFilters from "./components/OrderFilters";
import FilteredOrderList from "./components/FilteredOrderList/index.jsx";
import { useModal } from "./hooks/useModal.jsx";
import OrderModals from "./components/OrderModals/index.jsx";
import { orders as initialOrders, users as initialUsers } from "./mockData.js";

function App() {
  const { orders, dispatchOrder } = useOrders();
  const [users, setUsers] = useState([]);
  const { modal, openModal, closeModal } = useModal();
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    search: "",
  });

  useEffect(() => {
    setTimeout(() => {
      dispatchOrder({
        type: OrderReducerActionsEnums.SET_ORDERS,
        payload: initialOrders,
      });
      setUsers(initialUsers);
    }, 100); // Симуляция задержки загрузки данных
  }, []);

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} mb="xl">
          Управление заказами
        </Title>

        <OrderFilters
          filters={filters}
          onFiltersChange={setFilters}
          users={users}
        />

        <Space h="xl" />

        <Button color="green" size="md" onClick={() => openModal(null)} mb="xl">
          + Создать заказ
        </Button>

        <FilteredOrderList
          orders={orders}
          users={users}
          dispatchOrder={dispatchOrder}
          filters={filters}
          openModal={openModal}
        />

        <OrderModals
          modal={modal}
          openModal={openModal}
          closeModal={closeModal}
          dispatchOrder={dispatchOrder}
        />
      </Container>
    </MantineProvider>
  );
}

export default App;
