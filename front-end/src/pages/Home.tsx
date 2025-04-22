import { BentoGridSecond } from "../components/Grid";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto my-40">
      <h1 className="text-4xl font-bold mb-10">Welcome to Greptile!</h1>
      <h2 className="text-xl text-gray-600 mb-4">
        Greptile AI Makes Life Easier
      </h2>
      <BentoGridSecond />
    </div>
  );
};

export default Home;
