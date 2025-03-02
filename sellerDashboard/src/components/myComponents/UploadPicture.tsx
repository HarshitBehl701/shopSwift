import { useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Trash, UploadCloud } from "lucide-react";
import { IUploadPictureParam } from "@/interfaces/componentsInterface";
import { handleToastPopup } from "@/utils/commonUtils";
import { ToastContainer } from "react-toastify";
import { Button } from "../ui/button";

function UploadPicture({displayText,limit,images,setImages,allowedFiles,maxFileSize}:IUploadPictureParam) {

  const handleFiles = useCallback((files: FileList | null) => {
    if (files) {
      if(images.length > limit)
        handleToastPopup({message:`At Max  ${limit} Images Are Allowed  To Be Uploaded`,type:"error"});
      else  if(allowedFiles.includes(files[0].type.toLowerCase()) === false)
        handleToastPopup({message:`Only ${allowedFiles.map((str) => str.split("/")[1]).join(" , ")} Images Are Allowed  To Be Uploaded`,type:"error"});
      else  if(files[0].size > maxFileSize)
        handleToastPopup({message:`File  Size Must  Be Under ${maxFileSize}`,type:"error"});
      else 
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  },[images.length,setImages,limit,allowedFiles,maxFileSize]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="flex flex-col items-center gap-4">
        <p className="text-xs">At  Max {limit} Images  Are  Allowed  To  Be  Uploaded</p>
      <Card
        className="w-80 h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <UploadCloud className="w-10 h-10 text-gray-500" />
        <p className="text-gray-600 capitalize text-center">{displayText}</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(ev:React.ChangeEvent<HTMLInputElement>) =>   handleFiles(ev.target.files)}
        />
      </Card>
      {images.length > 0 && (
        <>
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div className="image w-fit inline-block group  cursor-pointer border border-gray-300 relative rounded-md  shadow-md" key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md"
              />
              <Button className="absolute hidden group-hover:flex  items-center  justify-center text-center cursor-pointer top-0  w-full h-full  text-red-500 backdrop-blur-xs" onClick={() => setImages(images.filter(prevImage => prevImage !== image))}><Trash className="scale-150"/></Button>
            </div>
          ))}
        </div>
        </>
      )}
      <ToastContainer  />
    </div>
  );
}

export default UploadPicture;