import { useState, useEffect } from "react";
import { Modal, TextInput, Select, Button, Group, Stack } from "@mantine/core";
import {
  STATUS_OPTIONS,
  DEFAULT_FORM_STATE,
} from "../../constants/orderForm.js";
import {
  createUserOptions,
  validateForm,
} from "../../utils/components/orderForm.js";
import { AddGoods } from "./components/AddGoods/index.jsx";
import { STATUS_ENUMS } from "../../constants/orderForm.js";
import { users } from "../../mockData.js";

const OrderForm = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const isAdressBlocked = formData.status === STATUS_ENUMS.DELIVERED;
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUserOptions(createUserOptions(users));
    }, 100); // Симуляция задержки загрузки данных
  }, []);

  useEffect(() => {
    if (order) {
      setFormData({
        userId: order.userId,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
        items: [...order.items],
      });
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      alert("Заполните все обязательные поля и добавьте хотя бы один товар");
      return;
    }
    onSubmit(formData);
  };

  console.log("rerender");

  return (
    <Modal
      opened={true}
      onClose={onCancel}
      title={order ? "Редактировать заказ" : "Создать заказ"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Select
            label="Клиент"
            placeholder="Выберите клиента"
            data={userOptions}
            value={formData.userId.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                userId: parseInt(value) || "",
              }))
            }
            required
            withAsterisk
          />

          <TextInput
            label="Адрес доставки"
            placeholder="Введите адрес доставки"
            disabled={isAdressBlocked}
            value={formData.deliveryAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: e.target.value,
              }))
            }
            required
            withAsterisk
          />

          <Select
            label="Статус"
            data={STATUS_OPTIONS}
            value={formData.status}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          />

          <AddGoods formData={formData} setFormData={setFormData} />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="submit" color="green">
              {order ? "Сохранить" : "Создать заказ"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default OrderForm;
