import React from 'react';
import { API } from '../config'
const ShowImage = ({item, url}) => {
    return (
        <div>
            <div className="product-img">
                <img className="mb-3" src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{maxHeight:"100%", maxWidth:"100%"}} />
            </div>
        </div>
    );
}

export default ShowImage;
