import { useState } from "react";
import {
  MantineProvider,
  Container,
  Title,
  Space,
  Button,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useOrders } from "./hooks/useOrders.js";
import OrderFilters from "./components/OrderFilters";
import FilteredOrderList from "./components/FilteredOrderList/index.jsx";
import { useModal } from "./hooks/useModal.jsx";
import OrderModals from "./components/OrderModals/index.jsx";

function App() {
  const { orders, dispatchOrder } = useOrders();

  const { modal, openModal, closeModal } = useModal();
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    search: "",
  });

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} mb="xl">
          Управление заказами
        </Title>

        <OrderFilters filters={filters} onFiltersChange={setFilters} />

        <Space h="xl" />

        <Button color="green" size="md" onClick={() => openModal(null)} mb="xl">
          + Создать заказ
        </Button>

        <FilteredOrderList
          orders={orders}
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
