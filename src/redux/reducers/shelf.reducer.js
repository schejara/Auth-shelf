const initialState = {
    items: [], // This should be an array to hold the items
  };
  
  const shelfReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SHELF':
        return { ...state, items: action.payload }; // Ensure you set the items correctly
      default:
        return state;
    }
  };
  
  export default shelfReducer;
  