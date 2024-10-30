import React, { useState } from 'react'

const UsingUseRef = () => {

    const [counter, setCounter] = useState(0);
    return (
        <div>
            <button 
            className="btn btn-danger"
            >
                UseRef Counter:
            </button>
        </div>
    )
}

export default UsingUseRef
