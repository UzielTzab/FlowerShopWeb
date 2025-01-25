import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { Home } from "./Home";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/product_card_component"; // Asegúrate de importar este componente si lo usas
import { ProductCardProps } from "../interfaces/product_card_props";
import { useLocation } from "react-router-dom";

export function Search() {
    const location = useLocation();
    const search = location.state?.search || '';

    const [filteredProducts, setProducts] = useState<ProductCardProps[]>([]);
    const defaultProducts = [
        {
            name: "Salvage y sorprendente",
            price: 2000,
            discount: 10,
            image: "https://images.prestigeflowers.co.uk/fetch/w_635,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/eb2627f6a89020c313c8eb696b0ac8d5.jpg",
        },
        {
            name: "Ramo de Rosas",
            price: 1500,
            discount: 20,
            image: "https://images.prestigeflowers.co.uk/fetch/w_635,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/af3cc546dbbe3f93e2039a28ddf0eedd.jpg",
        },
        {
            name: "Ramo de girasoles",
            price: 2200,
            discount: 15,
            image: "https://images.prestigeflowers.co.uk/fetch/w_635,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/a6e3bec7d82682a521f3307af3552f63.jpg",
        },
        {
            name: "Ramo de tulipanes mixto  ",
            price: 1000,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_635,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/fe4def26047e96c9b43de572a172dd6f.jpg",
        },
        {
            name: "lirios del océano  ",
            price: 990,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/d595431b549e7ffa008bcd5fbfff14b4.jpg",
        },
        {
            name: "Armonía de marfil  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/a8d0aa0ab5d946c5b1cb1226492d4506.jpg",
        }, {
            name: "Jacinto y tulipanes  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/3d118e400f947f1356ae93027822de92.jpg",
        },
        {
            name: "La Bella  ",
            price: 1190,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/089a3515db9a7c35f4754a83312192e7.jpg",
        },
        {
            name: "Delicia oceánica  ",
            price: 1290,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/04704d70a1975eb7961e35d3dcc293df.jpg",
        }, {
            name: "Sol rosa  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/588df9d843b9341c462585984382e4d3.jpg",
        }, {
            name: "Delicias de tulipán  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/ab798aa3fc641b30f1f5c22ba79a8895.jpg",
        },
        {
            name: "Alegria  ",
            price: 1190,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/bd155c90d88e4af1c87b6ff2e4d1901d.jpg",
        },
        {
            name: "Paris  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/a4ff6a18abacc20e10c44b5a4a4752da.jpg",
        },
        {
            name: "Orion  ",
            price: 1190,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/ec038feaf1104311b2bc8948cd76d837.png",
        },
        {
            name: "Armonía elísea  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/c5a9a05a381cfb72006b6cafdc5391bd.jpg",
        },
        {
            name: "Grandeza  ",
            price: 1090,
            discount: 25,
            image: "https://images.prestigeflowers.co.uk/fetch/w_2000,e_sharpen:80,q_auto,f_auto,dpr_auto,f_auto/https://www.prestigeflowers.co.uk/images/products/e51542a23558722fb961288e87ef1ef6.jpg",
        },

    ];

    useEffect(() => {
        // Filtra los productos por el término de búsqueda
        const storedProducts = localStorage.getItem("product_on_stock");
        if (storedProducts) {
            const allProducts: ProductCardProps[] = JSON.parse(storedProducts);
            const filteredProducts = allProducts.filter((product: ProductCardProps) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    }, [search]);
    return (
        <>
            <HeaderComponent />
            <section className="py-5">
                <header className="bg-dark py-3 text-white">
                    <h4 className="mx-30 ps-4">Resultados de la busqueda</h4>
                </header>
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.name}
                                price={product.price}
                                discount={product.discount}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <FooterComponent />
        </>
    );
}
