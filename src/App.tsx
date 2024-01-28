import { v4 as uuid } from "uuid";
import { useState } from "react";
import Button from "Common/button/Button";

interface Clothes {
  id: string;
  name: string;
  imgURL: string | null;
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
      atLaundry: true,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    imgURL: null as string | null, // Initialize imgURL as null
    imgFile: null as File | null,
    atLaundry: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCloth: Clothes = {
      id: uuid(),
      name: formData.name,
      imgURL: formData.imgURL,
      atLaundry: formData.atLaundry,
    };
    setClothes([...clothes, newCloth]);
    setFormData({
      name: "",
      imgURL: null, // Reset imgURL to null after submission
      imgFile: null,
      atLaundry: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      if (files?.length) {
        setFormData({
          ...formData,
          imgURL: URL.createObjectURL(files[0]), // Use blob URL for uploaded image
          [name]: files[0], // Store the uploaded image file
        });
      } else {
        setFormData({
          ...formData,
          imgURL: null, // Reset imgURL to null when no image is selected
          [name]: null,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  console.log(clothes);

  return (
    <>
      <div>Clothes Input</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imgFile">Upload Image:</label>
          <input
            type="file"
            id="imgFile"
            name="imgFile"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="atLaundry">At Laundry:</label>
          <input
            type="checkbox"
            id="atLaundry"
            name="atLaundry"
            checked={formData.atLaundry}
            onChange={() =>
              setFormData({ ...formData, atLaundry: !formData.atLaundry })
            }
          />
        </div>
        <Button type="submit">Send to Laundry</Button>
      </form>
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
  const filteredItems = mappingArray.filter(
    (item) => item.atLaundry === atLaundry
  );
  if (filteredItems.length > 0) {
    return (
      <>
        <h1 className="font-medium text-xl">{title}</h1>
        {filteredItems.map((filteredItem) => (
          <ClothesStatusCard key={filteredItem.id} cardItem={filteredItem} />
        ))}
      </>
    );
  } else {
    // If the length of the filtered array is 0, return null (don't render anything)
    return null;
  }
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
      {imgURL && <img src={imgURL} alt={name} width="100%" height="auto" />}
      <div className="flex flex-row my-1">
        <h2 className="font-medium">Name:</h2>
        <span className="text capitalize ml-1"> {name}</span>
      </div>
      <Button onClick={handleSwitchStatus}>
        {atLaundry
          ? "Ah yaar, cloth is at Home"
          : "La mya, cloth is at Laundry"}
      </Button>
    </div>
  );
};
