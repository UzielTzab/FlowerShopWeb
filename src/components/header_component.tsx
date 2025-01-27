import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";

import { CategorySide } from '../scripts/category_side';

export function HeaderComponent({ setSearchTerm }: { setSearchTerm?: (search: string) => void }) {
    const [searchTerm, setLocalSearchTerm] = useState('');
    const [cartCount, setCartCount] = useState(0);

    const handleSearch = () => {
        setSearchTerm?.(searchTerm);
    };

    useEffect(() => {
        CategorySide();
    }, []);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.length);
        };

        // Actualiza el contador del carrito al montar el componente
        updateCartCount();

        // Escucha el evento 'cartUpdated' para detectar cambios en el carrito
        window.addEventListener('cartUpdated', updateCartCount);

        // Limpia el evento al desmontar el componente
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex align-items-center">
                <a className="navbar-brand navbar-logo" href="/">Detalles Florales</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-6 mb-lg-0 ms-lg-4">
                        <li className="nav-item dropdown">
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            id="megaMenu"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Categorías
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="megaMenu" style={{ minWidth: '600px' }}>
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <a className="dropdown-header">Categorías</a>
                                                    <a className="dropdown-item" href="#" data-target="arreglos">Arreglos Florales</a>
                                                    <a className="dropdown-item" href="#" data-target="flores">Tipos de Flores</a>
                                                    <a className="dropdown-item" href="#" data-target="eventos">Eventos y Ocasiones</a>
                                                    <a className="dropdown-item" href="#" data-target="plantas">Plantas y Jardinería</a>
                                                    <a className="dropdown-item" href="#" data-target="regalos">Regalos y Complementos</a>
                                                    <a className="dropdown-item" href="#" data-target="decoración">Decoración Floral</a>
                                                    <a className="dropdown-item" href="#" data-target="florerías">Florerías</a>
                                                    <a className="dropdown-item" href="#" data-target="ofertas">Ofertas y Descuentos</a>
                                                    <a className="dropdown-item" href="#" data-target="servicios">Servicios Especiales</a>
                                                    <a className="dropdown-item" href="#" data-target="ecoamigables">Productos Eco-amigables</a>
                                                </div>
                                                <div className="col-6">
                                                    <div id="category-content-arreglos" className="category-content">
                                                        <h6 className="dropdown-header">Todos Arreglos Florales</h6>
                                                        <a className="dropdown-item" href="#">Ramos personalizados</a>
                                                        <a className="dropdown-item" href="#">Centros de mesa</a>
                                                        <a className="dropdown-item" href="#">Arreglos para bodas</a>
                                                    </div>
                                                    <div id="category-content-flores" className="category-content">
                                                        <h6 className="dropdown-header">Tipos de Flores</h6>
                                                        <a className="dropdown-item" href="#">Rosas</a>
                                                        <a className="dropdown-item" href="#">Tulipanes</a>
                                                        <a className="dropdown-item" href="#">Orquídeas</a>
                                                    </div>
                                                    <div id="category-content-eventos" className="category-content">
                                                        <h6 className="dropdown-header">Eventos y Ocasiones</h6>
                                                        <a className="dropdown-item" href="#">Cumpleaños</a>
                                                        <a className="dropdown-item" href="#">Aniversarios</a>
                                                        <a className="dropdown-item" href="#">Día de San Valentín</a>
                                                    </div>
                                                    <div id="category-content-plantas" className="category-content">
                                                        <h6 className="dropdown-header">Plantas y Jardinería</h6>
                                                        <a className="dropdown-item" href="#">Plantas de interior</a>
                                                        <a className="dropdown-item" href="#">Plantas de exterior</a>
                                                    </div>
                                                    <div id="category-content-regalos" className="category-content">
                                                        <h6 className="dropdown-header">Regalos y Complementos</h6>
                                                        <a className="dropdown-item" href="#">Cestas de regalo</a>
                                                        <a className="dropdown-item" href="#">Peluches</a>
                                                        <a className="dropdown-item" href="#">Chocolates</a>
                                                        <a className="dropdown-item" href="#">Tarjetas de felicitación</a>
                                                        <a className="dropdown-item" href="#">Aromatizantes y velas</a>
                                                    </div>
                                                    <div id="category-content-decoración" className="category-content">
                                                        <h6 className="dropdown-header">Decoración Floral</h6>
                                                        <a className="dropdown-item" href="#">Arcos florales</a>
                                                        <a className="dropdown-item" href="#">Centros de mesa para eventos</a>
                                                        <a className="dropdown-item" href="#">Guirnaldas florales</a>
                                                        <a className="dropdown-item" href="#">Decoraciones para fiestas</a>
                                                        <a className="dropdown-item" href="#">Adornos florales para el hogar</a>
                                                    </div>
                                                    <div id="category-content-florerías" className="category-content">
                                                        <h6 className="dropdown-header">Florerías</h6>
                                                        <a className="dropdown-item" href="#">Florerías cerca de mí</a>
                                                        <a className="dropdown-item" href="#">Florerías para eventos</a>
                                                        <a className="dropdown-item" href="#">Florerías con entrega a domicilio</a>
                                                        <a className="dropdown-item" href="#">Florerías premium</a>
                                                    </div>
                                                    <div id="category-content-ofertas" className="category-content">
                                                        <h6 className="dropdown-header">Ofertas y Descuentos</h6>
                                                        <a className="dropdown-item" href="#">Ofertas de temporada</a>
                                                        <a className="dropdown-item" href="#">Descuentos por cantidad</a>
                                                        <a className="dropdown-item" href="#">Ofertas por festividades</a>
                                                        <a className="dropdown-item" href="#">Productos con descuento</a>
                                                    </div>
                                                    <div id="category-content-servicios" className="category-content">
                                                        <h6 className="dropdown-header">Servicios Especiales</h6>
                                                        <a className="dropdown-item" href="#">Entrega rápida</a>
                                                        <a className="dropdown-item" href="#">Personalización de arreglos</a>
                                                        <a className="dropdown-item" href="#">Arreglos para empresas</a>
                                                        <a className="dropdown-item" href="#">Decoración para eventos corporativos</a>
                                                    </div>
                                                    <div id="category-content-ecoamigables" className="category-content">
                                                        <h6 className="dropdown-header">Productos Eco-amigables</h6>
                                                        <a className="dropdown-item" href="#">Arreglos con flores orgánicas</a>
                                                        <a className="dropdown-item" href="#">Empaque reciclable</a>
                                                        <a className="dropdown-item" href="#">Flores locales y de temporada</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="#!">Servicios</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Nosotros</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Contacto</a></li>
                    </ul>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="btn btn-outline-dark">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </form>
                        </div>
                    </nav>
                    <form className="d-flex">
                        <Link to="/Cart" className="btn btn-outline-dark">
                            <i className="bi-cart-fill me-1"></i>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}