'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import ImageLightbox from './ImageLightbox';
import { urlFor } from '@/lib/sanity';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: string;
  image?: any;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const largeImageUrl = product.image ? urlFor(product.image).width(1200).height(1200).url() : '';

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantityLabel: product.quantity,
      image: product.image,
    });
  };

  return (
    <div className="product">
      {product.image ? (
        <ImageLightbox imageUrl={largeImageUrl} imageName={product.name}>
          <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
            <Image
              src={urlFor(product.image).width(600).height(600).url()}
              alt={`product photo · ${product.name}`}
              fill
              sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
              style={{objectFit: 'cover'}}
            />
          </div>
        </ImageLightbox>
      ) : (
        <div className="ph tint-coral"></div>
      )}
      <div className="body">
        <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>
          {product.quantity.toUpperCase()}
        </div>
        <h3>{product.name}</h3>
        <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
          {product.description}
        </p>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'}}>
          <div className="price">${product.price}</div>
          <button
            className="btn btn-coral btn-sm add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
