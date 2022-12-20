import { Modal } from "components/Modal/Modal"
import { useState } from "react"
import { GalleryItem } from "./ImageGalleryItem.styled"
import PropTypes, { shape } from "prop-types"

export const ImageGalleryItem = ({ image }) => {
    const [selectedImage, setSelectedImage] = useState(null)

  

    const hendleClick = (e) => {
        setSelectedImage(e.target.src);
    }

    const hendleModalClose = () => {
        setSelectedImage(null)
    } 


    
   return (
        <GalleryItem onClick={hendleClick}>
           <img src={image.smallImage} alt={image.tags} />
           {selectedImage && <Modal image={selectedImage} onClose={hendleModalClose} />}
        </GalleryItem>
    )
}
 


ImageGalleryItem.propTypes = {
    image: shape({
        smallImage: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,

    })
}
