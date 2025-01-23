import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductPresentationProps } from "../interfaces/product_presentation_props";
import { ButtonOutlineComponent } from "./button_outline_component";

export function ProductViewComponent({ name, price, image, discount }: ProductPresentationProps) {
    const [quantity, setQuantity] = useState(1);
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const product = { name, price, image, discount, quantity };
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = cart.findIndex((item: any) => item.name === name);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
            navigate('/cart'); // Navigate to the cart page
        }, 1000); // Hide banner after 1 second
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                {showBanner && (
                    <div className="alert alert-success text-center" role="alert">
                        Producto añadido al carrito
                    </div>
                )}
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={image} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: BST-498</div>
                        <h1 className="display-5 fw-bolder">{name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${price}</span>
                            <span>${discount}</span>
                        </div>
                        <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?</p>
                        <div className="d-flex">
                            <input
                                className="form-control text-center me-3"
                                id="inputQuantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                style={{ maxWidth: '3rem' }}
                            />
                            <button onClick={handleAddToCart} className="btn btn-outline-dark mt-auto">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};