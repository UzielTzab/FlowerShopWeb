import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
    faCcMastercard,
    faCcVisa,
    faCcAmex,
    faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";

interface CartItem {
    name: string;
    price: number;
    discount: number;
    image: string;
    quantity: number;
}

export function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateTotalQuantity(cart);
        calculateTotalDiscount(cart);
    }, []);

    const calculateTotalQuantity = (cart: CartItem[]) => {
        const total = cart.reduce(
            (acc, item) => acc + (item.price - item.discount) * item.quantity,
            0
        );
        setTotalQuantity(total);
    };

    const calculateTotalDiscount = (cart: CartItem[]) => {
        const discount = cart.reduce(
            (acc, item) => acc + item.discount * item.quantity,
            0
        );
        setTotalDiscount(discount);
    };

    const handleRemoveFromCart = (name: string) => {
        const updatedCart = cartItems.filter((item) => item.name !== name);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotalQuantity(updatedCart); // Actualiza el total después de la eliminación
        calculateTotalDiscount(updatedCart); // Actualiza el descuento después de la eliminación
    };

    return (
        <>
            <HeaderComponent />
            <section className="h-100 h-custom bg-gray-200">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        {/* Left Section */}
                                        <div className="col-lg-7">
                                            <h5 className="mb-3">
                                                <a href="#!" className="text-body">
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                    Continue shopping
                                                </a>
                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="mb-0">
                                                    You have <strong>{cartItems.length}</strong> items in
                                                    your cart
                                                </p>
                                                <div>
                                                    <p className="mb-0">
                                                        <span className="text-muted">Sort by:</span>{" "}
                                                        <a href="#!" className="text-body">
                                                            price <i className="fas fa-angle-down mt-1"></i>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Items */}
                                            {cartItems.map((item, index) => (
                                                <div className="card mb-3" key={index}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <img
                                                                        src={item.image}
                                                                        className="img-fluid rounded-3"
                                                                        alt="Shopping item"
                                                                        style={{ width: "65px" }}
                                                                    />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.name}</h5>
                                                                    <p className="small mb-0">
                                                                        Discounted Price: ${item.discount}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div style={{ width: "50px" }}>
                                                                    <h5 className="fw-normal mb-0">
                                                                        {item.quantity}
                                                                    </h5>
                                                                </div>
                                                                <div style={{ width: "80px" }}>
                                                                    <h5 className="mb-0">${item.price}</h5>
                                                                </div>
                                                                <a
                                                                    href="#!"
                                                                    onClick={() =>
                                                                        handleRemoveFromCart(item.name)
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Section */}
                                        <div className="col-lg-5">
                                            <div className="card bg-primary text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Card details</h5>
                                                    </div>
                                                    <p className="small mb-2">Card type</p>
                                                    <a href="#!" className="text-white me-2">
                                                        <FontAwesomeIcon icon={faCcMastercard} size="2x" />
                                                    </a>
                                                    <a href="#!" className="text-white me-2">
                                                        <FontAwesomeIcon icon={faCcVisa} size="2x" />
                                                    </a>
                                                    <a href="#!" className="text-white me-2">
                                                        <FontAwesomeIcon icon={faCcAmex} size="2x" />
                                                    </a>
                                                    <a href="#!" className="text-white me-2">
                                                        <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                                                    </a>

                                                    <form className="mt-4">
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeName"
                                                                className="form-control form-control-lg"
                                                                placeholder="Cardholder's Name"
                                                            />
                                                            <label className="form-label" htmlFor="typeName">
                                                                Nombre Completo
                                                            </label>
                                                        </div>
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeText"
                                                                className="form-control form-control-lg"
                                                                placeholder="1234 5678 9012 3457"
                                                            />
                                                            <label className="form-label" htmlFor="typeText">
                                                                Numero de la Tarjeta
                                                            </label>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    {/* <input
                                                                        type="text"
                                                                        id="typeExp"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="MM/YYYY"
                                                                        value={expirationDate}
                                                                        onChange={(e) => handleExpirationDateChange(e.target.value)}
                                                                    />
                                                                    <label className="form-label" htmlFor="typeExp">
                                                                        Fecha de expiración
                                                                    </label>
                                                                    {expirationError && (
                                                                        <small className="text-danger">Por favor, ingresa una fecha válida en formato MM/YYYY.</small>
                                                                    )} */}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="password"
                                                                        id="typeCvv"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="&#9679;&#9679;&#9679;"
                                                                    />
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="typeCvv"
                                                                    >
                                                                        CVV
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <hr className="my-4" />
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">${totalQuantity}.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Costo de Envio</p>
                                                        <p className="mb-2">$20.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Descuento Total</p>
                                                        <p className="mb-2">${totalDiscount}.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total (IVA incl.)</p>
                                                        <p className="mb-2">${totalQuantity + 20}.00</p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-block btn-lg"
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <span>${totalQuantity + 20}.00</span>
                                                            <span>
                                                                Checkout{" "}
                                                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </>
    );
}
