import React from 'react';

const CardItem = ({ name, HP, types, imageUrl, Attacks }) => {

    const alternateimageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7qP8Qd5eDjKLTY9J3pPVfK8ug088SpPGpA&usqp=CAU';

    return (
        <div className='card my-4' style={{ maxWidth: "40rem" }}>

            {/* POKEMON CARD IMAGE */}
            <img src={imageUrl ? imageUrl : alternateimageUrl} alt=""
                style={{ width: "70%", height: "300px", alignSelf: "center" }}
                className="card-img-top m-3"
            />

            {/* POKEMON CARD BODY (INFO) */}
            <div className="card-body" style={{ textAlign: 'left' }}>

                <div className="d-flex justify-content-between ">
                    {/* NAME OF THE POKEMON */}
                    <p className="card-title">
                        <strong>{name}</strong>
                    </p>
                    {/* HP OF THE POKEMON */}
                    <p className="card-title">
                        <strong > HP : </strong>  {HP}
                    </p>
                </div>

                {/* TYPE OF THE POKEMON */}
                <p className="card-text">
                    <strong>Type : {types[0] ? types[0] : "Not Mentioned"}</strong>
                </p>

                {/* ATTACKS OF THE POKEMON */}
                <p className="card-text">
                    <strong>Attacks : </strong>
                    {Attacks.map((attack) => {
                        return <span key={attack.name}> - '{attack.name}'</span>
                    })}
                </p>
            </div>

        </div>
    );
};

export default CardItem