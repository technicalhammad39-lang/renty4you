import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { ArrowRight, Clock, User } from "@phosphor-icons/react/dist/ssr";
import BlogsClient from "./blogs-client";

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
            Investment <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Stay updated with our latest case studies, compliance checklists, and market analysis for Serviced Accommodation and Rent-to-Rent properties across the UK.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4">
        <BlogsClient initialBlogs={blogs} />
      </section>
    </main>
  );
}
