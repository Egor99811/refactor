import { useCallback, useState } from "react";

export const MODALS_TYPES_ENUMS = {
  CLOSE: false,
  FORM: "FORM",
  DETAILS: "DETAILS",
};

export function useModal() {
  const [modal, setModal] = useState(MODAL_INITIAL_STATE);

  const openModal = useCallback(
    (order, modalType = MODALS_TYPES_ENUMS.FORM) => {
      setModal({
        modalType: modalType,
        order: order || null,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModal(MODAL_INITIAL_STATE);
  }, []);

  return {
    modal,
    openModal,
    closeModal,
  };
}

const MODAL_INITIAL_STATE = {
  modalType: MODALS_TYPES_ENUMS.CLOSE,
  order: null,
};
