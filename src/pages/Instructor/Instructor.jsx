import { useQuery } from "@tanstack/react-query";


const Instructor = () => {
    const {data:instructors=[] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async()=>{
          const res= await fetch("http://localhost:5000/allInstructor")
          return res.json()
        },
      })
    return (
        <section className="mt-10 container mx-auto">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {
                    instructors?.map(element => <div key={element._id} className="card  bg-base-100 shadow-xl">
                        <figure><img src={element.image} alt="instructor" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {element.name}
                            </h2>
                            <p className="text-xl">
                               <span className="font-bold">Email:</span> {element.email}
                            </p>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default Instructor;