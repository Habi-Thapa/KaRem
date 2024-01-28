import { v4 as uuid } from "uuid";
import { useState } from "react";

interface Clothes {
  id: string;
  name: string;
  imgURL: string;
  atLaundry: boolean;
}

const App: React.FC = () => {
  const [clothes, setClothes] = useState<Clothes[]>([
    {
      id: uuid(),
      name: "pants",
      imgURL: "https://via.placeholder.com/150",
      atLaundry: true,
    },
    {
      id: uuid(),
      name: "shirt",
      imgURL: "https://via.placeholder.com/150",
      atLaundry: true,
    },
    {
      id: uuid(),
      name: "Shocks",
      imgURL: "https://via.placeholder.com/150",
      atLaundry: false,
    },
  ]);
  console.log(clothes);
  return (
    <>
      <div>Clothes Input</div>

      <ClothesStatusList mappingArray={clothes} atLaundry />
      <ClothesStatusList mappingArray={clothes} />
    </>
  );
};

export default App;

type ClothesStatusListProps = {
  mappingArray: Clothes[];
  atLaundry?: boolean;
};

const ClothesStatusList: React.FC<ClothesStatusListProps> = ({
  mappingArray,
  atLaundry = false,
}) => {
  const title = atLaundry ? "At Laundry:" : "At Home:";
  return (
    <>
      <h1 className="font-medium text-xl">{title}</h1>

      {mappingArray
        .filter((item) => item.atLaundry === atLaundry)
        .map((filteredItem) => (
          <ClothesStatusCard key={filteredItem.id} cardItem={filteredItem} />
        ))}
    </>
  );
};

const ClothesStatusCard: React.FC<{
  cardItem: Clothes;
}> = ({ cardItem }) => {
  const { id, name, imgURL, atLaundry } = cardItem;

  const handleSwitchStatus = () => {
    // Call the onSwitchStatus callback to toggle the "atLaundry" value
    console.log("Button Clicked");
  };

  return (
    <div className="py-3">
      <img src={imgURL} alt={name} width="100%" height="auto" />
      <div className="flex flex-row my-1">
        <h2 className="font-medium">Name:</h2>
        <span className="text capitalize ml-1"> {name}</span>
      </div>
      <button
        className="border border-cyan-500 w-full px-1 py-3 bg-cyan-900 text-white font-[500] capitalize my-1"
        onClick={handleSwitchStatus}
      >
        {atLaundry
          ? "Ah yaar, cloth is at Home"
          : "La mya, cloth is at Laundry"}
      </button>
    </div>
  );
};
