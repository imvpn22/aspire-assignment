import React from "react";
import Carousel from "../shared/Carousel";
import Card from "./Card";
import CardActions from "./CardActions";
import Panel from "../shared/Panel";
import CardDetails from "./CardDetails";
import TransactionList from "./TransactionList";
import { DUMMY_CARD_DATA } from "../../constants/cards.constants";
import { CreditCardIcon, TransactionIcon } from "../Icons";
import Spinner from "../shared/Spinner";
import ErrorInfo from "../shared/ErrorInfo";
import { useGetCards } from "../../query/cards.query";

const Content: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const {
    data: cardsData = [],
    isLoading: isCardsLoading,
    isError: isCardsError,
    refetch: refetchCards,
    error: cardsError,
  } = useGetCards();

  const cardData = cardsData[activeCardIndex] ?? DUMMY_CARD_DATA;

  if (isCardsLoading) {
    return <Spinner />;
  }

  if (isCardsError) {
    return <ErrorInfo onRetry={refetchCards} message={cardsError.message} />;
  }

  return (
    <div className="text-black rounded-md flex flex-1 card-content shadow-md p-6 border border-gray-100">
      <div className="flex flex-col gap-6 max-w-[381px] w-full h-fit card-sub-content">
        <Carousel
          className="card-carousel max-w-[381px] h-fit"
          onIndexChange={setActiveCardIndex}
        >
          {cardsData.map((card) => (
            <Card key={card.cardNumber} cardDetails={card} />
          ))}
        </Carousel>
        <CardActions />
      </div>
      <div className="flex flex-col gap-8 flex-1 max-w-[500px] card-details border-box pl-6 w-full">
        <Panel
          header={
            <div className="flex gap-2 items-center text-[#0C365A]">
              <CreditCardIcon className="size-5" />
              <span className="">Card Details</span>
            </div>
          }
        >
          <CardDetails cardDetails={cardData} />
        </Panel>
        <Panel
          header={
            <div className="flex gap-2 items-center text-[#0C365A]">
              <TransactionIcon className="size-5" />
              <span className="">Recent transaction</span>
            </div>
          }
          defaultExpanded
        >
          <TransactionList cardNumber={cardData.cardNumber} />
        </Panel>
      </div>
    </div>
  );
};

export default Content;
