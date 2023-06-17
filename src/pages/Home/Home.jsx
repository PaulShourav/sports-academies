import SliderBanner from "../../components/SliderBanner";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructor from "./PopularInstructor/PopularInstructor";


const Home = () => {

  return (
    <div>
      <section>
        <SliderBanner />
      </section>

      <PopularClasses />
      <PopularInstructor/>
    </div>
  );
};

export default Home;