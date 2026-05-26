'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const products = [
  {
    id: 1,
    name: 'Lactation Energy Balls',
    category: 'new-moms',
    description: 'Packed with oats, flaxseed, and dates to support healthy milk production. Rich in iron and omega-3 fatty acids.',
    ingredients: 'Organic oats, dates, flaxseed, almonds, coconut, vanilla',
    benefits: ['Supports lactation', 'High in iron', 'Energy boost', 'Omega-3 rich'],
    price: '$24.99'
  },
  {
    id: 2,
    name: 'Postpartum Recovery Cookies',
    category: 'new-moms',
    description: 'Nourishing cookies designed to support recovery with protein, fiber, and essential nutrients.',
    ingredients: 'Almond flour, dates, chia seeds, walnuts, dark chocolate chips',
    benefits: ['Protein-rich', 'Anti-inflammatory', 'Energy sustaining', 'Mood support'],
    price: '$22.99'
  },
  {
    id: 3,
    name: 'Banana Nut Mini Muffins',
    category: 'kids',
    description: 'Wholesome breakfast treats with real bananas, walnuts, and zero refined sugar. Perfect for little hands.',
    ingredients: 'Organic bananas, whole wheat flour, walnuts, eggs, honey',
    benefits: ['No refined sugar', 'Whole grains', 'Brain food', 'Kid-sized portions'],
    price: '$18.99'
  },
  {
    id: 4,
    name: 'Veggie Power Muffins',
    category: 'kids',
    description: 'Secretly nutritious muffins packed with carrots, zucchini, and apple. Kids love them!',
    ingredients: 'Carrots, zucchini, apple, oat flour, cinnamon, raisins',
    benefits: ['Hidden vegetables', 'Naturally sweet', 'Fiber-rich', 'No added sugar'],
    price: '$19.99'
  },
  {
    id: 5,
    name: 'Date & Almond Bars',
    category: 'all',
    description: 'Naturally sweet energy bars perfect for busy families on the go. Just 4 simple ingredients.',
    ingredients: 'Medjool dates, almonds, coconut oil, sea salt',
    benefits: ['Natural energy', 'Plant-based protein', 'Portable snack', 'Minimal ingredients'],
    price: '$26.99'
  },
  {
    id: 6,
    name: 'Oat & Berry Breakfast Bites',
    category: 'all',
    description: 'Grab-and-go breakfast bites loaded with organic berries and wholesome oats.',
    ingredients: 'Rolled oats, mixed berries, almond butter, maple syrup',
    benefits: ['Antioxidant-rich', 'Quick breakfast', 'Heart-healthy', 'Kid-approved'],
    price: '$21.99'
  },
  {
    id: 7,
    name: 'Pumpkin Seed Power Bites',
    category: 'new-moms',
    description: 'Zinc-rich bites to support immune health and recovery for new mothers.',
    ingredients: 'Pumpkin seeds, dates, cacao nibs, coconut, ginger',
    benefits: ['Immune support', 'Zinc-rich', 'Anti-inflammatory', 'Energy boost'],
    price: '$23.99'
  },
  {
    id: 8,
    name: 'Apple Cinnamon Oat Bars',
    category: 'kids',
    description: 'Soft, chewy bars with real apple chunks and warming cinnamon. Lunchbox favorite!',
    ingredients: 'Apples, oats, cinnamon, almond butter, coconut sugar',
    benefits: ['Real fruit', 'Satisfying fiber', 'No artificial flavors', 'Allergy-friendly'],
    price: '$20.99'
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory || p.category === 'all');

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-white to-warm-beige/20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-olive mb-6">
            Our Products
          </h1>
          <p className="text-xl text-olive/70 max-w-3xl mx-auto">
            Every treat is handcrafted with organic ingredients, reduced sugar, and lots of love.
            Choose what's right for your family.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-sage-light/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-sage text-soft-white shadow-lg'
                  : 'bg-warm-beige/50 text-olive hover:bg-warm-beige'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('new-moms')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === 'new-moms'
                  ? 'bg-sage text-soft-white shadow-lg'
                  : 'bg-warm-beige/50 text-olive hover:bg-warm-beige'
              }`}
            >
              For New Moms
            </button>
            <button
              onClick={() => setSelectedCategory('kids')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === 'kids'
                  ? 'bg-sage text-soft-white shadow-lg'
                  : 'bg-warm-beige/50 text-olive hover:bg-warm-beige'
              }`}
            >
              For Kids
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soft-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-56 bg-gradient-to-br from-sage-light/30 via-warm-beige to-terracotta/20 flex items-center justify-center">
                  <p className="text-olive/40 text-center px-4">[Product Photo]</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-sage-light/20 text-sage rounded-full">
                      {product.category === 'new-moms' ? 'New Moms' : product.category === 'kids' ? 'Kids' : 'All Ages'}
                    </span>
                    <span className="text-xl font-bold text-olive">{product.price}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-olive mb-3">{product.name}</h3>
                  <p className="text-olive/70 mb-4 leading-relaxed">{product.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-olive mb-2">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 bg-warm-beige text-olive rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-soft-white rounded-lg">
                    <h4 className="font-semibold text-olive text-sm mb-1">Ingredients:</h4>
                    <p className="text-sm text-olive/70">{product.ingredients}</p>
                  </div>

                  <button className="w-full px-6 py-3 bg-sage text-soft-white rounded-full hover:bg-olive transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-beige/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-olive mb-4">
            Custom Orders Welcome!
          </h2>
          <p className="text-lg text-olive/70 mb-8">
            Need something special? We can create custom treats for your family's specific dietary needs.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-sage text-soft-white rounded-full hover:bg-olive transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
