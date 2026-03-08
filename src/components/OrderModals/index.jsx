import OrderForm from "../OrderForm";
import OrderDetails from "../OrderDetails";
import { MODALS_TYPES_ENUMS } from "../../constants/useModal";
import { OrderReducerActionsEnums } from "../../constants/useOrders";
import { useOrdersStore } from "../../state/ordersState.jsx";

function OrderModals({ modal, openModal, closeModal }) {
  const createOrder = useOrdersStore((state) => state.createOrder);
  const updateOrder = useOrdersStore((state) => state.updateOrder);

  const handleFormSubmit = (formData) => {
    if (modal.order) {
      updateOrder({
        id: modal.order.id,
        updates: formData,
      });
    } else {
      createOrder(formData);
    }
    closeModal();
  };

  if (modal.modalType === MODALS_TYPES_ENUMS.FORM) {
    return (
      <OrderForm
        order={modal.order}
        onSubmit={handleFormSubmit}
        onCancel={closeModal}
      />
    );
  }

  if (modal.modalType === MODALS_TYPES_ENUMS.DETAILS) {
    return (
      <OrderDetails
        order={modal.order}
        onClose={closeModal}
        onEdit={openModal}
      />
    );
  }
}

export default OrderModals;
