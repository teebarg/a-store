import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import FadeLoader from 'react-spinners/FadeLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`

const Loading = styled.div`
	position: absolute;
	height: 100vh;
	width: 100%;
	z-index: 1;
	top: 0;
	background: var(--color-black-light);
	display: grid;
	align-items: center;
`

export default class Loader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
		}
	}

	render() {
		return (
			<Loading>
				<FadeLoader
					css={override}
					height={25}
					width={5}
					radius={2}
					margin={10}
					color={'var(--color-black)'}
					loading={this.state.loading}
				/>
			</Loading>
		)
	}
}
