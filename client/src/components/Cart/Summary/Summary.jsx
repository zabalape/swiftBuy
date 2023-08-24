import { useSelector } from "react-redux";

const Summary = () => {
  const subtotal = useSelector((state) => state.cart.subtotalPrice);

  const items = useSelector((state) => state.cart.quantity);

  return (
    <div className="w-5/7 h-48 pb-2.5 bg-zinc-100 rounded-2xl shadow">
      <table className="w-full h-full">
        <tbody>
          <tr>
            <td className="p-2.5 text-black text-base font-bold leading-tight">
              Summary
            </td>
          </tr>
          <tr>
            <td className="p-2.5 text-black text-xs font-normal leading-tight">
              Subtotal
            </td>
            <td className="p-2.5 text-zinc-700 text-xs font-normal leading-tight">
              $ {subtotal}
            </td>
          </tr>
          <tr>
            <td className="p-2.5 text-black text-xs font-normal leading-tight">
              Shipping
            </td>
            <td className="p-2.5 text-zinc-700 text-xs font-normal leading-tight">
              Free Shipping! 😀
            </td>
          </tr>

          <tr>
            <td className="p-2 text-black text-xs font-normal leading-tight">
              {items} item
            </td>
            <td className="p-2 text-zinc-700 text-xs font-normal leading-tight">
              Total
            </td>
            <td className="p-2 text-black text-xs font-bold leading-tight">
              $ {subtotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
