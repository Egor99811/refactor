import { formatPrice } from "../../../../utils/formatters";
import { Text, Stack, Group, Paper } from "@mantine/core";
import { products } from "../../../../mockData";

function DetailsGoodsList({ items }) {
  return (
    <div>
      <Text fw={500} mb="sm">
        Товары ({items.length})
      </Text>
      <Stack gap="xs">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <Paper key={item.productId} p="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={500}>{product?.name}</Text>
                  <Text size="sm" c="dimmed">
                    {formatPrice(item.price)} × {item.quantity} шт.
                  </Text>
                  {product?.category && (
                    <Text size="xs" c="dimmed">
                      {product.category}
                    </Text>
                  )}
                </div>
                <Text fw={600} size="lg">
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </Group>
            </Paper>
          );
        })}
      </Stack>
    </div>
  );
}

export default DetailsGoodsList;
