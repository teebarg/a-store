import React from 'react'
import styled from '@emotion/styled'

const Span = styled.span`
	position: absolute;
	animation: beat 1s ease infinite alternate;
	background-color: #ff0000;
	@keyframes beat {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.1);
		}
	}
`

const Badge = () => {
	return (
		<Span className="inline-block text-white px-4 rounded-full text-xs ml-2 mt-3">
			On Sale
		</Span>
	)
}

export default Badge
