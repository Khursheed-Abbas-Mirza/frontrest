import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/back.png')",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      <div className="w-full max-w-lg p-8 bg-transparent backdrop-blur-lg  text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#fff] mb-4">
          Welcome to Restuarnat Online Booking!
        </h1>

        {/* Subheading */}
        <p className="text-[#fff] mb-6">
          Why wait? Book your table online now and enjoy a seamless dining
          experience.Check Your Dates and Times and Book table whenver you want we are Ready to serve you.
        </p>

        {/* Call-to-Action Button */}
        <Link href="/Booking">
          <span className="bg-[#0f0] text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#00cc00] transition mr-1">
            Book Online Now
          </span>
        </Link>
        <Link href="/checkavailability">
          <span className="bg-[#0f0] text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#00cc00] transition ml-1">
            check availability
          </span>
        </Link>
      </div>
    </div>
  );
}
