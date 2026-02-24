import { useReducer, createContext } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_ORDER":
      return {
        showForm: true,
        editingOrder: null,
        viewingOrder: null,
      };
    case "UPDATE_ORDER":
      return {
        showForm: true,
        editingOrder: action.payload,
        viewingOrder: null,
      };
    case "VIEW_ORDER":
      return {
        showForm: false,
        editingOrder: null,
        viewingOrder: action.payload,
      };
    case "CLOSE_FORM":
      return {
        showForm: false,
        editingOrder: null,
        viewingOrder: null,
      };
    default:
      return state;
  }
}

// export const ModalContext = createContext();
// export const ModalDispatchContext = createContext();

export function useModal() {
  const [modal, dispatchModal] = useReducer(reducer, ModalInitialState);

  return { modal, dispatchModal };
}

export const ModalReducerEnums = {
  CREATE_ORDER: "CREATE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
  VIEW_ORDER: "VIEW_ORDER",
  CLOSE_FORM: "CLOSE_FORM",
};

// Object.freeze(ModalReducerEnums);s

const ModalInitialState = {
  showForm: false,
  editingOrder: null,
  viewingOrder: null,
};
