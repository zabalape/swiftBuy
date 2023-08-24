import { useSelector } from "react-redux";

const PurchaseHistoryCard = () => {
  const purchaseHistory = useSelector((state) => state.purchaseHistory);

  return (
    <div className="purchase-history-card">
      {purchaseHistory.map((purchase, index) => (
        <div key={index} className="purchase-card">
          <img src={purchase.image} alt={purchase.name} />
          <div className="purchase-details">
            <h3>{purchase.name}</h3>
            <p>Precio: {purchase.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistoryCard;
