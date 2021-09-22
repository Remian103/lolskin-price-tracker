export interface AnchorObj {
    id: number;
    name: string;
    link: string;
    type: "link" | "hash" | "new-tab";
}