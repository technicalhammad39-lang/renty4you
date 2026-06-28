import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getBlogs } from "@/lib/firebase/firestore";
import { ArrowLeft, Clock, User, ShareNetwork, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.title} | Rent4uSolutions Insights`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl || blog.image || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1664&auto=format&fit=crop'],
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl || blog.image || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1664&auto=format&fit=crop'],
    }
  };
}

import { ReadingProgressBar } from '@/components/reading-progress-bar';

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 3);

  // Native JS date formatting (no dependencies)
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  }).format(new Date(blog.createdAt));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: [blog.image],
    datePublished: new Date(blog.createdAt).toISOString(),
    author: [{
      '@type': 'Person',
      name: blog.author
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Rent4uSolutions'
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-28 pb-24">
      <ReadingProgressBar />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} weight="bold" />
          Back to Insights
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="text-slate-900 dark:text-white font-bold">{blog.author}</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <CalendarBlank size={18} />
              {formattedDate}
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              {blog.readTime}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-16 shadow-lg">
          <Image 
            src={blog.imageUrl || blog.image || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1664&auto=format&fit=crop'} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none mb-20
            prose-headings:font-black prose-headings:tracking-tight
            prose-a:text-primary hover:prose-a:text-primary/80 prose-a:font-bold prose-a:no-underline
            prose-img:rounded-2xl prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer actions */}
        <div className="flex justify-between items-center py-8 border-t border-slate-100 dark:border-slate-800">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary">
            <ShareNetwork size={18} weight="bold" />
            Share Article
          </button>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-24 mt-20 border-t border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map(related => (
                <Link href={`/blog/${related.slug}`} key={related.id} className="group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4 bg-slate-100 dark:bg-slate-800">
                    <Image src={related.imageUrl || related.image || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1664&auto=format&fit=crop'} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {related.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
