import produce from 'immer';

export default function Cart(state = [], action) {
	switch (action.type) {
		case '@cart/ADD_SUCESS':
			return produce(state, draftState => {
				const { product } = action;

				draftState.push(product);
			});
		case '@cart/REMOVE':
			return produce(state, draftState => {
				const productIndex = draftState.findIndex(
					p => p.id === action.id
				);

				if (productIndex >= 0) {
					draftState.splice(productIndex.id, 1);
				}
			});
		case '@cart/UPDATE_AMOUNT_SUCESS': {
			return produce(state, draftState => {
				const productIndex = draftState.findIndex(
					p => p.id === action.id
				);

				if (productIndex >= 0) {
					draftState[productIndex].amount = Number(action.amount);
				}
			});
		}
		default:
			return state;
	}
}
