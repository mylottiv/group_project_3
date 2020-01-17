import React from 'react';

function Card(props) {
    const {img} = props;
    console.log(props)

    return (
        <div className="card col-lg-3 col-md-4 col-sm-6 col-12">
             <img src={img} width="600" height="400" className="card-img-top" alt="..."/>
        </div>
        )
}

export default Card;