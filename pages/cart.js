import React, { useContext } from 'react'
import Link from 'next/link'
import storeContext from '../util/context'
import CartItem from '../components/CartItem'
import styled from '@emotion/styled'
import Currency from '../util/naira'
import { device } from '../styles/device'

const Button = styled.a`
	display: inline-block;
	font-size: 0.9em;
	padding: 12px 30px;
	background: #ffc21d;
	color: #232323;
	font-weight: 900;
	cursor: pointer;
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 2px;
	opacity: 1;
	transition: opacity 0.3s;
`

const CouponBtn = styled.span`
	display: inline-block;
	font-size: 0.9em;
	padding: 8px 15px;
	background: #ffc21d;
	color: #232323;
	font-weight: 900;
	cursor: pointer;
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 2px;
	opacity: 1;
	transition: opacity 0.3s;
`

const CouponText = styled.p`
	border-top: 1px solid #ccc;
	padding-top: 10px;
	margin-top: 10px;
`

const CouponInput = styled.input`
	width: 200px;
	padding: 5px;
	margin-right: 5px;
	vertical-align: top;
	color: #777;
`

const CouponContainer = styled.div`
	border-bottom: 1px solid #ccc;
	padding-bottom: 10px;
	margin-bottom: 10px;
`

const Cart = () => {
	const { cart } = useContext(storeContext)
	const catAvailable = cart && cart.items
	return (
		<React.Fragment>
			<div className="p-4 md:px-8 lg:px-16 gap-4">
				<div className="flex justify-between items-center mb-2">
					<h3>Items in Cart</h3>
					{catAvailable && cart.items.length ? (
						<Link href="/checkout">
							<Button>Checkout</Button>
						</Link>
					) : null}
				</div>
				<div>
					{catAvailable && cart.items.length ? (
						cart.items.map((item, index) => (
							<CartItem item={item} key={item.key} index={index + 1} />
						))
					) : (
						<p className="py-6 bg-gray-500">No Item in your Cart</p>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-white py-2">
					<div className="order-2 md:order-1">
						<div className="w-full md:w-3/4">
							<CouponContainer>
								<CouponInput type="text" placeholder="Enter Promo Code" />
								<CouponBtn>Apply</CouponBtn>
							</CouponContainer>
							<div className="bg-gray-100 p-2">
								<p>
									Items will be saved in your cart for 30 days. To save items
									longer.
								</p>
								<CouponText>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
									soluta repudiandae provident non, sit, eaque repellat eum hic
									unde.
								</CouponText>
							</div>
						</div>
					</div>
					<ul className="order-1 md:order-2 w-full md:w-3/4 justify-self-end">
						<li className="grid grid-cols-2">
							<p className="uppercase text-gray-600">Total Items:</p>
							<p className="uppercase text-gray-800">
								{cart && cart.items_count}
							</p>
						</li>
						<li className="grid grid-cols-2">
							<p className="uppercase text-gray-600">Shipping</p>
							<p className="uppercase text-gray-800">{Currency(0)}</p>
						</li>
						<li className="grid grid-cols-2">
							<p className="uppercase text-gray-600">SubTotal</p>
							{cart && (
								<p className="uppercase text-gray-800">
									{Currency(cart.totals && cart.totals.total_items)}
								</p>
							)}
						</li>
						<li className="grid grid-cols-2 border-0 border-gray-500 border-solid -mx-2 px-2 mt-2 py-2 border-t">
							<h3 className="uppercase text-gray-700">Total:</h3>
							{cart && (
								<h3>{Currency(cart.totals && cart.totals.total_price)}</h3>
							)}
						</li>
					</ul>
				</div>
				<div className="flex items-center justify-between mt-3">
					<Link href="/">
						<a className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 400 400"
								className="h-3 w-3 mx-2"
							>
								<path d="M382.688 182.686H59.116l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0L5.073 187.757c-6.764 6.76-6.764 17.727 0 24.485l106.768 106.775a17.252 17.252 0 0012.242 5.072c4.43 0 8.861-1.689 12.242-5.072 6.764-6.76 6.764-17.726 0-24.484l-77.209-77.218h323.572c9.562 0 17.316-7.753 17.316-17.315 0-9.562-7.753-17.314-17.316-17.314z" />
							</svg>
							Continue Shopping
						</a>
					</Link>
					{catAvailable && cart.items.length ? (
						<Link href="/checkout">
							<Button>Checkout</Button>
						</Link>
					) : null}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Cart
