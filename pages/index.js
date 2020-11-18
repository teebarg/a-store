import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { useHomeListing } from '../queries/home'
import Link from 'next/link'
import SEO from '../components/Seo'
import ProdCanvas from '../components/ProductCanvas'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css' // import css
import { device } from '../styles/device'
import config, { store } from '../util/SiteConfig'
import Head from 'next/head'
import storeContext from '../util/context'
import Loader from '../components/Loader'

const BannerContent = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	h4 {
		color: var(--color-white);
		text-transform: uppercase;
		font-size: 56px;
		line-height: 66px;
		font-weight: 600;
		@media ${device.tablet} {
			font-size: 32px;
			line-height: 42px;
		}
	}
`
const BC = styled(BannerContent)`
	padding: 10px 50px 10px 120px;
	@media ${device.tablet} {
		padding: 10px;
	}
`

const Category = styled.div`
	transition: all 0.2s ease-out 0s;
	&:after {
		content: '';
		display: block;
		background: rgba(31, 28, 28, 0.74902);
		top: 20px;
		bottom: 20px;
		opacity: 0;
		transform: rotate3d(-1, 1, 0, 100deg);
		transition: all 0.4s ease-in-out 0s;
		border-radius: 50%;
		position: absolute;
		left: 20px;
		right: 20px;
	}
	&:hover div {
		opacity: 1;
		transform: translate(0, -50%);
		transition-delay: 0.2s;
	}
	&:hover:after {
		opacity: 0.9;
		transform: rotate3d(0, 0, 0, 0deg);
	}
`

const H3 = styled.h3`
	color: var(--color-black);
	text-transform: uppercase;
	text-align: center;
	font-weight: 700;
	font-size: 36px;
	line-height: 46px;
	span {
		color: var(--primary);
	}
	@media ${device.tablet} {
		font-size: 36px;
		line-height: 46px;
	}
`

const P = styled.p`
	color: var(--color-black-light);
	margin-top: 10px;
`

const CategoryLink = styled.a`
	text-transform: capitalize;
	&:hover {
		color: var(--primary);
	}
`

const CarouselImage = styled.img`
	height: 100vh;
	@media ${device.tablet} {
		height: 60vh;
	}
`

const Button = styled.a`
	display: inline-block;
	outline: none;
	border: none;
	font-weight: 600;
	padding: 10px 26px;
	font-size: 16px;
	background-color: var(--color-white);
	margin-top: 30px;
	color: var(--color-black);
	border-radius: 25px;
	&:hover {
		background: var(--primary);
		color: var(--color-white);
	}
`

const CategoryCircle = styled.div`
	top: 45%;
	opacity: 0;
	z-index: 1;
	transform: translate(10%, -30%);
	transition: all 0.2s ease-out 0s;
	text-align: center;
	position: absolute;
	left: 20px;
	right: 20px;
	h3 {
		display: block;
		font-size: 20px;
		font-weight: 600;
		color: var(--color-white);
		margin: 0;
		padding-top: 14px;
		&:hover {
			color: var(--primary);
		}
	}
