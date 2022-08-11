import { Link, useLoaderData } from '@remix-run/react';

export const loader = async () => {
	const data = {
		posts: await fetch(process.env.REMIX_PUBLIC_WEBINY_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.WEBINY_API_TOKEN}`,
			},
			body: JSON.stringify({
				query: `
					query PostSlugs {
						listPosts {
							data {
									title
									slug
									description
									featuredImage
									authors {
											name
											description
											picture
									}
								}
							}
						}
        `,
			}),
		}),
	};
	const posts = await data.posts.json();
	const results = posts.data.listPosts.data;

	return results;
};

export default function PostItem() {
	const results = useLoaderData();
	return (
		<>
			<h1 className='mt-40 text-3xl font-bold text-center"'>Blog Posts</h1>
			<div className="flex-wrap px-4 mt-8 space-y-4 overflow-hidden md:flex md:justify-evenly md:items-center">
				{results.map((result) => (
					<div
						key={result.slug}
						className="max-w-md gap-2 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
					>
						<img className="w-full" src={result.featuredImage} alt={result.title} />
						<div>
							<Link to={result.slug}>
								<h1 className="mb-2 ml-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{result.title}
								</h1>
							</Link>

							<p className="mb-3 ml-3 font-normal text-gray-700 dark:text-gray-400">
								{result.description}
							</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center justify-between gap-2">
									<div className="ml-3 overflow-hidden rounded-full w-7 h-7">
										<img
											src={result.authors.picture}
											className="w-fit h-fit"
											alt=""
										/>
									</div>
									<p>{result.authors.name}</p>
								</div>
								<Link
									to={result.slug}
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Read more
									<svg
										className="w-4 h-4 ml-2 -mr-1"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
