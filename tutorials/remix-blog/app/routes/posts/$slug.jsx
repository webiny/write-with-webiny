import { useParams, Link, useLoaderData } from '@remix-run/react';
import { RichTextRenderer } from '@webiny/react-rich-text-renderer';

export const loader = async () => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.WEBINY_API_TOKEN}`,
	};

	const graphqlQuery = {
		query: `
			query getPerPost {
				listPosts {
					data  {
						title
							slug
							description
							featuredImage
							body
							authors{
									name
									description
									picture
							}
						}
					}
				}
  	`,
	};

	const data = {
		posts: await fetch(process.env.REMIX_PUBLIC_WEBINY_API_URL, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(graphqlQuery),
		}),
	};

	const posts = await data.posts.json();
	const results = posts.data.listPosts.data;

	return results;
};

export default function Slug() {
	const params = useParams();
	const posts = useLoaderData();
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) return;

	return (
		<div className="">
			<div className="container py-3 mx-auto mb-8 space-y-6 ml-50">
				<Link
					to="/posts"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					<svg
						className="w-4 h-4 mr-2 "
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
							clipRule="evenodd"
						></path>
					</svg>
					BACK
				</Link>
				<h1 className="text-4xl font-bold">{post.title}</h1>
				<div className="flex items-center gap-4 mb-10">
					<img
						className="rounded-full w-7 h-7"
						src={post.authors.picture}
						alt={post.title}
					/>
					<p className="text-xl">{post.authors.name}</p>
				</div>
				<figure className="relative mb-10 overflow-hidden shadow-md">
					<img
						src={post.featuredImage}
						alt={post.title}
						className="object-cover object-top rounded-t-lg shadow-lg w-200 lg:rounded-lg"
					/>
				</figure>
				<RichTextRenderer data={post.body} />
			</div>
		</div>
	);
}
