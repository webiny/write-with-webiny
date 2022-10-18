<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { GraphQLClient, gql } from 'graphql-request';

	let slugID = $page.params.slug;
	let blog: any;
	let preview: any;
	let loading = false;

	onMount(() => main());
	export async function main() {
		loading = false;

		const endpoint = import.meta.env.VITE_PREVIEW_API_CMS_ENPOINT;

		const graphQLClient = new GraphQLClient(endpoint, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_TOKEN_SECRET}`
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
						body
					}
				}
			}
		`;
		await graphQLClient.request(query).then((res) =>
			setTimeout(() => {
				blog = JSON.stringify(
					res.listSvelteBlogs.data.find((p: { slug: string }) => p.slug === slugID)
				);
				preview = JSON.parse(blog);
				loading = true;
			}, 1000)
		);
	}

	// Fetch Error
	main().catch((error) => console.error(error));
</script>

<svelte:head>
	<title>Blog details</title>
	<meta name="description" content="Svelte blog app" />
</svelte:head>

<section>
	<a href="/"><button class="btn btn-primary">Go Back</button></a>

	{#if !loading}
		<div class="loading">
			<img src={'https://i.ibb.co/tPk7RvT/giphy.gif'} alt="a brand new sports car" />
		</div>
	{:else}
		<div class="card-wrapper">
			<div class="card">
				<div class="card-content">
					<h3>{preview && preview.title}</h3>
				</div>
				<div class="card-header">
					<img src={preview && preview.image} alt="" />
				</div>
				<div class="card-body">
					<p>{preview && preview.body}</p>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.btn {
		appearance: none;
		-webkit-appearance: none;
		font-family: sans-serif;
		cursor: pointer;
		padding: 12px;
		min-width: 100px;
		border: 0px;
		-webkit-transition: background-color 100ms linear;
		-ms-transition: background-color 100ms linear;
		transition: background-color 100ms linear;
	}
	.btn-primary {
		background: #3498db;
		color: #ffffff;
	}

	.btn-primary:hover {
		background: #2980b9;
		color: #ffffff;
	}
	.btn:focus {
		outline: 0;
	}

	.card-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		width: 860px;
		background-color: #fff;
		border-radius: 0.5rem;
	}

	.card-header {
		width: 100%;
	}

	.card-header img {
		width: 100%;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	.card-content {
		padding: 1rem;
	}

	.card-content h3 {
		margin: 1rem 0 0.5rem 0;
		font-size: 35px;
		text-align: center;
		text-transform: capitalize;
		text-decoration: underline;
	}

	.loading img {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 20%;
	}
</style>
