import premiumImage from '../assets/premium.webp'
import standardImage from '../assets/standard.webp'

export const rooms = [
  {
    name: 'Standard Room',
    type: 'Standard',
    price: '$129/night',
    src: standardImage,
    description: 'A bright, modern room with a queen bed and workspace for remote days.',
  },
  {
    name: 'Premium Room',
    type: 'Premium',
    price: '$199/night',
    src: premiumImage,
    description: 'Warm wood finishes, a private balcony, and elevated amenities throughout.',
  },
]