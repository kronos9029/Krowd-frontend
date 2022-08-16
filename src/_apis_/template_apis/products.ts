import { random, sample } from 'lodash';
import { paramCase } from 'change-case';
// utils
import mock from './mock';
import mockData from '../../utils/mock-data';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC',
  'KFC'
];

const PRODUCT_COLOR = [
  '#14B7CC',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];
const PRODUCT_TAGS = ['Dangal', 'The Sting', '2001: A Space Odyssey', "Singin' in the Rain"];

const PRODUCT_DESCRIPTION = `
<p><strong><small> Tổng quan dự án</small></strong></p>
<br />
<p>Dự án Hoàng Thành Pearl là tổ hợp căn hộ chung cư, shophouse và liền kề tại Cầu Diễn, Nam Từ Liêm, Hà Nội, được phát triển với tiêu chí mang đến cuộc sống hiện đại, tiện nghi tại phía Tây thủ đô. Tổ hợp Hoàng Thành Pearl gồm 1 tòa tháp cao 30 tầng nổi và 3 tầng hầm, bố trí trung tâm thương mại, dịch vụ và 336 căn hộ ở, bên cạnh là khu thấp tầng với 25 căn shophouse và liền kề.
<br />
<p>Chủ đầu tư dự án Hoàng Thành Pearl là Công ty Cổ phần Chế tạo Biến thế và Vật liệu điện Hà Nôi.</p>
<br /><br />
<p><strong><small>Hạ tầng - Quy hoạch</small></strong></p>
<p>Chung cư Roman Plaza được bao bọc xung quanh bởi quần thể công viên cây xanh, hồ nước trong lành. Công trình này được ví như một tòa tháp xanh tuyệt vời. Dự án chắc chắn sẽ mang tới cho cư dân không gian sống bình yên với mật độ phân bổ dân cư được đánh giá là thấp nhất trong khu vực.</p>
<br />
<p>Ngoài ra, Roman Plaza còn sở hữu đầy đủ tiện ích dịch vụ hiện đại như trung tâm thương mại, bể bơi, khu vui chơi cho trẻ em, trường mẫu giáo, đài phun nước, khu vườn dạo bộ, phòng tập Yoga, Gym, Spa và còn rất nhiều tiện ích khác. Các cư dân sẽ được trải nghiệm một cuộc sống trong lành và yên tĩnh nhất ngay giữa lòng thành phố sôi động.</p>
`;
const PRODUCT_SIZE = ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => ({
  id: mockData.id(index),
  cover: mockData.image.product(index),
  images: [...Array(8)].map((_, index) => mockData.image.product(index)),
  name: PRODUCT_NAME[index],
  code: `38BEE27${index}`,
  sku: `WW75K521${index}YW/SV`,
  tags: PRODUCT_TAGS,
  price: mockData.number.price(index),
  priceSale: index % 3 ? null : mockData.number.price(index),
  totalRating: mockData.number.rating(index),
  totalReview: random(9999),
  ratings: [...Array(5)].map((_, index) => ({
    name: `${index + 1} Star`,
    starCount: random(9999),
    reviewCount: random(9999)
  })),
  reviews: [...Array(20)].map((_, index) => ({
    id: mockData.id(index),
    name: mockData.name.fullName(index),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    comment: mockData.text.sentence(index),
    rating: mockData.number.rating(index),
    isPurchased: mockData.boolean(index),
    helpful: random(9999),
    postedAt: mockData.time(index)
  })),
  colors:
    (index === 1 && PRODUCT_COLOR.slice(0, 2)) ||
    (index === 2 && PRODUCT_COLOR.slice(1, 3)) ||
    (index === 3 && PRODUCT_COLOR.slice(2, 4)) ||
    (index === 4 && PRODUCT_COLOR.slice(3, 6)) ||
    (index === 23 && PRODUCT_COLOR.slice(4, 6)) ||
    (index === 24 && PRODUCT_COLOR.slice(5, 6)) ||
    PRODUCT_COLOR,
  status: index % 3 ? sample(['Đang hoạt động', '', '', '', '', '']) : 'Đang đầu tư',
  inventoryType: sample(['in_stock', 'out_of_stock', 'low_stock']),
  sizes: PRODUCT_SIZE,
  available: index % 3 === 0 ? random(19, 100) : 2,
  description: PRODUCT_DESCRIPTION,
  sold: random(999),
  createdAt: mockData.time(index),
  category: sample(['Shose', 'Apparel', 'Accessories']),
  gender: sample(['Men', 'Women', 'Kids'])
}));

// ----------------------------------------------------------------------

mock.onGet('/api/products').reply(200, { products });

// ----------------------------------------------------------------------

mock.onGet('/api/products/product').reply((config) => {
  try {
    const { name } = config.params;
    const product = products.find((_product) => paramCase(_product.name) === name);

    if (!product) {
      return [404, { message: 'product not found' }];
    }

    return [200, { product }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
