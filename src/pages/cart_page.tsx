import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
    faCcMastercard,
    faCcVisa,
    faCcAmex,
    faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

interface CartItem {
    name: string;
    price: number;
    discount: number;
    image: string;
    quantity: number;
}

export function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [boughtItems, setBoughtItems] = useState<CartItem[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [textTitleForModal, setTextTitleForModal] = useState<string>("Procesando la transacción");
    const [textForModal, setTextForModal] = useState<string>("¡Serás redirigido en breve al detalle de pago!");

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
        calculateTotalQuantity(updatedCart);
        calculateTotalDiscount(updatedCart);
        setShowModal(true);
        // Despacha el evento personalizado
        window.dispatchEvent(new Event('cartUpdated'));

        setTextTitleForModal("Producto eliminado");
        setTimeout(() => {
            setTextTitleForModal("Procesando la transacción");
            setTextForModal("El producto ha sido eliminado del carrito");
            setShowModal(false);
        }, 2000);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setShowErrorModal(true);
            return;
        }

        setShowModal(true);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTotalQuantity(0);
            setTotalDiscount(0);
            setBoughtItems(cartItems);
            localStorage.setItem("boughtItems", JSON.stringify(cartItems));
            localStorage.removeItem("cart");
            setTimeout(() => {
                navigate("/PayPage", { state: { cartItems, totalQuantity } });
            }, 3000);
        }, 3000); // Simula una transacción de 3 segundos
    };

    return (
        <>
            <HeaderComponent />
            {showModal && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">{textTitleForModal}</h5>
                            </div>
                            <div className="modal-body">
                                {isLoading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    <p>
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
                                        {textForModal}</p>
                                )}
                            </div>
                            {!isLoading && (
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showErrorModal && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-danger me-2" />
                                    Información</h5>
                            </div>
                            <div className="modal-body">
                                <p>Your cart is empty. Please add items to your cart before checking out.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowErrorModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                                <span className="text-body">
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                    Seguir comprando
                                                </span>
                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="mb-0">
                                                    Tienes <strong>{cartItems.length}</strong> artículos en
                                                    tu carrito
                                                </p>
                                                <div>
                                                    <p className="mb-0">
                                                        <span className="text-muted">Ordenar por:</span>{" "}
                                                        <span className="text-bod fw-semibold">
                                                            precio <i className="fas fa-angle-down mt-1"></i>
                                                        </span>
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
                                                                        Precio con descuento: ${item.discount}
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
                                                                    <h5 className="mb-0">${item.price.toFixed(2)}</h5>
                                                                </div>
                                                                <a
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
                                            <div className="card bg-dark text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0">Detalles del carrito</h5>
                                                    </div>
                                                    <p className="small mb-2">Tipos de tarjeta</p>
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
                                                                className="form-control form-control-lg fs-6"
                                                                placeholder="Diego Alejandro Martínez López"
                                                            />
                                                            <label className="form-label" htmlFor="typeName">
                                                                Nombre completo
                                                            </label>
                                                        </div>
                                                        <div className="form-outline form-white mb-4">
                                                            <input
                                                                type="text"
                                                                id="typeText"
                                                                className="form-control form-control-lg fs-6"
                                                                placeholder="1234-5678-9012-3457"
                                                            />
                                                            <label className="form-label" htmlFor="typeText">
                                                                Numero de la tarjeta
                                                            </label>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-md-6">
                                                                <div className="form-outline form-white">

                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-outline form-white">
                                                                    <input
                                                                        type="password"
                                                                        id="typeCvv"
                                                                        className="form-control form-control-lg fs-6"
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
                                                        <p className="mb-2">${totalQuantity.toFixed(2)}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Costo de Envío</p>
                                                        <p className="mb-2">$20.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Descuento Total</p>
                                                        <p className="mb-2">${totalDiscount}.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total (IVA incl.)</p>
                                                        <p className="mb-2">${totalQuantity.toFixed(2)}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-block btn-lg"
                                                            onClick={handleCheckout}
                                                        >
                                                            <div className="d-flex justify-content-between">
                                                                <span>
                                                                    Pagar{" "}
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
                </div>
            </section>

            <FooterComponent />
        </>
    );
}