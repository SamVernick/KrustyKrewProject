import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
	
function SelectQuantity({ value = 1, onChange}) {
    const [count, setCount] = useState(value);

    useEffect(() => {
        setCount(value);
    }, [value]);

    const increment = (e) => {
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();
        
        if(count < 10) {
            const newValue = count + 1;
            setCount(newValue);
            if(onChange){
                onChange(newValue);
            }
        }
    };

    const decrement = (e) => {
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();
        
        if(count > 1) {
            const newValue = count - 1;
            setCount(newValue);
            if(onChange){
                onChange(newValue);
            }
        }
    };

    return (
        <div className="flex items-center space-x-2 bg-cyan-100 rounded border border-black w-32 py-1 px-2">
            <button 
                onClick={decrement} 
                className="flex items-center justify-center w-8 h-8 text-black"
                type="button"
            >
                <MdRemove />
            </button>
            <span className="flex-1 text-center font-medium">{count}</span>
            <button 
                onClick={increment} 
                className="flex items-center justify-center w-8 h-8 text-black"
                type="button"
            >
                <MdAdd />
            </button>
        </div>
    );
}
	
export default SelectQuantity;