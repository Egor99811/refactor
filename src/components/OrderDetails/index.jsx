import { formatPrice } from "../../utils/formatters.js";
import { Modal, Text, Button, Group, Stack, Paper } from "@mantine/core";
import { MODAL_SIZE } from "../../constants/orderDetails.js";
import DetailsGoodsList from "./components/DetailsGoodsList/index.jsx";
import { OrderInfo } from "./components/OrderInfo/index.jsx";
import { ClientInfo } from "./components/ClientInfo/index.jsx";

const OrderDetails = ({ order, onClose, onEdit }) => {
  if (!order) return null;

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`Заказ #${order.id}`}
      size={MODAL_SIZE}
    >
      <Stack gap="lg">
        {/* Информация о заказе */}
        <OrderInfo order={order} />

        {/* Информация о клиенте */}
        <ClientInfo user={order.user} />

        {/* Адрес доставки */}
        <div>
          <Text fw={500} mb="sm">
            Адрес доставки
          </Text>
          <Text c="dimmed">{order.deliveryAddress}</Text>
        </div>

        {/* Товары в заказе */}
        <DetailsGoodsList items={order.items} />

        {/* Итого */}
        <Paper p="md" bg="green.0">
          <Group justify="space-between">
            <Text fw={600} size="lg">
              Итого:
            </Text>
            <Text fw={700} size="xl" c="green">
              {formatPrice(order.totalAmount)}
            </Text>
          </Group>
        </Paper>

        <Group justify="flex-end" mt="xl">
          <Button variant="light" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => onEdit(order)}>Редактировать</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default OrderDetails;
