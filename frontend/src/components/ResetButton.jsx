import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;

function ResetButton({ onClick }) {
  const { triggerReset } = useReset();

  const handleReset = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reset`, {
        method: 'POST'
      });
      if(!response.ok){
        throw new Error('Failed to reset database');
      }
      triggerReset('Database reset successfully!', true);
    } catch (error){
      console.error('Error resetting database:', error);
      triggerReset('Failed to reset database.', false);
    }
  };


  return (
    <button
      className="bg-blue-500 hover:bg-red-500 text-white font-bold px-4 py-2 mx-1 border border-black rounded text-l shadow-lg transform transition-transform hover:-translate-y-0.5 hover:shadow-sm my-4 mx-auto block"
      onClick={handleReset}
      type="button"
    >
      Reset Database
    </button>
  );
}

export default ResetButton;