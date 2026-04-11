
export type Product = {
  id: string;
  name: string;
  series: string;
  image: string;
  code: string;
  category: 'Top Grade' | '2-999' | 'OEM';
};

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Runner A1 Pro', series: 'Performance Series', image: '/api/placeholder/40/40', code: 'A301 - A', category: 'Top Grade' },
  { id: '2', name: 'Urban X Street', series: 'Lifestyle Collection', image: '/api/placeholder/40/40', code: 'B202 - K', category: '2-999' },
  { id: '3', name: 'Leather Lux Heritage', series: 'Premium Leather', image: '/api/placeholder/40/40', code: 'C105 - M', category: 'OEM' },
  { id: '4', name: 'Z-Flash Speed', series: 'Athletic Gear', image: '/api/placeholder/40/40', code: 'D909 - S', category: 'Top Grade' },
];


