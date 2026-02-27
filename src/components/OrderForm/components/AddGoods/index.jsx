import { Group, Paper, Text, Divider } from "@mantine/core";
import { formatPrice } from "../../../../utils/formatters";
import { GoodsList } from "../GoodsList";
import { PickGood } from "../PickGood";
import { calculateTotalAmount } from "../../../../utils/components/orderForm";
import { useEffect, useState } from "react";
import { products as initialProducts } from "../../../../mockData";

export function AddGoods({ formData, setFormData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(initialProducts);
    }, 100);
  }, []);

  return (
    <div>
      <Text fw={500} size="sm" mb="xs">
        Товары *
      </Text>

      <PickGood
        formData={formData}
        setFormData={setFormData}
        products={products}
      />

      <GoodsList
        formData={formData}
        setFormData={setFormData}
        products={products}
      />

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
