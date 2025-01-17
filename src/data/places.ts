export interface Place {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}

export const places: Place[] = [
  {
    id: 1,
    name: 'Seoul Tower',
    type: 'Attraction',
    image: 'https://placehold.co/64x64',
    description:
      'Iconic tower with observation deck offering panoramic city views',
    location: {
      lat: 37.551168,
      lng: 126.988228,
    },
  },
  {
    id: 2,
    name: 'Gyeongbokgung Palace',
    type: 'Historical Site',
    image: 'https://placehold.co/64x64',
    description:
      'Joseon dynasty palace with traditional architecture and gardens',
    location: {
      lat: 37.579617,
      lng: 126.977041,
    },
  },
  {
    id: 3,
    name: 'Hongdae',
    type: 'Neighborhood',
    image: 'https://placehold.co/64x64',
    description:
      'Vibrant district known for youth culture, shopping and nightlife',
    location: {
      lat: 37.557527,
      lng: 126.925595,
    },
  },
  {
    id: 4,
    name: 'Bukchon Hanok Village',
    type: 'Cultural Site',
    image: 'https://placehold.co/64x64',
    description: 'Traditional Korean village with historic hanok houses',
    location: {
      lat: 37.582978,
      lng: 126.983661,
    },
  },
  {
    id: 5,
    name: 'Namsan Park',
    type: 'Nature',
    image: 'https://placehold.co/64x64',
    description: 'Mountain park with hiking trails and scenic views',
    location: {
      lat: 37.551168,
      lng: 126.988228,
    },
  },
  {
    id: 6,
    name: 'Dongdaemun Design Plaza',
    type: 'Architecture',
    image: 'https://placehold.co/64x64',
    description: 'Futuristic landmark with exhibitions and design market',
    location: {
      lat: 37.566985,
      lng: 127.009452,
    },
  },
  {
    id: 7,
    name: 'Gwangjang Market',
    type: 'Market',
    image: 'https://placehold.co/64x64',
    description: 'Historic market famous for street food and textiles',
    location: {
      lat: 37.570034,
      lng: 126.999645,
    },
  },
  {
    id: 8,
    name: 'Lotte World',
    type: 'Entertainment',
    image: 'https://placehold.co/64x64',
    description: 'Major recreation complex with theme park and shopping mall',
    location: {
      lat: 37.511391,
      lng: 127.098139,
    },
  },
];
