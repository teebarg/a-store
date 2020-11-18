import React from 'react'
import SEO from "../../components/Seo";
import config from '../../util/SiteConfig'
import ProductCanvas from '../../components/ProductCanvas'
import Loader from '../../components/Loader'
import Category from '../../components/Category'
import Input from '../../components/Input'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useCategory } from '../../queries/categories'
import { device } from '../../styles/device'
import { useRouter } from 'next/router'


const Button = styled.button`
	background-color: #232020;
	border-radius: 0px 4px 4px 0px;
	color: var(--color-white);
	width: 30%;
	align-items: center;
	display: flex;
	justify-content: center;
	&:hover {
		background-color: var(--primary);
	}
`
const Image = styled.img`
	max-height: 200px;
	width: 100%;
`
const H3 = styled.h3`
	color: var(--color-black);
	text-transform: capitalize;
	font-weight: 700;
	font-size: 34px;
	line-height: 44px;
	@media ${device.tablet} {
		font-size: 26px;
		line-height: 36px;
	}
`

const CategoryPage = () => {
	const router = useRouter()
  const { category } = router.query
	const { status, data } = useCategory({ category })

	let banner = null
	let products = []

	if (data) {
		products = data.category ? data.category.products.nodes : []
		banner = data.banner
	}

	return (
		<React.Fragment>
			<Head>
				<title>{`Shop ${category} @ low price | ${config.siteTitle}`}</title>
			</Head>
			<SEO productListingSeo={products} category={category} />
			{status === 'loading' ? (
				<Loader />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 lg:gap-6 py-2 mx-4 sm:mx-8 md:mx-10 lg:mx-14 bg-white">
					{/* <SEO /> */}
					<div className="order-2 md:order-1 md:block py-6 px-4 bg-hash rounded">
						<h4 className="text-gray-800 uppercase font-extrabold mb-3">
							Search <span className="text-primary">Here</span>{' '}
						</h4>
						<div className="flex">
							<Input
								className="text-left rounded-tl rounded-bl w-full"
								type="search"
								name="search"
								placeholder="Search here..."
							/>
							<Button className="btn read-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 487.95 487.95"
									className="fill-current h-4 w-4"
								>
									<path d="M481.8 453l-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z" />
								</svg>
							</Button>
						</div>
						<h4 className="text-gray-800 uppercase font-extrabold my-6">
							Product <span className="text-primary">Categories</span>{' '}
						</h4>
						<Category />
					</div>
					<div className="order-1 md:order-2 md:col-span-3">
						{banner && <Image src={banner.sourceUrl} alt="Banner" />}
						<H3 className="my-2">{category}</H3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-auto">
							{products
								.filter((item) => item.slug)
								.map((item) => (
									<ProductCanvas product={item} key={item.id} />
								))}
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	)
}

export default CategoryPage
