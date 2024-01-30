import { v4 as uuid } from "uuid";
import { createContext, useState } from "react";
import { useRef } from "react";

import Button from "Common/button/Button";
import Input from "Common/input/Input";
import Title from "Common/title/Title";
import ClothesStatusList from "Components/clothesStatusList/ClothesStatusList";

export const HandleSwitchStatusContext = createContext<(id: string) => void>(
  () => {}
);

interface Clothes {
  id: string;
  name: string;
  imgURL: string | null;
  atLaundry: boolean;
}

const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clothes, setClothes] = useState<Clothes[]>([
    // {
    //   id: uuid(),
    //   name: "pants",
    //   imgURL: "https://via.placeholder.com/150",
    //   atLaundry: true,
    // },
    // {
    //   id: uuid(),
    //   name: "shirt",
    //   imgURL: "https://via.placeholder.com/150",
    //   atLaundry: true,
    // },
    // {
    //   id: uuid(),
    //   name: "Shocks",
    //   imgURL: "https://via.placeholder.com/150",
    //   atLaundry: true,
    // },
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
      atLaundry: true,
    };
    setClothes([...clothes, newCloth]);
    setFormData({
      name: "",
      imgURL: null, // Reset imgURL to null after submission
      imgFile: null,
      atLaundry: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const handleSwitchStatus = (id: string) => {
    setClothes((prevClothes) => {
      return prevClothes.map((cloth) => {
        if (cloth.id === id) {
          return { ...cloth, atLaundry: !cloth.atLaundry };
        }
        return cloth;
      });
    });
  };

  console.log("clothes", clothes);

  return (
    <>
      <HandleSwitchStatusContext.Provider value={handleSwitchStatus}>
        <Title title="Cloth Details:" />
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            label="Name:"
            value={formData.name}
            onChange={handleInputChange}
          />

          <Input
            forwardRef={fileInputRef}
            id="imgFile"
            type="file"
            name="imgFile"
            label="Upload Image:"
            accept="image/*"
            onChange={handleInputChange}
          />
          <Button type="submit">Send to Laundry</Button>
        </form>
        <ClothesStatusList
          mappingArray={clothes}
          atLaundry={true} // Display clothes at laundry
        />
        <ClothesStatusList
          mappingArray={clothes}
          atLaundry={false} // Display clothes at home
        />
      </HandleSwitchStatusContext.Provider>
    </>
  );
};

export default App;
