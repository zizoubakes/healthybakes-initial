import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-white to-warm-beige/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-olive mb-6">
            Our Story
          </h1>
          <p className="text-xl text-olive/70 leading-relaxed">
            A mother's journey to nourish families with wholesome, delicious treats
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soft-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-light/30 to-warm-beige flex items-center justify-center">
                <p className="text-olive/40 text-lg text-center px-8">
                  [Your photo here]<br/>
                  <span className="text-sm">Warm, personal photo of you baking</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-serif text-olive mb-6">
                From My Kitchen to Your Family
              </h2>
              <div className="space-y-4 text-olive/80 leading-relaxed text-lg">
                <p>
                  Hi, I'm Zineb (Zizou), a passionate baker and mother who believes that
                  healthy eating should never mean sacrificing flavor or joy.
                </p>
                <p>
                  My journey began when I became a new mother and struggled to find nutritious,
                  delicious treats that supported my recovery and my growing baby's needs.
                  Everything in stores was either loaded with sugar or tasted like cardboard.
                </p>
                <p>
                  So I started experimenting in my kitchen, using organic fruits, dates, nuts,
                  and minimal sugar to create treats that were both nourishing and delicious.
                  Friends and family loved them, and Zizou's Healthy Bakes was born.
                </p>
                <p>
                  Today, I'm proud to share these recipes with families who want the best for
                  their loved ones—without compromising on taste or nutrition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-warm-beige/20 to-soft-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-olive mb-4">
              What We Believe
            </h2>
            <p className="text-lg text-olive/70 max-w-2xl mx-auto">
              Our core values guide every recipe and every ingredient choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-sage-light/30 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-olive mb-4">Quality Ingredients</h3>
              <p className="text-olive/70 leading-relaxed">
                We use only certified organic fruits, nuts, and dates. Every ingredient is
                carefully sourced from trusted suppliers who share our commitment to purity and sustainability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-terracotta/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-olive mb-4">Transparency</h3>
              <p className="text-olive/70 leading-relaxed">
                No hidden ingredients, no misleading labels. We list every ingredient clearly
                and honestly because you deserve to know exactly what you're feeding your family.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-warm-beige rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-olive mb-4">Made with Love</h3>
              <p className="text-olive/70 leading-relaxed">
                Every batch is handcrafted in small quantities to ensure freshness and quality.
                We treat each order as if we're baking for our own family—because we are.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-sage-light/30 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-olive mb-4">Sustainability</h3>
              <p className="text-olive/70 leading-relaxed">
                We're committed to reducing our environmental impact through eco-friendly packaging,
                local sourcing when possible, and minimal waste practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthy Matters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soft-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-olive mb-6">
              Why Reduced Sugar Matters
            </h2>
            <p className="text-lg text-olive/70 leading-relaxed">
              We're not anti-sugar, we're pro-nutrition. Here's why we choose to minimize refined sugars:
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="space-y-6 text-olive/80 leading-relaxed">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-sage mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-olive mb-2">For New Mothers</h3>
                  <p>Stable blood sugar levels support better energy, mood, and milk production during the demanding postpartum period.</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-sage mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-olive mb-2">For Growing Children</h3>
                  <p>Reducing refined sugar helps establish healthy eating patterns, prevents energy crashes, and supports proper development.</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-sage mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-olive mb-2">Natural Sweetness</h3>
                  <p>We use dates, which provide natural sweetness along with fiber, vitamins, and minerals—unlike empty calories from refined sugar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage text-soft-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Ready to Try NourishBakes?
          </h2>
          <p className="text-xl mb-8 text-sage-light leading-relaxed">
            Join our community of health-conscious families. Order today and discover
            treats that truly nourish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-block px-8 py-4 bg-soft-white text-sage rounded-full hover:bg-warm-beige transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-transparent border-2 border-soft-white text-soft-white rounded-full hover:bg-soft-white hover:text-sage transition-all duration-200 font-medium text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
