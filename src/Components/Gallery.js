import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import GalleryItem from "./GalleryItem";

function Gallery() {
    const data = useContext(DataContext);

  const display = data.map((item, i) => {
    return <GalleryItem key={i} item={item} />
  })
  return (
    <div>
      {display}
    </div>
  );
}

export default Gallery;