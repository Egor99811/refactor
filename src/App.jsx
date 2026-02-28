import { useEffect, useState } from "react";
import { MantineProvider, Container, Title, Space } from "@mantine/core";
import "@mantine/core/styles.css";
import OrderFilters from "./components/OrderFilters";
import { OrdersModule } from "./components/OrdersModule/index.jsx";
import { users as us } from "./mockData.js";

function App() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    search: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setUsers(us);
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

        <OrdersModule users={users} filters={filters} />
      </Container>
    </MantineProvider>
  );
}

export default App;
