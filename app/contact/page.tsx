'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, you'd send this to your backend/email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-white to-warm-beige/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-olive mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-olive/70 leading-relaxed">
            Ready to place an order or have questions? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soft-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-serif text-olive mb-6">Place Your Order</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-sage-light/20 border border-sage rounded-lg">
                  <p className="text-sage font-medium">Thank you! We'll be in touch within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-olive mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sage-light/30 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent outline-none transition-all"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-olive mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sage-light/30 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-olive mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sage-light/30 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent outline-none transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="orderType" className="block text-sm font-medium text-olive mb-2">
                    What are you interested in? *
                  </label>
                  <select
                    id="orderType"
                    name="orderType"
                    required
                    value={formData.orderType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-sage-light/30 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="new-mom">Products for New Moms</option>
                    <option value="kids">Products for Kids</option>
                    <option value="both">Both New Moms & Kids</option>
                    <option value="custom">Custom Order</option>
                    <option value="question">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-olive mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-sage-light/30 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your order or question. Include any dietary restrictions, quantity needed, and preferred delivery date."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-sage text-soft-white rounded-full hover:bg-olive transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>

                <p className="text-sm text-olive/60 text-center">
                  We typically respond within 24 hours
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-gradient-to-br from-sage to-olive rounded-2xl p-8 text-soft-white shadow-xl">
                <h3 className="text-2xl font-serif mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hello@nourishbakes.com" className="text-sage-light hover:text-soft-white transition-colors">
                        hello@nourishbakes.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:5551234567" className="text-sage-light hover:text-soft-white transition-colors">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sage-light">Mon-Fri: 9am - 6pm</p>
                      <p className="text-sage-light">Sat: 10am - 4pm</p>
                      <p className="text-sage-light">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif text-olive mb-6">Quick Answers</h3>
                <div className="space-y-4 text-olive/80">
                  <div>
                    <h4 className="font-semibold text-olive mb-1">Minimum Order?</h4>
                    <p>No minimum! Order as little or as much as you need.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive mb-1">Delivery Options?</h4>
                    <p>Local delivery within 20 miles, or pickup at our kitchen.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive mb-1">Shelf Life?</h4>
                    <p>Fresh treats last 5-7 days refrigerated, or freeze for up to 3 months.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-olive mb-1">Custom Orders?</h4>
                    <p>Absolutely! We love creating custom treats for dietary needs.</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-warm-beige rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif text-olive mb-4">Follow Us</h3>
                <p className="text-olive/70 mb-6">
                  See our latest creations and get baking tips!
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-soft-white hover:bg-olive transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-soft-white hover:bg-olive transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
