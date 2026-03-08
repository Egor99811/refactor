import { formatPrice } from "../../../../utils/formatters";
import { Text, Stack, Group, Paper } from "@mantine/core";
import { products as p } from "../../../../mockData";
import { useEffect, useState } from "react";

function DetailsGoodsList({ items }) {
  const [productsEntity, setProductsEntity] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const entity = {};
      for (const product of p) {
        entity[product.id] = product;
      }
      setProductsEntity(entity);
    }, 100); // Симуляция задержки загрузки данных
  }, []);

  return (
    <div>
      <Text fw={500} mb="sm">
        Товары ({items.length})
      </Text>
      <Stack gap="xs">
        {items.map((item) => {
          const product = productsEntity[item.productId];
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
