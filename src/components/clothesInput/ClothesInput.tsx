import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormValues {
  cloth: FileList;
}

const ClothesInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { register, handleSubmit } = useForm<IFormValues>();

  const handleFileChange = (event) => {
    // Set the selected file when the input value changes
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your upload logic here, e.g., using fetch or an API call
    } else {
      console.log("No file selected");
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept="image/*"
          {...register("cloth")}
          onChange={handleFileChange}
        />
        <div>Image Preview</div>
        <input type="submit" value="Drop at Laundry" />
      </form>
    </>
  );
};

export default ClothesInput;
