import React, { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
	
function SelectQuantity() {
    const [count, setCount] = useState(0);
    const increment = () => {
        if(count < 10) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if(count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div>
            <MdRemove onClick={decrement} />
            <span>{count}</span>
            <MdAdd onClick={increment} />
        </div>
    );
}
	
export default SelectQuantity;