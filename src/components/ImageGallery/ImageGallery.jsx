import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Gallery } from "./ImageGallery.styled"
import PropTypes, { shape } from "prop-types"

export const ImageGallery = ({ images }) => {
    
    return (
        <Gallery>
            {images.map(image => {
               return <ImageGalleryItem image={image} key={image.id}/>
            })}

        </Gallery>
    )
    
}



ImageGallery.propTypes = {
    images: PropTypes.arrayOf(shape({
        id: PropTypes.number.isRequired,
    }
    )).isRequired
}