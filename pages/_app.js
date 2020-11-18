import React from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import App from 'next/app'
import '../styles/tailwind.css'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import AppProvider from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class MyApp extends App {
	// static async getInitialProps({ Component, ctx }) {
	// 	return {
	// 		pageProps: {
	// 			// Call page-level getInitialProps
	// 			...(Component.getInitialProps
	// 				? await Component.getInitialProps(ctx)
	// 				: {}),
	// 		},
	// 	}
	// }

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe')
			axe(React, ReactDOM, 1000)
		}
	}

	render() {
		const { Component, pageProps } = this.props
		const queryCache = new QueryCache({
			defaultConfig: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})

		return (
			<>
				<Head>
					<title>Todo App</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta name="twitter:card" content="summary_large_image" />
				</Head>
				<ReactQueryCacheProvider queryCache={queryCache}>
					<AppProvider>
						<Header />
						<Component {...pageProps} />
						<Footer />
					</AppProvider>
				</ReactQueryCacheProvider>
			</>
		)
	}
}
