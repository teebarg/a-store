import React, { useContext } from 'react'
import storeContext from '../util/context'
import Link from 'next/link'
import styled from '@emotion/styled'

const Li = styled.li`
	border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`
const Category = () => {
	const { categories } = useContext(storeContext)

	return (
		<div className="h-full">
			<ul className="list-none">
				{categories &&
					categories
						.filter((item) => item.slug != 'uncategorized')
						.map((category, key) => (
							<Li
								key={key}
								className="hover:bg-gray-100 py-1 flex justify-between items-center mt-2"
							>
								<Link href={`/categories/${category.slug}`}>
									<a className="no-underline text-gray-600">{category.name}</a>
								</Link>
								<span className="rounded-full text-xs bg-gray-900 text-white inline-block px-2">
									{category.count}
								</span>
							</Li>
						))}
			</ul>
		</div>
	)
}

export default Category
