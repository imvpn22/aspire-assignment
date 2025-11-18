import Cards from "../components/Cards";

const CardsPage: React.FC = () => {
  return (
    <div
      data-testid="cards-page"
      className="flex flex-col flex-1 overflow-hidden"
    >
      <Cards />
    </div>
  );
};

export default CardsPage;
