

const InstructorCard = ({ element }) => {
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img src={element.image} alt="instructor" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {element.name}
                </h2>
                <p className="text-xl">
                    <span className="font-bold">Email:</span> {element.email}
                </p>
            </div>
        </div>
    );
};

export default InstructorCard;