import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { API_GRAPHQL } from './http'

console.log(API_GRAPHQL)
export const useProduct = (variables) => {
	return useQuery('Product', async () => {
		const data = await request(
			API_GRAPHQL,
			gql`
				query ProductPage($product: ID!) {
					product(id: $product, idType: SLUG) {
						... on SimpleProduct {
							id
							name
							slug
							averageRating
							reviewCount
							salePrice
							regularPrice
							onSale
							productId
							galleryImages {
								nodes {
									sourceUrl
								}
							}
							productCategories {
								nodes {
									name
									slug
								}
							}
							description
							sku
							link
							related {
								nodes {
									... on SimpleProduct {
										id
										name
										slug
										averageRating
										reviewCount
										salePrice
										regularPrice
										onSale
										image {
											sourceUrl
										}
										productCategories {
											nodes {
												name
											}
										}
										description
										sku
										link
									}
								}
							}
						}
					}
					banner: mediaItem(id: "category-ad", idType: SLUG) {
						sourceUrl
						title
					}
				}
			`,
			variables
		)
		return data
	})
}
