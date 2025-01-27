import carrouselImage1 from "../assets/carrousel_image1.jpg";
import carrouselImage2 from "../assets/carrousel_image3.jpg";
import carrouselImage3 from "../assets/carrousel_image3.jpg";
import { ProductCard } from "./product_card_component";
import { useState } from "react";
import { useEffect } from "react";
import { ProductCardProps } from "../interfaces/product_card_props";
import { Modal, Spinner } from "react-bootstrap";
import { ExclamationCircle, CheckCircle } from 'react-bootstrap-icons';
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MainComponent({ searchTerm }: { searchTerm: string }) {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
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

    // Cargar productos iniciales
    useEffect(() => {
        const storedProducts = localStorage.getItem("product_on_stock");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(defaultProducts);
        }
    }, []);

    useEffect(() => {
        const trimmedSearchTerm = searchTerm.trim();

        if (trimmedSearchTerm === "") {
            setIsFiltering(false);
            setFilteredProducts(products);
        } else {
            setIsFiltering(true);
            setLoading(true);
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
            setLoading(false);

            if (filtered.length > 0) {
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 1000);
            } else {
                setShowErrorModal(true);
                setTimeout(() => setShowErrorModal(false), 3000);
            }
        }
    }, [searchTerm, products]);

    return (
        <>
            <header className="bg-dark">
                {!isFiltering && (
                    <div id="carouselExampleCaptions" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={carrouselImage1} className="carousel-image w-100" alt="Flores 1"></img>
                                <div className="carousel-caption d-none d-md-block bg-dark rounded-circle">
                                    <h3 className="carousel-text">El lenguaje de las flores, en cada detalle</h3>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={carrouselImage2} className="carousel-image w-100" alt="Flores 2"></img>
                                <div className="carousel-caption d-none d-md-block bg-dark rounded-circle">
                                    <h3 className="carousel-text">Flores que dicen lo que las palabras no pueden</h3>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={carrouselImage3} className="carousel-image w-100" alt="Flores 3"></img>
                                <div className="carousel-caption d-none d-md-block bg-dark rounded-circle">
                                    <h3 className="carousel-text">Más que flores, son momentos inolvidables</h3>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )}
                {isFiltering &&
                    (
                        <header className="bg-dark py-3 text-white">
                            <h4 className="mx-30 ps-4">Resultados de la busqueda "{searchTerm}"
                                <FontAwesomeIcon icon={faSpa} size="1x" color="white" />
                            </h4>
                        </header>
                    )}
            </header >
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))}

                    </div>
                </div>
            </section>
            <Modal show={loading} onHide={() => setLoading(false)} backdrop="static">
                <Modal.Body className="d-flex justify-content-center">
                    <Spinner />
                </Modal.Body>
            </Modal>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Resultado de la busqueda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CheckCircle color="green" size={36} /> {/* Muestra un icono de check verde */}
                    Se encontrarón {filteredProducts.length} resultados
                </Modal.Body>
            </Modal>
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExclamationCircle color="dark" size={36} /> {/* Muestra un icono de check verde */}
                    No se encontraron resultados.
                </Modal.Body>
            </Modal>


        </>
    );
}