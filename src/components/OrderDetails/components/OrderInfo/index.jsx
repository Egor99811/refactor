import { Badge, Grid, Stack, Text } from "@mantine/core";
import { formatDate } from "../../../../utils/formatters.js";
import {
  formatOrderStatus,
  getStatusColor,
} from "../../../../utils/formatters.js";

export function OrderInfo({ order }) {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Stack gap="xs">
          <Text size="sm" fw={500} c="dimmed">
            Дата заказа
          </Text>
          <Text>{formatDate(order.orderDate)}</Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack gap="xs">
          <Text size="sm" fw={500} c="dimmed">
            Статус
          </Text>
          <Badge
            color={getStatusColor(order.status)}
            variant="filled"
            size="lg"
          >
            {formatOrderStatus(order.status)}
          </Badge>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
