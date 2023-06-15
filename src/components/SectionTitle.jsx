import { FaGripfire } from "react-icons/fa";


const SectionTitle = ({heading}) => {
    return (
        <section className="flex justify-center items-center  mb-10">
            <div className="divider font-bold text-2xl w-80">{heading}</div>
        </section>
    );
};

export default SectionTitle;