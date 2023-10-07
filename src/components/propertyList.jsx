import React from 'react';

function PropertyList({elements}){
    return(
        <div>
            {elements.map((element, index) => {
                <div key={index}>
                    <h1>AHHHHHH</h1>
                    {element}
                </div>
            })}
        </div>
    )
}

export default PropertyList;