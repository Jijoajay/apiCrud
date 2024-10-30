import React, { useState } from 'react'
import SideBar from './SideBar'

const CurrentComponent = () => {

    const [currentComponent, setCurrentComponent] = useState();
    return (
        <>
            <div>
                <SideBar />
            </div>
            <div>
                {currentComponent}
            </div>
        </>
    )
}

export default CurrentComponent
