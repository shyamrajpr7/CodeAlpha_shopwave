export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (!target.dataset.retried) {
    target.dataset.retried = '1';
    target.src = `https://placehold.co/600x600/1a1a2e/7c3aed?text=${encodeURIComponent(target.alt || 'Product')}`;
  }
}

export const PLACEHOLDER_IMG = 'https://placehold.co/600x600/1a1a2e/7c3aed?text=Product';
