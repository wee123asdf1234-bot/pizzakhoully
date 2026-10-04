export interface RestaurantInfo {
  name: string;
  category: string;
  sloganEditable: string;
  location: string;
  city: string;
  phone: string;
  plusCode: string;
  priceRange: string;
  pricePerPersonRange: string;
  rating: number;
  maxRating: number;
  reviewCount: number;
  openingStatus: string;
  isOpen24Hours: boolean;
  editorialReviewSummary: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pizza' | 'pastries' | 'sandwiches' | 'meals' | 'drinks' | 'offers';
  description: string;
  price?: number;
  priceFormatted?: string;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  isSpecialOffer?: boolean;
  isKnownSupplied?: boolean;
  calories?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  authorBadge?: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
  sentiment: 'positive' | 'neutral' | 'critical';
  highlights?: string[];
  ownerResponse?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'pizza' | 'ambiance' | 'menu' | 'video';
  image: string;
  caption?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  items: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  fullName: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
}
