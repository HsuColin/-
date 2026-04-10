export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
}

export const CATEGORIES = [
  "增肌減脂",
  "調整腸胃",
  "運動營養補充",
  "孕期營養",
  "銀髮族保養",
  "兒童健康長高營養"
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "舒肥雞胸增肌餐",
    category: "增肌減脂",
    description: "低溫烹調雞胸肉，搭配五穀飯與當季時蔬，高蛋白低脂肪。",
    price: 150,
    image: "https://picsum.photos/seed/grilled-chicken-salad/400/300",
    tags: ["高蛋白", "低脂"]
  },
  {
    id: "2",
    name: "清蒸鱸魚纖維餐",
    category: "調整腸胃",
    description: "新鮮鱸魚清蒸，搭配高纖維蔬菜與地瓜，輕鬆無負擔。",
    price: 180,
    image: "https://picsum.photos/seed/steamed-fish-vegetables/400/300",
    tags: ["高纖", "易消化"]
  },
  {
    id: "3",
    name: "澳洲牛肉運動餐",
    category: "運動營養補充",
    description: "優質澳洲牛肉，提供運動後所需的肌酸與鐵質。",
    price: 220,
    image: "https://picsum.photos/seed/beef-steak-meal/400/300",
    tags: ["能量補充", "鐵質"]
  },
  {
    id: "4",
    name: "挪威鮭魚孕補餐",
    category: "孕期營養",
    description: "富含 Omega-3 的鮭魚，搭配葉酸蔬菜，守護媽咪與寶寶。",
    price: 250,
    image: "https://picsum.photos/seed/salmon-fillet-healthy/400/300",
    tags: ["Omega-3", "葉酸"]
  },
  {
    id: "5",
    name: "軟嫩燉豬銀髮餐",
    category: "銀髮族保養",
    description: "慢火燉煮至軟嫩的豬肉，搭配細碎時蔬，適合長輩咀嚼。",
    price: 160,
    image: "https://picsum.photos/seed/braised-pork-soft/400/300",
    tags: ["軟質", "營養均衡"]
  },
  {
    id: "6",
    name: "鈣質滿分兒童餐",
    category: "兒童健康長高營養",
    description: "小魚乾、蛋與起司入菜，幫助孩子健康成長發育。",
    price: 140,
    image: "https://picsum.photos/seed/kids-healthy-bento/400/300",
    tags: ["高鈣", "發育必備"]
  }
];
