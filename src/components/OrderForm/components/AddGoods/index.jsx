import { Group, Paper, Text, Divider } from "@mantine/core";
import { formatPrice } from "../../../../utils/formatters";
import { GoodsList } from "../GoodsList";
import { PickGood } from "../PickGood";
import { calculateTotalAmount } from "../../../../utils/components/orderForm";
export function AddGoods({ formData, setFormData }) {
  return (
    <div>
      <Text fw={500} size="sm" mb="xs">
        Товары *
      </Text>

      <PickGood formData={formData} setFormData={setFormData} />

      <GoodsList formData={formData} setFormData={setFormData} />

      {formData.items.length > 0 && (
        <>
          <Divider my="md" />
          <Paper p="md" bg="gray.0">
            <Group justify="space-between">
              <Text fw={600} size="lg">
                Общая сумма:
              </Text>
              <Text fw={700} size="xl" c="green">
                {formatPrice(calculateTotalAmount(formData.items))}
              </Text>
            </Group>
          </Paper>
        </>
      )}
    </div>
  );
}
