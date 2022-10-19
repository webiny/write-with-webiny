<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../component/Card.svelte';
	import { GraphQLClient, gql } from 'graphql-request';
	/** @type {import('./$types').PageData} */
	export let data: any;


	let blog: any[];
	let loading = false;

	onMount(() => main());

	export async function main() {
		loading = false;
		const endpoint = import.meta.env.VITE_PUBLIC_CMS_ENPOINT;
		const secret_token = data.token

		const graphQLClient = new GraphQLClient(endpoint, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${secret_token}`
			}
		});

		const query = gql`
			{
				listSvelteBlogs {
					data {
						title
						description
						image
						slug
					}
				}
			}
		`;
		await graphQLClient.request(query).then((res) =>
			setTimeout(() => {
				blog = res.listSvelteBlogs.data;
				loading = true;
			}, 1000)
		);
	}

	// Fetch Error
	main().catch((error) => console.error(error));
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte blog app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">Create a blog with Webiny and Svelte / SvelteKit </span>
	</h1>

	{#if !loading}
		<div class="loading">
			<img src={'https://i.ibb.co/tPk7RvT/giphy.gif'} alt="a brand new sports car" />
		</div>
	{:else}
		<Card {blog} />
	{/if}

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		background-color: rgba(36, 34, 34, 0.89);
		padding: 4.7rem 0px;
	}

	.welcome {
		text-align: center;
		font-size: 28px;
		text-transform: capitalize;
		color: #ffffff;
	}
	h1 {
		margin-bottom: 3rem;
	}
</style>
