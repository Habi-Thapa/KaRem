import ClothesStatusCard from "Components/clothesStatusCard/ClothesStatusCard";
import Title from "Common/title/Title";
import { useContext } from "react";
import { HandleSwitchStatusContext } from "../../App";

interface Clothes {
  id: string;
  name: string;
  imgURL: string | null;
  atLaundry: boolean;
}

type ClothesStatusListProps = {
  mappingArray: Clothes[];
  atLaundry?: boolean;
};

const ClothesStatusList: React.FC<ClothesStatusListProps> = ({
  mappingArray,
  atLaundry = false,
}) => {
  const handleSwitchStatus = useContext(HandleSwitchStatusContext);

  const title = atLaundry ? "At Laundry:" : "At Home:";
  const filteredItems = mappingArray.filter(
    (item) => item.atLaundry === atLaundry
  );
  if (filteredItems.length > 0) {
    return (
      <>
        <Title title={title} />
        {filteredItems.map((filteredItem) => (
          <ClothesStatusCard
            key={filteredItem.id}
            cardItem={filteredItem}
            handleSwitchStatus={handleSwitchStatus} // Pass handleSwitchStatus
          />
        ))}
      </>
    );
  } else {
    // If the length of the filtered array is 0, return null (don't render anything)
    return null;
  }
};

export default ClothesStatusList;
