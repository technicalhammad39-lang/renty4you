import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { ArrowRight, Clock, User } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Insights & Case Studies | Rent4uSolutions",
  description: "Read our latest insights, case studies, and compliance updates for Serviced Accommodation and Council Leasing in the UK.",
};

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Investment <span className="text-gold">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Stay updated with our latest case studies, compliance checklists, and market analysis for Serviced Accommodation and Rent-to-Rent properties across the UK.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-8 flex-grow">
                    {blog.excerpt}
                  </p>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                      {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <ArrowRight size={20} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No articles published yet.</h3>
          </div>
        )}
      </section>
    </main>
  );
}