`

const Index = () => {
	const { categories } = useContext(storeContext)
	const { status, data, error, isFetching } = useHomeListing()

	let deal,
		bestseller,
		videoad,
		sidebar,
		ad1 = null
	let banners = []

	if (data) {
		deal = data.deal.products.nodes
		banners = data.banners.nodes
		bestseller = data.bestseller.products.nodes
		videoad = data.videoad
		sidebar = data.sidebar
		ad1 = data.ad
	}

	return (
		<React.Fragment>
			<Head>
				<title>{`${config.siteTitle} | ${config.siteDescription}`}</title>
			</Head>
			<SEO />
			{status === 'loading' ? (
				<Loader />
			) : (
				<React.Fragment>
					<div className="grid grid-cols-1 md:grid-cols-3">
						<div className="col-span-2 relative">
							<Carousel
								showThumbs={false}
								autoPlay={true}
								interval={3000}
								infiniteLoop={true}
							>
								{banners.map((item, key) => (
									<div key={key} style={{ opacity: 0.4 }}>
										<CarouselImage src={item.sourceUrl} alt={item.title} />
									</div>
								))}
							</Carousel>
							<BC>
								<h4>{store.bannersAd}</h4>
								<Link href="/categories/clothing">
									<Button>Shop Now</Button>
								</Link>
							</BC>
						</div>

						<div className="col-span-1 relative">
							<div>
								{sidebar && (
									<img
										src={sidebar.sourceUrl}
										alt={sidebar.title}
										className="md:h-screen"
									/>
								)}
								<BannerContent style={{ padding: '10px 20px' }}>
									<h4>{store.sideAd}</h4>
								</BannerContent>
							</div>
						</div>
					</div>
					<div>
						<div className="mt-6 py-2">
							<H3 className="-mb-2">
								Shop With <span>Us</span>
							</H3>
							<P className="mb-4 text-center">
								Handpicked Favourites just for you
							</P>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mt-6 px-12">
							{categories &&
								categories
									.filter((item) => item.slug != 'uncategorized')
									.map((item) => (
										<div className="text-center" key={item.slug}>
											<Category className="relative">
												<Link href={`categories/${item.slug}`}>
													<a className="grid">
														{item.image && (
															<img
																src={item.image.sourceUrl}
																className="w-full h-auto rounded-full"
																style={{ maxHeight: 185 }}
																alt={item.title}
															/>
														)}
														<CategoryCircle>
															<h3>Product</h3>
														</CategoryCircle>
													</a>
												</Link>
											</Category>
											<h3 className="">
												<Link href={`categories/${item.slug}`}>
													<CategoryLink>{item.name}</CategoryLink>
												</Link>
											</h3>
										</div>
									))}
						</div>
						<section>
							<div className="relative mt-6 md:mt-10">
								<div className="video-grids-info grid grid-cols-1 md:grid-cols-3 items-center bg-hash">
									<div className="col-span-2">
										<Player
											poster={videoad && videoad.sourceUrl}
											aspectRatio="16:9"
										>
											<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
										</Player>
									</div>
									<div className="video-gd-left p-lg-5 p-4">
										<div className="xl:p-4 p-0 mt-4 md:mt-0">
											<H3 style={{textAlign: "left"}}>
												All Branded Women's Bags are Flat{' '}
												<span>30% Discount</span>
											</H3>
											<P>
												Visit our shop to see amazing creations from our
												designers.
											</P>
											<Link href="/">
												<Button
													style={{
														backgroundColor: 'var(--color-black)',
														color: 'var(--color-white)',
													}}
												>
													Shop Now
												</Button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</section>
						<div className="mt-6 py-6">
							<H3>
								Deals of the <span>day</span>
							</H3>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mx-4 sm:mx-6 md:mx-10 lg:mx-12">
							{deal &&
								deal.map((item) => <ProdCanvas product={item} key={item.id} />)}
						</div>
						<section>
							<div className="bg-hash py-5">
								<div className="lg:py-5 px-4 md:px-8 lg:px-12">
									<div className="block md:flex items-center">
										<div className="flex-1">
											<H3 style={{textAlign: 'left'}}>
												All Branded Men's Suits are Flat{' '}
												<span>30% Discount</span>
											</H3>
											<P>
												Visit our shop to see amazing creations from our
												designers.
											</P>
											<Link href="/">
												<Button
													style={{
														backgroundColor: 'var(--color-black)',
														color: 'var(--color-white)',
													}}
												>
													Shop Now
												</Button>
											</Link>
										</div>
										<div className="flex-1 mt-8 md:mt-0">
											{ad1 && (
												<img
													src={ad1.sourceUrl}
													className="rounded"
													alt={ad1.title}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</section>
						<div className="mt-6 py-8">
							<H3>
								Top Selling <span>Items</span>
							</H3>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mx-4 sm:mx-6 md:mx-10 lg:mx-12">
							{bestseller &&
								bestseller.map((item) => (
									<ProdCanvas product={item} key={item.id} />
								))}
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default Index
