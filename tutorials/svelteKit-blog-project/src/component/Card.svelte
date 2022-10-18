<script lang="ts">
	export let blog: any[] = [];
</script>

<main class="container">
	{#each blog as blog}
		<div class="card-container">
			<a href={`/blog/${blog.slug}`}>
				<div class="card-image">
					<img src={blog.image} alt="a brand new sports car" />
				</div>
				<div class="card-body">
					<span class="card-badge card-badge-blue">{blog.slug}</span>
					<h1>{blog.title}</h1>
					<p class="card-subtitle">{blog.description.slice(0, 80)}</p>
					<div class="card-link">Read more</div>
				</div>
			</a>
		</div>
	{/each}
</main>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 20px;
	}

	.card-container {
		width: 350px;
		height: 480px;
		background-color: #fff;
		border-radius: 8px;
		margin: auto;
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	.card-container a {
		text-decoration: none;
		color: #000000;
	}

	.card-image img {
		height: 220px;
		width: 100%;
		border-radius: 8px 8px 0 0;
		background-size: cover;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: start;
		padding: 16px;
		min-height: 200px;
	}

	.card-badge {
		text-transform: uppercase;
		background-color: #fff;
		color: #fff;
		padding: 2px 8px;
		border-radius: 70px;
		margin: 0;
		font-size: 12px;
	}

	.card-badge-blue {
		background-color: #92d4e4;
	}

	.card-body h1 {
		font-size: 16px;
		margin: 8px 0;
	}

	.card-body p {
		font-size: 14px;
		margin: 8px 0 16px 0;
	}

	.card-link {
		font-size: 16px;
		margin: 8px 0 16px 0;
	}

	@media screen and (max-width: 1000px) {
		.container {
			grid-template-columns: 1fr;
		}
	}
</style>
