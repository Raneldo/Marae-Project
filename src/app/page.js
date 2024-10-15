import "./Hero.css";
import dark_arrow from "@/assets/dark-arrow.png";
import Image from "next/image";
import Link from "next/link";

/**  Video Credits
 *  From iStock Photo
 *  https://www.istockphoto.com/video/traditional-wooden-maori-war-canoe-gm1468056073-499682149?utm_campaign=srp_videos_limitedresults&utm_content=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fvideos%2Fmaori%2F&utm_medium=affiliate&utm_source=pexels&utm_term=maori
 *  https://www.istockphoto.com/video/maori-statue-at-wairakei-terraces-in-new-zealand-silica-terraces-geothermal-and-gm2090334882-565773930?utm_campaign=srp_videos_limitedresults&utm_content=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fvideos%2Fmaori%2F&utm_medium=affiliate&utm_source=pexels&utm_term=maori
 *  https://www.istockphoto.com/video/new-zealand-maori-stone-carvings-at-taupo-lake-slow-zoom-in-on-face-gm1679191840-536536422?utm_campaign=srp_videos_limitedresults&utm_content=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fvideos%2Fmaori%2F&utm_medium=affiliate&utm_source=pexels&utm_term=maori
 */

export default function Home() {
  return (
    <div className="hero cont">
      <video autoPlay muted loop id="marae-video" >
        <source src="/videos/marae-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-text">
        <h1>Marae Car Parks</h1>
        <p>Easily explore marae locations and check parking availability</p>
        <button className="btn group hover:bg-primary hover:text-white transition-colors ">
          <Link href="/locations">Explore More</Link>
          <Image
            src={dark_arrow}
            alt=""
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
