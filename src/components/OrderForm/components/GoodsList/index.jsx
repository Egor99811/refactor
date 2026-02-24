import { products } from "../../../../mockData";
import {
  removeItemFromOrder,
  updateItemQuantity,
} from "../../../../utils/components/orderForm";
import { formatPrice } from "../../../../utils/formatters";
import { Paper, Text, Button, Group, Stack, NumberInput } from "@mantine/core";
import { STATUS_ENUMS } from "../../../../constants/orderForm";

export function GoodsList({ formData, setFormData }) {
  const isRowBlocked =
    formData.status === STATUS_ENUMS.DELIVERED ||
    formData.status === STATUS_ENUMS.SHIPPED;

  const removeItem = (productId) => {
    const newItems = removeItemFromOrder(formData.items, productId);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleUpdateItemQuantity = (productId, newQuantity) => {
    const newItems = updateItemQuantity(formData.items, productId, newQuantity);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  return (
    <>
      {formData.items.length === 0 ? (
        <Paper p="md" withBorder>
          <Text ta="center" c="dimmed">
            Товары не добавлены
          </Text>
        </Paper>
      ) : (
        <Stack gap="xs">
          {formData.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <Paper key={item.productId} p="md" withBorder>
                <Group justify="space-between">
                  <div style={{ flex: 1 }}>
                    <Text fw={500}>{product?.name}</Text>
                    <Group gap="xs" align="center">
                      <Text size="sm" c="dimmed">
                        {formatPrice(item.price)} ×
                      </Text>
                      <NumberInput
                        disabled={isRowBlocked}
                        value={item.quantity}
                        onChange={(value) =>
                          handleUpdateItemQuantity(item.productId, value || 0)
                        }
                        min={1}
                        w={80}
                        size="xs"
                      />
                      <Text size="sm" c="dimmed">
                        шт.
                      </Text>
                    </Group>
                  </div>
                  <Group gap="md" align="center">
                    <Text fw={600} size="lg">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                    <Button
                      disabled={isRowBlocked}
                      color="red"
                      variant="light"
                      size="xs"
                      onClick={() => removeItem(item.productId)}
                    >
                      Удалить
                    </Button>
                  </Group>
                </Group>
              </Paper>
            );
          })}
        </Stack>
      )}
    </>
  );
}
