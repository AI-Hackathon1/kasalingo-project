import React from 'react'
import Navbar from '../../components/navbar'
import Lovely1 from '../../assets/images/Lovely1.jpg' // Replace with actual image paths
import Lovely2 from '../../assets/images/Lovely2.jpg'
import Lovely4 from '../../assets/images/Lovely4.jpg'

const Landing = () => {
  return (
    <div>
 

      <Navbar />

      <section className="relative w-full min-h-screen bg-pink-500 px-4 py-12 overflow-hidden">
        {/* Background Images */}
        <img
          src={Lovely1}
          alt="Top Left Decor"
          className="absolute top-2 left-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-spin"
        />
        <img
          src={Lovely1}
          alt="Top Right Decor"
          className="absolute top-2 right-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse"
        />
        <img
          src={Lovely2}
          alt="Bottom Right Decor"
          className="absolute bottom-2 right-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 motion-safe:animate-spin "
        />
        <img
          src={Lovely2}
          alt="Bottom Left Decor"
          className="absolute bottom-2 left-2 border-2 border-blue-500 rounded-full w-32 md:w-48 lg:w-60 object-contain z-0 animate-pulse"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 mt-12 md:mt-20">
          <span className="text-5xl md:text-3xl lg:text-4xl font-bold text-white">
            Ghanaian Language Adventure!
          </span>
          <span className="text-lg md:text-4xl text-blue-800 font-medium italic">
            Kasalingo GH 100% Free and Easy to Use
          </span>
          <span className="text-lg md:text-4xl text-red-800 ">
            Filled with Fun Games and Stories
          </span>
          <span className="text-lg md:text-4xl text-green-700">
            Ages 4–12 around the world
          </span>
          <span className="text-lg md:text-4xl text-purple-700">
            Learn Ghanaian Language and Culture
          </span>

         
           <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ">
            Join the Fun
          </button>
        </div>
      </section>

      <section>

       <div className="overflow-hidden whitespace-nowrap bg-yellow-100 py-4">
        <div
         className="inline-block animate-slide"
         style={{
         animation: 'slide 10s linear infinite',
         display: 'inline-flex',
         gap: '5rem',
        }}
       >
        <button className="bg-red-500 text-white py-2 px-6 rounded-full">Learn Twi</button>
        <button className="bg-green-700 text-white py-2 px-6 rounded-full">Speak Ga</button>
        <button className="bg-black text-white py-2 px-6 rounded-full">Read Ewe</button>
        <button className="bg-yellow-400 text-white py-2 px-6 rounded-full">Write Dagbani</button>
       </div>
      </div>

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


         <img src={Lovely4} alt="" className=''/>

        </section>

        <section>
          
        </section>
    </div>
  )
}

export default Landing
