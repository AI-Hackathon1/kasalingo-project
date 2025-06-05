import React from "react";
import { Link } from "react-router-dom";
import Footer from "@components/Footer";
import ErrorBoundary from "../../components/ErrorBoundary"; // Update import path

import Lovely from "../../assets/images/Lovely.jpg";
import Lovely1 from "../../assets/images/Lovely1.jpg";
import Lovely2 from "../../assets/images/Lovely2.jpg";
import Lovely3 from "../../assets/images/Lovely3.jpg";
import Lovely5 from "../../assets/images/Lovely5.jpg";
import Lovely6 from "../../assets/images/Lovely6.jpg";
import Lovely7 from "../../assets/images/Lovely7.jpg";
import Lovely8 from "../../assets/images/Lovely8.jpeg";
import Lovely9 from "../../assets/images/Lovely9.jpeg";
import Lovely10 from "../../assets/images/Lovely10.jpeg";
import Topnav from "../../components/Topnav";

const Landing = () => {
  return (
    <ErrorBoundary>
      <Topnav />
      <section>
        <div
          className="relative bg-cover bg-center bg-no-repeat min-h-[70vh] p-8 flex items-center justify-start text-start brightness-125"
          style={{ backgroundImage: `url(${Lovely})` }}
        >
          <div className="absolute  inset-0"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-blue-500">
              Hello Children! Learn Ghanaian Languages Everywhere You Are,
              Anytime! With Ease and Fun
            </h1>
            <p className="text-bold leading-relaxed text-[#210F37]">
              With our interactive, Ghanaian-language-based web app, Kasalingo
              GH, we’re making it easy and fun for Ghanaian kids abroad to learn
              local languages like Twi, Ga, and Ewe—through games, stories,
              songs, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="bg- bg-gradient-to-br from-sky-200 via-pink-300 to-sky-300 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full rounded-3xl overflow-hidden shadow-xl border border-pink-200 bg-white/80 backdrop-blur-2xl">
          {/* Header Area */}
          <div className="relative h-64 bg-gradient-to-tr from-[#FBCFE8] via-pink-100 to-white">
            <div className="absolute inset-0 flex flex-col justify-center px-8 py-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#210F37] mb-2 drop-shadow-md">
                About Our Platform
              </h2>
              <p className="text-[#210F37]/70 text-base sm:text-lg max-w-lg">
                Empowering learners worldwide with Ghanaian language immersion,
                culture, and educational tools tailored for the modern child.
              </p>
            </div>
            <div className="absolute bottom-3 right-4 bg-white/70 backdrop-blur-lg rounded-lg px-4 py-2 shadow text-[#210F37] font-semibold text-xs flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#FDE68A] mr-1"></span>
              <span>Kasalingo GH</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-8 py-7 bg-white/90">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-[#210F37]">
              <div>
                <p className="font-semibold text-lg">Our Vision</p>
                <p className="mt-2 text-sm text-[#210F37]/80">
                  To reconnect Ghanaian children across the globe with their
                  roots through fun, engaging, and culturally-rich learning
                  experiences.
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Our Team</p>
                <p className="mt-2 text-sm text-[#210F37]/80">
                  A passionate team of educators, developers, and creatives
                  committed to preserving and promoting local languages.
                </p>
              </div>
            </div>
            <div className="mt-7 pt-5 border-t border-[#FBCFE8]">
              <p className="text-[#210F37]/70 text-base">
                From language games to live tutoring, we’re building tools to
                celebrate heritage and help the next generation speak it
                proudly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#5e1b55] min-h-[80vh] py-10 px-4 flex flex-col">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured Languages
          </h2>
          <p className="text-[#FBCFE8] mt-2 text-sm sm:text-base max-w-md mx-auto">
            Explore and grow your skills in local Ghanaian languages
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto flex-grow">
          {/* Card 1 */}
          <div className="bg-[#FBCFE8] p-6 rounded-2xl shadow-lg text-center hover:scale-95 transition-transform duration-300 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-2">
              Learn Twi
            </h1>
            <p className="text-pink-700 text-sm md:text-base mb-2">
              Master common phrases and enhance your vocabulary with ease.
            </p>
            <span className="text-2xl">🧠📖🎈</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-95 transition-transform duration-300 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-[#210F37] mb-2">
              Speak Ga
            </h1>
            <p className="text-[#210F37] text-sm md:text-base mb-2">
              Speak confidently with native Ga expressions and tips.
            </p>
            <span className="text-2xl">🗣️🎤✨</span>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FBCFE8] p-6 rounded-2xl shadow-lg text-center hover:scale-95 transition-transform duration-300 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-2">
              Read Ewe
            </h1>
            <p className="text-pink-700 text-sm md:text-base mb-2">
              Improve your reading skills and recognize Ewe script patterns.
            </p>
            <span className="text-2xl">📚👓🌟</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-95 transition-transform duration-300 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-[#210F37] mb-2">
              Write Dagbani
            </h1>
            <p className="text-[#210F37] text-sm md:text-base mb-2">
              Practice spelling and sentence construction in Dagbani.
            </p>
            <span className="text-2xl">✍️📝🎨</span>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gradient-to-br from-sky-200 via-pink-300 to-sky-300">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#2C1B47]">
          Level Of Learners
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto bg-[#5e1b55] rounded-sm overflow-hidden">
          {/* Fundamental */}
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <img
              src={Lovely1}
              alt="Fundamental"
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:animate-pulse"
            />
            <h3 className="text-4xl font-semibold text-white">Fundamental</h3>
            <p className="text-pink-500 text-2xl">Ages 4 – 6</p>
          </div>

          {/* Intermediate */}
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <img
              src={Lovely2}
              alt="Intermediate"
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:animate-pulse"
            />
            <h3 className="text-4xl font-semibold text-white">Intermediate</h3>
            <p className="text-pink-500 text-2xl">Ages 7 – 9</p>
          </div>
        </div>

        {/* Advanced */}
        <div className="max-w-md mx-auto  bg-[linear-gradient(to_right,_yellow,_pink,_#C8A2C8,_#5e1b55)] rounded-sm mt-6">
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <img
              src={Lovely3}
              alt="Advanced"
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:animate-pulse"
            />
            <h3 className="text-4xl font-semibold text-white">Advanced</h3>
            <p className="text-pink-500 text-2xl">Ages 10 – 12</p>
          </div>
        </div>
      </section>

      <section className="h-auto min-h-[100vh] bg-[#5e1b55] bg-cover bg-center py-10 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Featured Lessons❓
        </h2>
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Lesson 1 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center text-white">
            <div className="w-full h-80 rounded-xl mb-4">
              <img
                src={Lovely5}
                alt="Text Translation Lessons"
                className="h-full w-full rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#2C1B47]">
              Text Translation Lessons
            </h3>
            <p className="text-sm mb-1 text-[#2C1B47]">Type English Word</p>
            <p className="text-sm mb-4 text-[#2C1B47]">
              See Twi, Ga, Ewe, Dagbani Response
            </p>
            <Link
              to="/Register"
              className="bg-[linear-gradient(to_right,_yellow,_pink,_#C8A2C8,_#5e1b55)] text-white px-4 py-2 rounded-full transition hover:scale-95"
            >
              Learn More ❤️➡️
            </Link>
          </div>

          {/* Lesson 2 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center text-white">
            <div className="w-full h-80 rounded-xl mb-4">
              <img
                src={Lovely6}
                alt="Fun Mini-games"
                className="h-full w-full rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#2C1B47]">
              Fun Mini-games
            </h3>
            <p className="text-sm mb-1 text-[#2C1B47]">
              Match Names of Animals/Fruits in English
            </p>
            <p className="text-sm mb-4 text-[#2C1B47]">
              To Twi, Ga, Ewe and Dagbani Equivalent
            </p>
            <Link
              to="/Register"
              className=" bg-[linear-gradient(to_right,_yellow,_pink,_#C8A2C8,_#5e1b55)] text-white px-4 py-2 rounded-full transition hover:scale-95"
            >
              Learn More ❤️➡️
            </Link>
          </div>

          {/* Lesson 3 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center text-white">
            <div className="w-full h-80 rounded-xl mb-4">
              <img
                src={Lovely7}
                alt="Interesting Ghanaian Tales"
                className="h-full w-full rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#2C1B47]">
              Interesting Ghanaian Tales
            </h3>
            <p className="text-sm mb-1 text-[#2C1B47]">
              Sharpen your Listening/Reading Skills
            </p>
            <p className="text-sm mb-4 text-[#2C1B47]">
              In Twi, Ga, Ewe and Dagbani
            </p>
            <Link
              to="/Register"
              className=" bg-[linear-gradient(to_right,_yellow,_pink,_#C8A2C8,_#5e1b55)] text-white px-4 py-2 rounded-full transition hover:scale-95"
            >
              Learn More ❤️➡️
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-200 via-pink-300 to-sky-300 py-12 px-6 text-[#2C1B47]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">Meet the Kasalingo Team</h2>
            <p className="text-[#2C1B47] text-lg">
              A passionate trio working to bridge cultures through Ghanaian
              languages.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Frontend Developer 1 */}
            <div className="bg-[#5e1b55] rounded-xl p-6 text-center shadow-md">
              <img
                src={Lovely9} // Replace with actual image URL
                alt="Frontend Developer 1"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-[#FBCFE8]"
              />
              <h3 className="text-2xl font-semibold text-white">
                Frontend Developer
              </h3>
              <p className="text-pink-200">
                Builds beautiful and responsive user interfaces for Kasalingo.
              </p>
            </div>

            {/* Frontend Developer 2 */}
            <div className="bg-[#5e1b55] rounded-xl p-6 text-center shadow-md">
              <img
                src={Lovely8} // Replace with actual image URL
                alt="Frontend Developer 2"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-[#FBCFE8]"
              />
              <h3 className="text-2xl font-semibold text-white">
                Frontend Developer
              </h3>
              <p className="text-pink-200">
                Focuses on intuitive UX and seamless app functionality.
              </p>
            </div>

            {/* Backend Developer */}
            <div className="bg-[#5e1b55] rounded-xl p-6 text-center shadow-md">
              <img
                src={Lovely10} // Replace with actual image URL
                alt="Backend Developer"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-[#FBCFE8]"
              />
              <h3 className="text-2xl font-semibold text-white">
                Backend Developer
              </h3>
              <p className="text-[#FBCFE8]">
                Handles all the logic and data flow behind the scenes at
                Kasalingo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </ErrorBoundary>
  );
};

export default Landing;
