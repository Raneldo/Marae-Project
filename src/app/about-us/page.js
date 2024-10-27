import './about.css';
import about_img from '@/assets/about.png';
import Title from '@/components/title/Title';
import Image from 'next/image'

const AboutUs = () => {
    return (
        <section className='mt-28'>
            <Title subtitle="About us" title="Who we are" />
            <div className="about">

                <div className="about-left">
                    <Image src={about_img} alt="" className="about-img" />
                </div>
                <div className="about-right">
                    <h3>Marae Car Parks</h3>
                    <h2>Giving Car Park Information For All Marae</h2>
                    <p>
                        At Marae Car Parks, we blend the latest in parking technology with the deep traditions of
                        our culture. Our logo features the Manaia, a revered Maori symbol of protection and
                        guidance. Traditionally depicted with the head of a bird, the body of a man, and the tail
                        of a fish, the Manaia serves as a spiritual guardian, warding off evil and guiding
                        spirits.
                    </p>
                    <p>
                        In the spirit of Manaia, Marae Car Parks serves as your guide in the physical world. We
                        provide real-time updates on parking availability at marae locations, ensuring you can
                        visit with ease and certainty. For marae administrators, our platform offers detailed
                        analytics to monitor and manage parking usage efficiently, guarding your space and guiding
                        your decisions.
                    </p>
                    <p>
                        With Marae Car Parks, experience the perfect blend of tradition and technology, making
                        every visit to the marae as seamless and meaningful as possible.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs