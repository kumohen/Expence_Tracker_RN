import {itemsList} from "../data";

const initState = {
    items:itemsList ,
    addedItems: [],
  total: 0,
  };

  export default (state = initState, action) => {
    switch (action.type) {
      // case "FETCH_ITEMS":
      // // case "CREATE_ITEM":
      
      //   return {
      //     ...state,
      //     items: [...state.items,action.payload],
      //   };
        case "FETCH_ITEMS":
          return { ...state, items: action.payload };
        case "ADD_TO_CART":
         
          let addedItem = state.items.find((item) => item.id === action.id);
          let exist_item = state.addedItems.find((item) => item.id === action.id);
   
          if (exist_item) {
            addedItem.quantity += 1;
            return { ...state, total: state.total + addedItem.price };
          } else {
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price;
            return {
              ...state,
              total: newTotal,
              addedItems: [...state.addedItems, addedItem],
            };
          }
          case "REMOVE_FROM_CART":
            let addedItems = state.addedItems.find((item) => item.id === action.id);
      
      
            if (addedItems.quantity === 1) {
              let new_items = state.addedItems.filter(
                (item) => item.id !== action.id
              );
      
              let newTotal = state.total - addedItems.price;
           
              return {
                ...state,
                addedItems: new_items,
                total: newTotal,
              };
            } else {
              addedItems.quantity -= 1;
              let newTotal = state.total - addedItems.price;
              return {
                ...state,
                total: newTotal,
                addedItems: [...state.addedItems],
              };
            }
            case "ADD_QUANTITY":
              let find_ele = state.addedItems.find((item) => item.id === action.id);
              find_ele.quantity += 1;
              let newTotal = state.total + find_ele.price;
          
              return {
                ...state,
                total: newTotal,
                addedItems: [...state.addedItems],
              };
            case "CLEAR_CART_ITEMS":
              return {
                ...state,
                total: 0,
                addedItems: [],
              };
      default:
        return state;
    }
  };