import { useNavigate } from 'react-router-dom';
import { ProductCardProps } from "../interfaces/product_card_props";

export function ProductCard({ name, price, image, discount }: ProductCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/ProductPresentation', { state: { name, price, discount, image } });
    };

    return (
        <section className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={image} alt="..." />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{name}</h5>
                        ${price} - ${discount}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button onClick={handleClick} className="btn btn-outline-dark mt-auto">
                        Ver Producto
                    </button>
                </div>
            </div>
        </section>
    );
}