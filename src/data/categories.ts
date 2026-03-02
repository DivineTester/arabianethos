export interface SubCategory {
    name: string;
    href: string;
}

export interface CategorySection {
    title: string;
    items: SubCategory[];
}

export interface MainCollection {
    name: string;
    sections: CategorySection[];
    featuredLink?: string;
}

export const PRODUCT_CATEGORIES: MainCollection[] = [
    {
        name: "Men's Collection",
        sections: [
            {
                title: "Thobes",
                items: [
                    { name: "Saudi Thobes", href: "/category/mens/thobes/saudi" },
                    { name: "Emirati Thobes", href: "/category/mens/thobes/emirati" },
                    { name: "Qatari Thobes", href: "/category/mens/thobes/qatari" },
                    { name: "Moroccan Thobes", href: "/category/mens/thobes/moroccan" },
                    { name: "Home/Night Thobes", href: "/category/mens/thobes/home-night" }
                ]
            },
            {
                title: "Suits & Ethnic Wear",
                items: [
                    { name: "Pathani Suits", href: "/category/mens/pathani-suits" },
                    { name: "Kurta Pyjama", href: "/category/mens/kurta-pyjama" }
                ]
            },
            {
                title: "Hajj & Umrah",
                items: [
                    { name: "Ihraam for Men", href: "/category/mens/hajj-umrah/ihraam" }
                ]
            },
            {
                title: "Headwear",
                items: [
                    { name: "Topi (Cap)", href: "/category/mens/headwear/topi" },
                    { name: "Shemagh", href: "/category/mens/headwear/shemagh" },
                    { name: "Ghutrah", href: "/category/mens/headwear/ghutrah" },
                    { name: "Iqal (Head Ring)", href: "/category/mens/headwear/iqal" }
                ]
            },
            {
                title: "Footwear",
                items: [
                    { name: "Arabian Footwear", href: "/category/mens/footwear/arabian" },
                    { name: "Peshawari Sandals", href: "/category/mens/footwear/peshawari" },
                    { name: "Ethnic Sandals", href: "/category/mens/footwear/ethnic" }
                ]
            }
        ],
        featuredLink: "/category/mens"
    },
    {
        name: "Kids' Collection",
        sections: [
            {
                title: "Apparel",
                items: [
                    { name: "Kids' Thobes", href: "/category/boys/thobes" },
                    { name: "Pathani Suits", href: "/category/boys/pathani-suits" },
                    { name: "Kurta Pyjama", href: "/category/boys/kurta-pyjama" }
                ]
            },
            {
                title: "Hajj & Umrah",
                items: [
                    { name: "Ihraam for Kids", href: "/category/boys/hajj-umrah/ihraam" }
                ]
            },
            {
                title: "Accessories & Headwear",
                items: [
                    { name: "Kids' Headwear", href: "/category/boys/headwear" },
                    { name: "Kids' Footwear", href: "/category/boys/footwear" }
                ]
            }
        ],
        featuredLink: "/category/boys"
    },
    {
        name: "Women's Collection",
        sections: [
            {
                title: "Abayas",
                items: [
                    { name: "Economical Abayas", href: "/category/womens/abayas/economical" },
                    { name: "Premium Stylish", href: "/category/womens/abayas/premium-stylish" },
                    { name: "Handwork Abayas", href: "/category/womens/abayas/handwork" }
                ]
            },
            {
                title: "Hajj & Umrah",
                items: [
                    { name: "Ihraam/Hijab for Women", href: "/category/womens/hajj-umrah/ihraam-hijab" },
                    { name: "Ihraam/Hijab for Girls", href: "/category/womens/hajj-umrah/ihraam-hijab-girls" }
                ]
            }
        ],
        featuredLink: "/category/womens"
    },
    {
        name: "Accessories & Fragrances",
        sections: [
            {
                title: "Oud & Attars",
                items: [
                    { name: "Premium Attars", href: "/category/fragrances/attars" },
                    { name: "Oud Oils", href: "/category/fragrances/oud-oils" }
                ]
            },
            {
                title: "Accessories",
                items: [
                    { name: "Luxury Wallets", href: "/category/accessories/wallets" },
                    { name: "Cufflinks", href: "/category/accessories/cufflinks" }
                ]
            }
        ],
        featuredLink: "/category/accessories-fragrances"
    }
];
