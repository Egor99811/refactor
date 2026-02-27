import OrderForm from "../OrderForm";
import OrderDetails from "../OrderDetails";
import { MODALS_TYPES_ENUMS } from "../../hooks/useModal";
import { OrderReducerActionsEnums } from "../../hooks/useOrders";

function OrderModals({ modal, openModal, closeModal, dispatchOrder }) {
  const handleFormSubmit = (formData) => {
    if (modal.order) {
      dispatchOrder({
        type: OrderReducerActionsEnums.UPDATE_ORDER,
        payload: {
          id: modal.order.id,
          updates: formData,
        },
      });
    } else {
      dispatchOrder({
        type: OrderReducerActionsEnums.CREATE_ORDER,
        payload: formData,
      });
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
