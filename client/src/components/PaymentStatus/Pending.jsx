import { Link } from "react-router-dom";

const PendingComponent = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Pago Pendiente</h2>
        <p className="text-lg mb-6">Tu pago está pendiente de aprobación.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default PendingComponent;
