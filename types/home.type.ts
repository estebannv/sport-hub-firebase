export interface CardItem {
    id: string;
    Name: string;
    rating: number;
    reviews: number;
    deliveryTime: number;
    image: string;
}

export interface BannerItem {
    id: string;
    name: string;
}

export interface HomeContentRaw {
    title?: string;
    component?: string;
    props?: [CardItem | BannerItem];
}