import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { API_GRAPHQL } from './http'

export const useCategories = () => {
	return useQuery('Categories', async () => {
		const data = await request(
			API_GRAPHQL,
			gql`
				query {
					productCategories(first: 10000) {
						nodes {
							name
							slug
							count
							image {
								sourceUrl
								title
							}
						}
					}
				}
			`
		)
		return data
	})
}

export const useCategory = (variables) => {
	return useQuery('Category', async () => {
		const data = await request(
			API_GRAPHQL,
			gql`
				query CategoryPage($category: ID!) {
					category: productCategory(id: $category, idType: SLUG) {
						products {
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
