

function ResetButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-lg text-xl shadow-lg transform transition-transform hover:scale-105 my-4 mx-auto block"
      onClick={onClick}
    >
      Reset
    </button>
  );
}

export default ResetButton;