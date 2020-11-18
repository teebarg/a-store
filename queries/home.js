import {
	useQuery,
} from 'react-query';
import { request, gql } from 'graphql-request';
import { API_GRAPHQL } from './http';

export const useHomeListing = () => {
	return useQuery('home', async () => {
		const data = await request(
			API_GRAPHQL,
			gql`
				query {
					deal: productTag(id: "deal", idType: SLUG) {
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
					bestseller: productTag(id: "bestseller", idType: SLUG) {
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
					banners: mediaItems(where: {search: "banner"}) {
						nodes {
							title
							sourceUrl
						}
					}
					sidebar: mediaItem(id: "sidebar", idType: SLUG) {
						sourceUrl
						title
					}
					ad: mediaItem(id: "homead-1", idType: SLUG) {
						sourceUrl
						title
					}
					videoad: mediaItem(id: "videoad-1", idType: SLUG) {
						sourceUrl
						title
					}
				}
			`
		)
		return data
	})
}
