import { Link } from "react-router-dom";
import { blogPosts } from "../data/siteContent";

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Style Journal</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border border-black/35 bg-white">
            <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{post.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold underline">Read more</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
