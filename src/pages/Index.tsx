import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Mail, Award, Users, Heart
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProductCard } from "@/components/ProductCard";
import { PremiumHeroBanner } from "@/components/PremiumHeroBanner";
import { ContactSection } from "@/components/ContactSection";
import { InfiniteServiceCarousel } from "@/components/InfiniteServiceCarousel";
import { useBanners } from "@/hooks/use-banners";
import { useProducts } from "@/hooks/use-products";
import { categories, services } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

import bannerServices from "@/assets/banner-services.jpg";
import warrantyBadge from "@/assets/warranty-badge.png";

import serviceLaptops from "@/assets/service-laptops.jpg";
import serviceDesktops from "@/assets/service-desktops.jpg";
import servicePrinters from "@/assets/service-printers.jpg";
import serviceAccessories from "@/assets/service-accessories.jpg";
import serviceRepair from "@/assets/service-repair.jpg";

const serviceCards = [
  { image: serviceLaptops, label: "Laptops", link: "/category/dell-laptop" },
  { image: serviceDesktops, label: "Desktops", link: "/category/cpu-desktop" },
  { image: servicePrinters, label: "Printers", link: "/category/printers" },
  { image: serviceAccessories, label: "Accessories", link: "/category/keyboards" },
  { image: serviceRepair, label: "Repair Services", link: "/services" },
];

const trustStats = [
  { icon: Star, value: "4.8★", label: "Google Rating", color: "text-yellow-500", link: "https://g.co/kgs/chauhan-computers" },
  { icon: Award, value: "4.7★", label: "JustDial Rating", color: "text-primary", link: "https://www.justdial.com/Jaipur/Chauhan-Computers" },
  { icon: Users, value: "10,000+", label: "Customers Served", color: "text-cyan", link: undefined },
  { icon: Heart, value: "Since 2010", label: "Still Serving", color: "text-red-500", link: undefined },
];

const fallbackPromos = [
  { image: warrantyBadge, title: "Warranty on All Products", subtitle: "Hardware warranty — terms apply", link: "/contact" },
  { image: bannerServices, title: "Expert Repair & IT Services", subtitle: "Certified technicians for all brands", link: "/services" },
];

const customerVideos = [
  { embedUrl: "https://www.instagram.com/reel/C8xQvJ_y8Zf/embed", caption: "Happy Customer Review" },
  { embedUrl: "https://www.instagram.com/reel/C7kL2zxyKQz/embed", caption: "Customer Experience" },
  { embedUrl: "https://www.instagram.com/reel/C6Yp4v_SXQK/embed", caption: "Store Visit Review" },
];

function PromoBannerCard({ image, title, subtitle, link }: { image: string; title: string; subtitle: string; link: string }) {
  return (
    <section className="py-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <Link to={link} className="block rounded-xl overflow-hidden relative group">
          <img src={image} alt={title} className="w-full h-[120px] sm:h-[160px] md:h-[180px] object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 sm:px-8">
            <div>
              <h3 className="text-white text-sm sm:text-lg md:text-2xl font-bold">{title}</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">{subtitle}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-3 sm:p-4">
          <Skeleton className="w-full aspect-square rounded-lg mb-3" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const { data: dbPromos } = useBanners("home", "promo");
  const { data: products = [], isLoading } = useProducts();

  const promos = dbPromos && dbPromos.length > 0
    ? dbPromos.map(b => ({ image: b.image_url, title: b.title, subtitle: b.subtitle || "", link: b.cta_link }))
    : fallbackPromos;

  const bestSellers = products.filter((p) => p.badge).slice(0, 8);

  return (
    <div className="bg-background">
      <PremiumHeroBanner />

      {/* Trust Stats Bar - smaller */}
      <section className="py-3 sm:py-4 bg-muted/30 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {trustStats.map((stat, i) => {
              const inner = (
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-card rounded-lg border border-border text-center justify-center">
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">{stat.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  {stat.link ? (
                    <a href={stat.link} target="_blank" rel="noopener noreferrer" className="block hover:shadow-md transition-shadow rounded-lg">
                      {inner}
                    </a>
                  ) : inner}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by Brand — Top & Sticky with gradient */}
      <section className="py-6 sm:py-8 sticky top-14 sm:top-16 z-30 border-b border-border" style={{ background: "linear-gradient(135deg, #000000 0%, #1a1a1a 40%, #b8860b 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-5">Shop by Brand</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Link to={`/category/${cat.slug}`}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-yellow-500/40 transition-all group">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform" loading="lazy" />
                  </div>
                  <span className="text-[10px] sm:text-sm font-medium text-white text-center leading-tight">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {promos[0] && <PromoBannerCard {...promos[0]} />}

      {/* Store Video - smaller heading area */}
      <section className="py-4 sm:py-6 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-base sm:text-xl font-bold text-foreground mb-3">Visit Our Store</h2>
          <div className="rounded-xl overflow-hidden border border-border aspect-video max-h-[350px]">
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=chauhancomputersco"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Chauhan Computers Store"
            />
          </div>
        </div>
      </section>

      {promos[1] && <PromoBannerCard {...promos[1]} />}

      {/* Best Sellers */}
      <section className="py-8 sm:py-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Best Sellers</h2>
            <Link to="/category/hp-laptop" className="text-primary text-xs sm:text-sm font-medium hover:underline">View All →</Link>
          </div>
          {isLoading ? <ProductGridSkeleton /> : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {bestSellers.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Services */}
      <section className="py-8 sm:py-10 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Our Services</h2>
            <Link to="/services" className="text-primary text-xs sm:text-sm font-medium hover:underline">View All →</Link>
          </div>
          <InfiniteServiceCarousel cards={serviceCards} />
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-8 sm:py-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-5">Repair & IT Services</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <Link to="/services" className="group block">
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/20 transition-all">
                    <div className="h-28 sm:h-36 overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">{service.name}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Video Testimonials */}
      <section className="py-8 sm:py-10 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-5">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {customerVideos.map((video, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  <div className="aspect-[9/16] sm:aspect-[9/14] max-h-[400px]">
                    <iframe
                      src={video.embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      title={video.caption}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground">{video.caption}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Newsletter */}
      <section className="py-8 sm:py-10 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3" />
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2">Stay Updated</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">Get notified about new products and exclusive offers.</p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 px-3 sm:px-4 py-2.5 bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 border border-border" />
              <button type="submit" className="px-4 sm:px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
