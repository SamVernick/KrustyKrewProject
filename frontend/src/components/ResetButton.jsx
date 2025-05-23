

function ResetButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition-transform hover:scale-105 my-4 mx-auto block"
      onClick={onClick}
      type="button"
    >
      Reset Database
    </button>
  );
}

export default ResetButton;