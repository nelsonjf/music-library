import { useContext } from "react"
import { DataContext } from "../Context/DataContext"
import GalleryItem from "./GalleryItem"

function Gallery() {
    const data = useContext(DataContext)

    const songList = data.map((song, index) => {
        return (
            <GalleryItem item={song} key={index} />
        )
    })
    
    return (
        <div>
            {songList}
        </div>
    )
}

export default Gallery