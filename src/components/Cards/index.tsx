import React from "react";
import Header from "./Header";
import CardTab from "./CardTab";
import Content from "./Content";
import Modal from "../shared/Modal";
import NewCardForm from "./NewCardForm";
import ErrorInfo from "../shared/ErrorInfo";
import Spinner from "../shared/Spinner";
import { useGetCards } from "../../query/cards.query";

const Cards: React.FC = () => {
  const [isNewCardModalOpen, setIsNewCardModalOpen] = React.useState(false);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const {
    data: cardsData = [],
    isLoading: isCardsLoading,
    isError: isCardsError,
    refetch: refetchCards,
    error: cardsError,
  } = useGetCards();

  const activeCard = cardsData[activeCardIndex];

  if (isCardsLoading) {
    return <Spinner />;
  }

  if (isCardsError) {
    return <ErrorInfo onRetry={refetchCards} message={cardsError.message} />;
  }

  const openNewCardModal = () => {
    setIsNewCardModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewCardModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 card-container flex-1 p-8 overflow-auto styled-scrollbar">
      <Header
        onAddNewCard={openNewCardModal}
        balance={activeCard.availableBalance}
      />
      <CardTab />
      <Content
        cardsData={cardsData}
        activeCardIndex={activeCardIndex}
        setActiveCardIndex={setActiveCardIndex}
      />
      <Modal
        isOpen={isNewCardModalOpen}
        onClose={handleCloseModal}
        title="Add New Card"
      >
        <NewCardForm onSuccess={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Cards;
