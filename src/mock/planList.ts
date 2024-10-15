// export const plans = [
//   {
//     id: '1',
//     name: 'MASTER',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '6 photos', '30 weeks on duration', 'Always on top of page',
//       'Hight on page', 'Video', 'Full description',
//     ],
//     price: 'U$ 85,00',
//     maxFiles: 30,
//     video: 3,
//     is_on_sale: false,
//     is_active: false,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '2',
//     name: 'PREMIUM',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '5 photos', '10 weeks on duration', 'Always on top of page',
//       'Hight on page', 'Video', 'Full description',
//     ],
//     price: 'U$ 100,00',
//     maxFiles: 30,
//     video: 3,
//     is_active: false,
//     is_on_sale: false,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '3',
//     name: 'ENHANCED',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '30 photos', '15 weeks on duration', 'Always on top of page',
//       'Hight on page', '1 Video', 'Full description',
//     ],
//     price: 'U$ 45,00',
//     maxFiles: 30,
//     video: 1,
//     is_active: false,
//     is_on_sale: false,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '4',
//     name: 'CLASSIC',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '20 photos', '10 weeks on duration', 'Always on top of page',
//       'Hight on page', '1 Video', 'Full description',
//     ],
//     price: 'U$ 35,00',
//     maxFiles: 20,
//     video: 1,
//     is_active: false,
//     is_on_sale: false,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '5',
//     name: 'BASIC',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       ' 15 photos', '6 weeks on duration', 'Full description',
//     ],
//     price: 'U$ 35,00',
//     maxFiles: 10,
//     video: 0,
//     is_active: false,
//     is_on_sale: false,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '6',
//     name: 'FREE LIMITED TIME',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '10 photos', '8 week on duration', 'Full description'
//     ],
//     price: 'Free for now',
//     maxFiles: 5,
//     video: 0,
//     is_active: false,
//     is_on_sale: true,
//     promotionEndDate: '2024-12-10',
//   },
//   {
//     id: '7',
//     name: 'FREE',
//     description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
//     item: [
//       '20 photos', '1 week on duration'
//     ],
//     price: 'Free for now',
//     maxFiles: 3,
//     video: 0,
//     is_active: false,
//     is_on_sale: false,
//     promotionEndDate: '2024-12-10',
//   },
// ];



interface Plan {
  id: string;
  name: string;
  description: string;
  item: string[];
  price: string;
  isOnSale?: boolean;
  is_active?: boolean;
  maxFiles: number;
  video: number;
  saleEndDate: string;
}

export const plans: Plan[] = [
  {
    id: '1',
    name: 'MASTER',
    description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
    item: ['Photos unlimited', '30 weeks on duration', 'Always on top of page', 'Hight on page', '3 Video', 'Full description', 'Carousel', 'Slider top'],
    price: 'U$ 85,00',
    isOnSale: false,
    maxFiles: 30,
    video: 3,
    is_active: false,
    saleEndDate: '2024-12-10',
  },
  {
    id: '2',
    name: 'PREMIUM',
    description: 'Listing customization, access to potential customers, sales concierge',
    item: ['50 photos', '20 weeks on duration', 'Always on top of page', 'Hight on page', '2 Video', 'Full description'],
    price: 'U$ 70,00',
    isOnSale: true,
    maxFiles: 30,
    video: 2,
    is_active: false,
    saleEndDate: '2024-12-10',
  },
  {
    id: '3',
    name: 'ENHANCED',
    description: 'Premium highlight, maximum listing duration, exposure and VIP support.',
    item: [
      '30 photos', '15 weeks on duration', 'Always on top of page',
      'Hight on page', '1 Video', 'Full description',
    ],
    price: 'U$ 45,00',
    isOnSale: false,
    maxFiles: 30,
    video: 1,
    is_active: false,
    saleEndDate: '2024-12-10',
  },
  {
    id: '4',
    name: 'CLASSIC',
    description: 'Advanced highlight, even longer listing duration, premium support and photos.',
    item: [
      '20 photos', '10 weeks on duration', 'Always on top of page',
      'Hight on page', '1 Video', 'Full description',
    ],
    price: 'U$ 35,00',
    isOnSale: false,
    maxFiles: 20,
    video: 1,
    is_active: false,
    saleEndDate: '2024-12-10',
  },
  {
    id: '5',
    name: 'BASIC',
    item: [' 15 photos', '6 weeks on duration', 'Full description',],
    description: 'Additional images, standing out from the free plan, extended listing.',
    price: 'U$ 25,00',
    isOnSale: true,
    maxFiles: 10,
    video: 0,
    is_active: false,
    saleEndDate: '2024-12-10',
  },
  {
    id: '6',
    name: 'FREE LIMITED TIME',
    // item: ['5 photos', '1 week on duration'],
    description: 'This plan there are all benefits of the another plans, incluing photo ilimited and and time',
    item: ['Photos unlimited', '30 weeks on duration', 'Always on top of page', 'Hight on page', '3 Video', 'Full description', 'Carousel', 'Slider top'],
    price: 'U$ 0,00',
    isOnSale: true,
    maxFiles: 1000,
    video: 1,
    is_active: true,
    saleEndDate: '2024-12-10',
  },
  {
    id: '7',
    name: 'FREE',
    item: ['5 photos', '1 week on duration'],
    description: 'Free samples with listing, basic informations and timing limited.',
    price: 'U$ 0,00',
    isOnSale: false,
    maxFiles: 3,
    video: 0,
    is_active: false,
    saleEndDate: '2024-12-10',
  }
];