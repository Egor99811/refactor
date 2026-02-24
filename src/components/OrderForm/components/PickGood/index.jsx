import { useState } from "react";
import { createProductOptions } from "../../../../utils/components/orderForm";
import { addItemToOrder } from "../../../../utils/components/orderForm";
import { products } from "../../../../mockData";
import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DEFAULT_QUANTITY } from "../../../../constants/orderForm";
import { STATUS_ENUMS } from "../../../../constants/orderForm";

export function PickGood({ formData, setFormData }) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const isPeakBlocked =
    formData.status === STATUS_ENUMS.DELIVERED ||
    formData.status === STATUS_ENUMS.SHIPPED;

  const addItem = () => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (!product) return;

    const newItems = addItemToOrder(formData.items, product, quantity);
    setFormData((prev) => ({ ...prev, items: newItems }));

    setSelectedProduct("");
    setQuantity(DEFAULT_QUANTITY);
  };

  const productOptions = createProductOptions();

  return (
    <Group mb="md">
      <Select
        disabled={isPeakBlocked}
        placeholder="Выберите товар"
        data={productOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
        style={{ flex: 1, minWidth: 200 }}
      />
      <NumberInput
        disabled={isPeakBlocked}
        placeholder="Кол-во"
        value={quantity}
        onChange={(value) => setQuantity(value || 1)}
        min={1}
        w={80}
      />
      <Button onClick={addItem} disabled={!selectedProduct || isPeakBlocked}>
        Добавить
      </Button>
    </Group>
  );
}
