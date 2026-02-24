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
import { useOrderForm } from "./hooks/useOrderForm.jsx";
import OrderForm from "./components/OrderForm";
import { OrderReducerActionsEnums } from "./hooks/useOrders";

function App() {
  const { orders, dispatch } = useOrders();

  const { showForm, editingOrder, createOrder, updateOrder, closeForm } =
    useOrderForm();
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    search: "",
  });

  const handleFormSubmit = (formData) => {
    if (editingOrder) {
      dispatch({
        type: OrderReducerActionsEnums.UPDATE_ORDER,
        payload: {
          id: editingOrder.id,
          updates: formData,
        },
      });
    } else {
      dispatch({
        type: OrderReducerActionsEnums.CREATE_ORDER,
        payload: formData,
      });
    }
    closeForm();
  };

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} mb="xl">
          Управление заказами
        </Title>

        <OrderFilters filters={filters} onFiltersChange={setFilters} />

        <Space h="xl" />

        <Button color="green" size="md" onClick={createOrder} mb="xl">
          + Создать заказ
        </Button>

        <FilteredOrderList
          orders={orders}
          dispatch={dispatch}
          filters={filters}
          updateOrder={updateOrder}
        />

        {showForm && (
          <OrderForm
            order={editingOrder}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;
