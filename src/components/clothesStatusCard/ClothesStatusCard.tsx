import Button from "Common/button/Button";
interface Clothes {
  id: string;
  name: string;
  imgURL: string | null;
  atLaundry: boolean;
}
const ClothesStatusCard: React.FC<{
  cardItem: Clothes;
  handleSwitchStatus: (id: string) => void; // Add handleSwitchStatus prop
}> = ({ cardItem, handleSwitchStatus }) => {
  const { id, name, imgURL, atLaundry } = cardItem;

  const toggleClothesLocation = () => handleSwitchStatus(id);

  return (
    <div className="py-3">
      {imgURL && <img src={imgURL} alt={name} width="100%" height="auto" />}
      <div className="flex flex-row my-1">
        <h2 className="font-medium">Name:</h2>
        <span className="text capitalize ml-1"> {name}</span>
      </div>
      <Button onClick={toggleClothesLocation}>
        {atLaundry
          ? "Ah yaar, cloth is at Home"
          : "La mya, cloth is at Laundry"}
      </Button>
    </div>
  );
};
export default ClothesStatusCard;
