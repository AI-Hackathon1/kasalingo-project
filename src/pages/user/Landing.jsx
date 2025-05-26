import React from 'react'
import Navbar from '../../components/navbar'
import Lovely1 from '../../assets/images/Lovely1.jpg' // Replace with actual image paths
import Lovely2 from '../../assets/images/Lovely2.jpg'
import Lovely4 from '../../assets/images/Lovely4.jpg'
import Lovely from '../../assets/images/Lovely.jpg'
import Lovely5 from '../../assets/images/Lovely5.png'
import Lovely6 from '../../assets/images/Lovely6.jpg'

const Landing = () => {
  return (
    <div>
 

      <Navbar />

      <section className="relative w-full min-h-screen bg-purple-500 px-4 py-12 overflow-hidden">
        {/* Background Images */}
        <img
          src={Lovely1}
          alt="Top Left Decor"
          className="absolute top-2 left-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse"
        />
        <img
          src={Lovely1}
          alt="Top Right Decor"
          className="absolute top-2 right-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse"
        />
        <img
          src={Lovely2}
          alt="Bottom Right Decor"
          className="absolute bottom-2 right-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse "
        />
        <img
          src={Lovely2}
          alt="Bottom Left Decor"
          className="absolute bottom-2 left-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 mt-12 md:mt-20">
          <span className="text-5xl md:text-3xl lg:text-4xl font-bold text-white">
            Ghanaian Languages Adventure!
          </span>
          <span className="text-lg md:text-4xl text-blue-800 font-medium italic">
            Kasalingo GH 100% Free and Easy to Use
          </span>
          <span className="text-lg md:text-4xl text-red-800 ">
            Filled with Fun Games and Stories
          </span>
          <span className="text-lg md:text-4xl text-yellow-400">
            Ages 4–12 around the world
          </span>
          <span className="text-lg md:text-4xl text-green-800">
            Learn Ghanaian Languages and Culture
          </span>

         
           <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ">
            Join the Fun🧑‍🦯‍➡️
          </button>
        </div>
       </section>

       <section className='bg-pink-500'>
         {/* Scrolling Buttons */}
         <div className="overflow-hidden whitespace-nowrap bg-white py-4">
         <div
          className="inline-block animate-slide"
          style={{
          animation: 'slide 10s linear infinite',
          display: 'inline-flex',
          gap: '5rem',
         }}
        >
        <button className="bg-pink-500 text-white py-2 px-6 rounded-full hover:scale-105 transition">
        Learn Twi
        </button>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:scale-105 transition">
         Speak Ga
        </button>
        <button className="bg-black text-white py-2 px-6 rounded-full hover:scale-105 transition">
         Read Ewe
        </button>
        <button className="bg-purple-500 text-white py-2 px-6 rounded-full hover:scale-105 transition">
        Write Dagbani
       </button>
      </div>
    </div>

     {/* Animated Slide Keyframes */}
    <style>
     {`
      @keyframes slide {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
        }
      `}
      </style>

      {/* Styled Responsive Image */}
      <div className="w-full flex justify-center mt-8 px-4">
       <img
       src={Lovely4}
       alt="Lovely Ghana"
       className="w-full max-w-4xl rounded-2xl shadow-xl object-cover"
      />
      </div>
     </section>

  

     <section
     className="h-auto min-h-[80vh] bg-cover bg-center py-10 px-4 md:px-12"
     style={{ backgroundImage: `url(${Lovely})` }}
     >
     <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-8">
      What's New❓
     </h2>

     <div className="flex flex-col gap-8 md:flex-row md:justify-between">
     {/* Card 1 */}
     <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-full h-40 rounded-xl mb-4 flex items-center justify-center">
        <img src={Lovely5} alt="" className='h-full' />
      </div>
      <h3 className="text-lg font-semibold mb-2">Text Translation Lessons</h3>
      <p className="text-sm mb-1">Type English Word</p>
      <p className="text-sm mb-4">See Twi, Ga, Ewe, Dagbani Response</p>
      <button className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
        Learn More ❤️➡️
      </button>
    </div>

    {/* Card 2 */}
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-full h-40  rounded-xl mb-4 flex items-center justify-center">
        <img src={Lovely6} alt="" className='h-full rounded-lg' />
      </div>
      <h3 className="text-lg font-semibold mb-2">Fun Mini-games</h3>
      <p className="text-sm mb-1">Match Names of Animals/Fruits in English</p>
      <p className="text-sm mb-4">To Twi, Ga, Ewe and Dagbani Equivalent</p>
      <button className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
        Learn More ❤️➡️
      </button>
    </div>

    {/* Card 3 */}
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
       <img src="" alt="" className='h-full' />
      </div>
      <h3 className="text-lg font-semibold mb-2">Interesting Ghanaian Tales</h3>
      <p className="text-sm mb-1">Sharpen your Listening/Reading Skills</p>
      <p className="text-sm mb-4">In Twi, Ga, Ewe and Dagbani</p>
      <button className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
        Learn More ❤️➡️
      </button>
    </div>
  </div>
</section>

    </div>
  )
}

export default Landing
