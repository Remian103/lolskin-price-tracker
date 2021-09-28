
export interface FetchState<S> {
    isLoading: boolean;
    isError: boolean;
    data: S;
}

export interface PriceHistory {
    skin_id: number;
    date: string;
    price: number;
    sale_price: number;
    is_available: boolean;
}

export interface SkinObj {
    id: number;
    name: string;
    trimmed_image_url: string;
    full_image_url: string;
    champion_id: number;
    last_price_history: PriceHistory;
}

export interface SkinFullObj extends SkinObj {
    description: string;
    price_history: PriceHistory[];
}

export interface ChampionObj {
    id: number;
    name: string;
    icon_url: string;
}