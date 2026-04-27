import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/siteContent";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  const related = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);

  if (!post) {
    return <div className="rounded-2xl border border-dashed bg-white p-10 text-center">Post not found.</div>;
  }

  return (
    <article className="mx-auto max-w-3xl">
      <img src={post.image} alt={post.title} className="h-72 w-full border border-black/35 rounded-2xl object-cover hover:shadow-lg transition-shadow" />
      <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">{post.category}</p>
      <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-neutral-700">{post.content}</p>
      <h2 className="mt-10 text-xl font-semibold">Related Articles</h2>
      <div className="mt-3 space-y-2">
        {related.map((item) => (
          <Link key={item.id} to={`/blog/${item.slug}`} className="block rounded-xl border border-black/35 bg-white p-3">
            {item.title}
          </Link>
        ))}
      </div>
    </article>
  );
}
