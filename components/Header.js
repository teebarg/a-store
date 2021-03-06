import React, { useContext } from 'react'
import Link from 'next/link'
import storeContext from '../util/context'
import styled from '@emotion/styled'
import { device } from '../styles/device'


const Title = styled.h3`
	font-size: 30px;
	@media ${device.tablet} {
		font-size: 24px;
	}
`

const CartIcon = styled.a`
	&::after {
		content: attr(data-cart);
		background-color: var(--primary);
		color: var(--color-white);
		font-weight: bold;
    top: -10px;
    left: -10px;
    position: absolute;
    border-radius: 8px;
    padding: 0 3px;
    font-size: 13px;
	}
`

const Header = () => {
	const { cart } = useContext(storeContext)

	return (
		<header
			className={`flex items-center justify-between header-dark`}
			style={{ height: '60px' }}
		>
			<div className="flex-1 px-4">
				<Link href={'/'}>
					<a>
						<Title className="uppercase text-white">
							Allure<span className="text-primary">s</span>tore{' '}
						</Title>
					</a>
				</Link>
			</div>
			<div className={'px-2 py-2 md:px-4 flex items-center'}>
				<Link href="/">
					<a className="text-gray-500 hover:text-orange-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 472.615 472.615"
							className="h-5 w-5 fill-current"
						>
							<circle cx="236.308" cy="117.504" r="111.537" />
							<path d="M369 246.306c-1.759-1.195-5.297-3.493-5.297-3.493-28.511 39.583-74.993 65.402-127.395 65.402-52.407 0-98.894-25.825-127.404-65.416 0 0-2.974 1.947-4.451 2.942C41.444 288.182 0 360.187 0 441.87v24.779h472.615V441.87c0-81.321-41.077-153.048-103.615-195.564z" />
						</svg>
					</a>
				</Link>
				<Link href="/cart">
					<CartIcon className="ml-4 text-gray-500 hover:text-orange-600 relative" data-cart={cart ? cart.items_count : 0}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 491.123 491.123"
							className="h-5 w-5 fill-current"
						>
							<path d="M470.223.561h-89.7c-9.4 0-16.7 6.3-19.8 14.6l-83.4 263.8h-178.3l-50-147h187.7c11.5 0 20.9-9.4 20.9-20.9s-9.4-20.9-20.9-20.9h-215.9c-18.5.9-23.2 18-19.8 26.1l63.6 189.7c3.1 8.3 11.5 13.6 19.8 13.6h207.5c9.4 0 17.7-5.2 19.8-13.6l83.4-263.8h75.1c11.5 0 20.9-9.4 20.9-20.9s-9.5-20.7-20.9-20.7zM103.223 357.161c-36.5 0-66.7 30.2-66.7 66.7s30.2 66.7 66.7 66.7 66.7-30.2 66.7-66.7-30.2-66.7-66.7-66.7zm25 67.7c0 14.6-11.5 26.1-25 26.1-13.6 0-25-11.5-25-26.1s11.5-26.1 25-26.1c14.6.1 26.1 11.5 25 26.1zM265.823 357.161c-36.5 0-66.7 30.2-66.7 66.7s30.2 66.7 66.7 66.7c37.5 0 66.7-30.2 66.7-66.7.1-36.5-30.2-66.7-66.7-66.7zm25.1 67.7c0 14.6-11.5 26.1-25 26.1s-25-11.5-25-26.1 11.5-26.1 25-26.1c14.5.1 26 11.5 25 26.1z" />
						</svg>
					</CartIcon>
				</Link>
			</div>
		</header>
	)
}

export default Header
