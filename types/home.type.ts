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

export interface HomeContentSectionProps {
    title?: string;
    items: CardItem[] | BannerItem[];
}

export interface HomeContentRaw {
    component: string;
    props: HomeContentSectionProps;
}