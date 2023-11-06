export const assetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ASSET":
      return [...state, action.payload];
    case "DELETE_ASSET":
      return state.filter((asset) => asset.id !== action.payload);
    case "UPDATE_ASSET":
      return state.map((asset) =>
        asset.id === action.payload.id
          ? { ...asset, ...action.payload.updateFunc(asset) }
          : asset
      );
    default:
      return state;
  }
};
