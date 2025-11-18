import React from "react";

const Payments: React.FC = () => {
  return (
    <div
      className="bg-white flex flex-col gap-6 card-container flex-1 p-8"
      data-testid="payments-page"
    >
      <h1 className="text-2xl font-bold text-center pt-10 text-black">
        Payments Page
      </h1>
    </div>
  );
};

export default Payments;
