import React from "react";
import Header from "./Header";
import CardTab from "./CardTab";
import Content from "./Content";
import Modal from "../shared/Modal";
import NewCardForm from "./NewCardForm";

const Cards: React.FC = () => {
  const [isNewCardModalOpen, setIsNewCardModalOpen] = React.useState(false);

  const openNewCardModal = () => {
    setIsNewCardModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewCardModalOpen(false);
  };

  return (
    <div className="bg-white flex flex-col gap-6 card-container flex-1 p-8">
      <Header onAddNewCard={openNewCardModal} />
      <CardTab />
      <Content />
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
