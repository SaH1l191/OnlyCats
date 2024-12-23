 
import RotatedText from "@/components/decorators/RotatedText";






const Testimonials = () => {
    return (
        <div className='mt-12'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter font-bold'>
                Why <RotatedText>choose</RotatedText> Us
            </h1>

            <p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
                Hear from our happy customers and see why they love our service.
            </p>


        </div>
    );
};

export default Testimonials;