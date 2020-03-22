import React from 'react';
import { connect } from 'react-redux';
import {
	MdRemoveCircleOutline,
	MdAddCircleOutline,
	MdDelete,
} from 'react-icons/md';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart, updateAmount, total }) {
	function increment(product) {
		updateAmount(product.id, product.amount + 1);
	}

	function decrement(product) {
		updateAmount(product.id, product.amount - 1);
	}

	return (
		<Container>
			<ProductTable>
				<thead>
					<tr>
						<th />
						<th>Produto</th>
						<th>Quantidade</th>
						<th>Subtotal</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{cart.map(product => (
						<tr>
							<td>
								<img src={product.image} alt={product.title} />
							</td>
							<td>
								<strong>{product.title}</strong>
								<span>{product.priceFormatted}</span>
							</td>
							<td>
								<div>
									<button type="button">
										<MdRemoveCircleOutline
											size={20}
											color="#7159c1"
											onClick={() => decrement(product)}
										/>
									</button>
									<input readOnly value={product.amount} />
									<button type="button">
										<MdAddCircleOutline
											size={20}
											color="#7159c1"
											onClick={() => increment(product)}
										/>
									</button>
								</div>
							</td>
							<td>
								<strong>{product.subTotal}</strong>
							</td>
							<td>
								<button
									type="button"
									onClick={() => removeFromCart(product.id)}
								>
									<MdDelete size={20} color="#7159c1" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</ProductTable>

			<footer>
				<button type="button">Finalizar pedido</button>

				<Total>
					<span>TOTAL</span>
					<strong>{total}</strong>
				</Total>
			</footer>
		</Container>
	);
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
	cart: state.cart.map(product => {
		return {
			...product,
			subTotal: formatPrice(product.amount * product.price),
		};
	}),
	total: formatPrice(
		state.cart.reduce((total, product) => {
			return total + product.price * product.amount;
		}, 0)
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
