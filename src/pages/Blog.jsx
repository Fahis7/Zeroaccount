import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function Blog() {
  const { t } = useTranslation();
  const heroLines = t("blog.hero.lines", { returnObjects: true });
  const posts = t("blog.posts", { returnObjects: true });

  return (
    <>
      <PageHero
        lines={heroLines}
        crumbs={[{ label: t("nav.home"), path: "/" }, { label: t("blog.hero.breadcrumb") }]}
      />

      <section className="bg-surface py-24 dark:bg-[#0D0F12]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post, index) => (
              <ScrollReveal key={post.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-[#1A1D22]/80 dark:shadow-2xl dark:shadow-accent/5"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-2xl" />
                  </div>
                  <div className="relative z-10 flex h-40 items-center justify-center border-b border-gray-200/80 bg-gradient-to-br from-accent/10 to-accent/5 dark:border-white/10 dark:from-accent/20 dark:to-accent/10">
                    <svg
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent/60 transition-transform duration-300 group-hover:scale-110"
                    >
                      <path d="M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h5" />
                    </svg>
                  </div>
                  <div className="relative z-10 p-6">
                    <div className="font-display text-xs uppercase tracking-wide text-accent">{post.date}</div>
                    <h3 className="mt-3 font-display text-lg uppercase leading-tight text-ink dark:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/60">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wide text-accent transition-all duration-300 group-hover:gap-3">
                      {t("blog.readMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="rtl:rotate-180"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
