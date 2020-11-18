import React from 'react'
import SEO from "../../components/Seo";
import config from '../../util/SiteConfig'
import ProductCanvas from '../../components/ProductCanvas'
import Head from 'next/head'
import { useProduct } from '../../queries/product'
import Link from 'next/link'
import Star from '../../components/Star'
import DeliveryDetails from '../../components/DeliveryDetails'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import CartControl from '../../components/CartControl'
import styled from '@emotion/styled'
import Loader from '../../components/Loader'
import { device } from '../../styles/device'
import { useRouter } from 'next/router'

const Breadcrumb = styled.a`
	cursor: pointer;
	&:hover {
		color: var(--primary);
	}
`

const H1 = styled.h1`
	color: var(--color-black);
	font-weight: 700;
	font-size: 36px;
	line-height: 46px;
	@media ${device.tablet} {
		font-size: 26px;
		line-height: 36px;
	}
`
const H3 = styled.h3`
	color: var(--color-black);
	text-transform: capitalize;
	font-weight: 700;
	font-size: 30px;
	line-height: 40px;
	@media ${device.tablet} {
		font-size: 22px;
		line-height: 32px;
	}
`

const ProductPage = () => {
	const router = useRouter()
  const { slug } = router.query
	const { status, data } = useProduct({ product: slug })

	let product

	if (data) {
		product = data.product
	}

	return (
		<React.Fragment>
			<Head>
				<title>{`${slug} | ${config.siteTitle}`}</title>
			</Head>
			{status === 'loading' ? (
				<Loader />
			) : (
				<div className="px-4 pt-2 md:px-8 lg:px-16">
					<SEO productPath={product} productSeo={product} />
					<div className="grid grid-cols-1 md:grid-cols-7 gap-4">
						<div className="md:col-span-5 md:flex md:gap-4 md:py-6 md:bg-white">
							<div className="-mx-4 md:mx-0 md:px-6 flex-1 grid ">
								<Carousel>
									{product &&
										product.galleryImages &&
										product.galleryImages.nodes.map((image, key) => (
											<div key={key} className="h-full">
												<img src={image.sourceUrl} className="h-full" />
											</div>
										))}
								</Carousel>
							</div>
							<div className="flex-1">
								<ul className="list-none flex mt-2 md:my-0 gap-1">
									<li>
										<Link href="/">
											<Breadcrumb>Home</Breadcrumb>
										</Link>
									</li>
									<li className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 206.089 206.089"
											className="fill-current h-4 w-4"
										>
											<path d="M161.812 147.323l-10.607-10.606 33.672-33.672-33.672-33.671 10.607-10.606 44.277 44.278-44.277 44.277zm1.851-44.279l-19.208-19.208H0v38.25h144.621l19.042-19.042z" />
										</svg>
									</li>
									<li>
										{product && product.productCategories && (
											<Link
												href={`/categories/${product.productCategories.nodes[0].slug}`}
											>
												<Breadcrumb>
													{product.productCategories.nodes[0].name}
												</Breadcrumb>
											</Link>
										)}
									</li>
									<li className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 206.089 206.089"
											className="fill-current h-4 w-4"
										>
											<path d="M161.812 147.323l-10.607-10.606 33.672-33.672-33.672-33.671 10.607-10.606 44.277 44.278-44.277 44.277zm1.851-44.279l-19.208-19.208H0v38.25h144.621l19.042-19.042z" />
										</svg>
									</li>
									<li className="flex items-center">
										<Link href={`/${slug}`}>
											<Breadcrumb
												style={{
													width: 215,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													display: 'block',
												}}
											>
												{product.name}
											</Breadcrumb>
										</Link>
									</li>
								</ul>
								<H1 className="my-2">{product.name}</H1>
								<div className="flex items-center mt-2">
									<Star star={product.averageRating} />{' '}
									<small className="ml-2">{product.reviewCount} reviews</small>
								</div>
								<div className="my-2">
									<small className="font-bold mr-1 text-2xl">{product.salePrice}</small>
									<small className={"text-base " + (Boolean(product.salePrice) ? "line-through" : "font-bold text-2xl")}>
										{product.regularPrice}
									</small>
								</div>
								<div
									dangerouslySetInnerHTML={{ __html: product.shortDescription }}
								/>
								<CartControl productId={product.productId} />
							</div>
						</div>
						<div className="md:col-span-2 bg-white">
							<DeliveryDetails />
						</div>
					</div>
					<div className="mb-4">
						<H3 className="my-2">Product Description</H3>
						<div dangerouslySetInnerHTML={{ __html: product.description }} />
					</div>
					<div className="mb-10">
						<H3>Related Products</H3>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-auto mt-4">
							{product.related &&
								product.related.nodes
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

export default ProductPage
