import { useQuery } from "@tanstack/react-query";
import useAllClasses from "../../../../hooks/useAllClasses";
import SectionTitle from "../../../../components/SectionTitle";
import useEnrolledClasses from "../../../../hooks/useEnrolledClasses";


const EnrolledClasses = () => {
    const [classes] = useAllClasses()
    const [enrolledClasses] = useEnrolledClasses()

    return (
        <div>
            <SectionTitle heading={"Enrolled Classes"} />
            <section>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Class name</th>
                                <th>Student Email</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {enrolledClasses.map((element, index) =>
                                <tr key={element._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{element.className}</div>
                                    </td>
                                    <td>
                                        {element.studentEmail}
                                    </td>
                                    <td>
                                        {element.price}
                                    </td>

                                    {/* <td className="space-x-2">
                                        <button onClick={() => handleDelete(element._id)} className="btn btn-sm btn-primary">Delete</button>
                                        <label htmlFor="my_modal_7" onClick={()=>setMyClass(element)} className="btn btn-sm btn-primary">Payment</label>
                                    </td> */}

                                </tr>

                            )}

                        </tbody>


                    </table>
                </div>
            </section>
        </div>
    );
};

export default EnrolledClasses;