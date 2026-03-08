import { useEffect } from "react";
import { MantineProvider, Container, Title, Space } from "@mantine/core";
import "@mantine/core/styles.css";
import OrderFilters from "./components/OrderFilters";
import { OrdersModule } from "./components/OrdersModule/index.jsx";
import { useUsersStore } from "./state/usersState.jsx";

function App() {
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} mb="xl">
          Управление заказами
        </Title>

        <OrderFilters />

        <Space h="xl" />

        <OrdersModule />
      </Container>
    </MantineProvider>
  );
}

export default App;
