import type { Testimonial } from "@/types/testimonial";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  // doubled so the -50% marquee loop is seamless
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="code-label">{"// reviews"}</p>
            <h2 className="h2">What clients say</h2>
          </div>
          <p>Rated by clients on finished projects.</p>
        </div>
      </div>
      <div className="reviews">
        <div className="track">
          {loop.map((t, i) => {
            const rating = t.rating ?? 5;
            const who = [t.client_name, [t.client_position, t.client_company].filter(Boolean).join(", ")]
              .filter(Boolean)
              .join(", ");
            return (
              <figure key={`${t.id}-${i}`} suppressHydrationWarning className="glow-card review" aria-hidden={i >= testimonials.length}>
                <div className="stars" role="img" aria-label={`Rated ${rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className={n <= rating ? "" : "off"} />
                  ))}
                </div>
                <blockquote>{t.content}</blockquote>
                {who && <figcaption>{who}</figcaption>}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
