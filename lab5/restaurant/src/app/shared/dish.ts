export interface Dish {
    id: number;
    name: string;
    cuisine: string[];
    category: string[];
    ingredients: string[];
    maxDailyAmount: number;
    price: number;
    description: string;
    photos: string[];
}
// Nazwa dania, typ kuchni do której należy danie ( np. włoska, polska, 
// indyjska, międzynarodowa, francuska itp.), typ i kategoria posiłku ( wegański, mięsny, zupa, 
// dania główne, sałatki, przystawka, kolacja, śniadanie itp.), lista składników, max ilość dań 
// możliwych do wydania danego dnia, cena dania, krótki opis dania oraz link do poglądowych 
// zdjęć. 