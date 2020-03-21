import produce from 'immer';

export default function Cart(state = [], action) {
	switch (action.type) {
		case '@cart/ADD':
			return produce(state, draftState => {
				const productIndex = draftState.findIndex(
					p => p.id === action.product.id
				);

				if (productIndex >= 0) {
					draftState[productIndex].amount += 1;
				} else {
					draftState.push({
						...action.product,
						amount: 1,
					});
				}
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
		default:
			return state;
	}
}
