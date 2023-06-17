

const ClassCard = ({ element, handleSelectClass }) => {
    return (
        <div key={element._id} className="card  bg-base-100 shadow-xl">
            <figure><img src={element.image} className="h-52 w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {element.className}

                </h2>
                <p><span className="font-bold">Instructor:</span>{element.instructorName}</p>
                <p>Seats:{element.availableSeat}</p>
                <p>Price:{element.price}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleSelectClass(element._id)} className="btn btn-sm btn-primary">Select Class</button>
                </div>
            </div>
        </div>
    )
};

export default ClassCard;