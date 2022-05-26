export interface Article {
    id?: number;
    nomArticle: string;
    description: string;
    image: string;
    prixUnitaire: number;
    qteStock: number;
    user_id: number;
    categorie_id: number;
}
