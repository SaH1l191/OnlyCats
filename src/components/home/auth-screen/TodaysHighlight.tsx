"use client"
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';



const TodaysHighlight = () => {
    return (
        <div className='w-full md:w-3/4 mx-auto'>
            <CldVideoPlayer
                width="960"
                height="540"
                muted 
                loop
                 
                bigPlayButton={true} 
                className='rounded-md '
                src="highlighted-vid__chxmxg"
            />

        </div>
    )
}

export default TodaysHighlight