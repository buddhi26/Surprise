import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

function App() {
  const images = [
    import.meta.env.BASE_URL +"/images/photo1.jpg",
    import.meta.env.BASE_URL +"/images/photo2.jpg",
    import.meta.env.BASE_URL +"/images/photo3.jpg",
    import.meta.env.BASE_URL +"/images/photo4.jpg",
    import.meta.env.BASE_URL +"/images/photo5.jpg",
    import.meta.env.BASE_URL +"/images/photo6.jpg",
    import.meta.env.BASE_URL +"/images/photo7.jpg",
    import.meta.env.BASE_URL +"/images/photo8.jpg",
    import.meta.env.BASE_URL +"/images/photo9.jpg",
    import.meta.env.BASE_URL +"/images/photo10.jpg",
    import.meta.env.BASE_URL +"/images/photo11.jpg",
    import.meta.env.BASE_URL +"/images/photo12.jpg",
  ];

  const messages = [
    "Excuse me sir… how are you THIS handsome? 😌",
    "Aapka mujhse lagaav badhta ja raha hai, Bhagwan ji aapki raksha kare 🙏✨",
    "Forever grateful the universe brought you to me ∞💖",
    "Official announcement: You are stuck with me forever! 😜",
    "Tumse hi din hota hai, tumse hi raat hoti hai... 🌅🌙",
    "Thank you for making my heart smile every single day 💖",
    "Stop being so cute, it's distracting 😏",
    "You are my safe place, my happiness, and my biggest blessing 💞",
    "My favorite notification is YOU 💌",
    "Tumhari smile dekh ke mera din ban jata hai 😊💫",
    "You're not just my Valentine, you're my every day 💝",
    "Har din tumhare saath ek nayi kahani hai 🌹✨",
  ];

  const [index, setIndex] = useState(0);
  const audioRef = useRef(null);

  // Auto image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Autoplay music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      // Try to play, and if it fails due to browser policy, play on first user interaction
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, play on first user interaction
          const playOnInteraction = () => {
            audioRef.current.play();
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("touchstart", playOnInteraction);
          };
          document.addEventListener("click", playOnInteraction);
          document.addEventListener("touchstart", playOnInteraction);
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 overflow-hidden relative flex flex-col items-center justify-center text-white">
      {/* Background Music */}
      <audio ref={audioRef}   src={import.meta.env.BASE_URL + "music/tumse-hi-tumse.mp3"} loop autoPlay />

      {/* Sparkle Glitter Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1, 0],
              scale: [0, 1, 0.8, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: ["#fbbf24", "#fde047", "#ffffff", "#fef3c7", "#fcd34d"][
                Math.floor(Math.random() * 5)
              ],
              filter: "drop-shadow(0 0 6px currentColor)",
            }}
          >
            <Sparkles size={8 + Math.random() * 16} />
          </motion.div>
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0, scale: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            className="absolute text-red-500"
            style={{
              left: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))",
            }}
          >
            <Heart size={15 + Math.random() * 25} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Popping Hearts on Click */}
      <motion.div
        key={index}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <Heart size={80} fill="#ef4444" className="text-red-500" />
      </motion.div>

      {/* Title */}
      <motion.div className="relative z-10">
        {/* Sparkles around title */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`title-sparkle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${i * 20}%`,
              top: i % 2 === 0 ? "-20px" : "auto",
              bottom: i % 2 === 0 ? "auto" : "-20px",
              color: "#fef3c7",
              filter: "drop-shadow(0 0 6px #fbbf24)",
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl text-center drop-shadow-2xl mb-4 px-4"
          style={{
            fontFamily: "Pacifico, cursive",
            letterSpacing: "2px",
            color: "#fff5f5",
            textShadow:
              "0 0 30px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(254, 202, 202, 0.6)",
          }}
        >
          Happy Valentine's Day 💖
        </motion.h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-2xl md:text-3xl text-center z-10 mb-6 px-4 drop-shadow-lg"
        style={{
          fontFamily: "Dancing Script, cursive",
          fontWeight: 600,
          color: "#fffbeb",
          textShadow:
            "0 0 20px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 15px rgba(254, 243, 199, 0.5)",
        }}
      >
        To My Favorite Person in the Whole World ✨
      </motion.p>

      {/* Image Carousel */}
      <div className="relative w-[90%] max-w-[400px] h-[400px] md:h-[500px] z-10">
        {/* Sparkles around image */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`img-sparkle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 30}%`,
              top: `${i < 4 ? -5 : 105}%`,
              color: "#fde047",
              filter: "drop-shadow(0 0 8px #fbbf24)",
            }}
          >
            <Sparkles size={20} />
          </motion.div>
        ))}

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt="Love"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white"
            style={{
              boxShadow:
                "0 0 40px rgba(251, 191, 36, 0.3), 0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Message */}
      <motion.div className="relative mt-8 z-10">
        {/* Sparkles around message */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`msg-sparkle-${i}-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1, 0.8, 1.3, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              left: i < 2 ? "-30px" : "auto",
              right: i >= 2 ? "-30px" : "auto",
              top: `${(i % 2) * 50 + 25}%`,
              color: "#fde047",
              filter: "drop-shadow(0 0 6px #fbbf24)",
            }}
          >
            <Sparkles size={18} />
          </motion.div>
        ))}

        <motion.div
          key={index + "text"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/30 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl text-xl md:text-2xl text-center max-w-2xl mx-4 border-2 border-white/40"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            lineHeight: "1.6",
            color: "#fef3c7",
            textShadow:
              "0 2px 4px rgba(0, 0, 0, 0.3), 0 0 15px rgba(254, 243, 199, 0.4)",
            boxShadow:
              "0 0 30px rgba(251, 191, 36, 0.2), 0 10px 40px rgba(0, 0, 0, 0.2)",
          }}
        >
          {messages[index]}
        </motion.div>
      </motion.div>

      {/* Photo Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 flex gap-2 z-10"
      >
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === index ? "scale-125" : ""
            }`}
            style={{
              backgroundColor:
                i === index ? "#fef3c7" : "rgba(255, 255, 255, 0.5)",
              boxShadow:
                i === index ? "0 0 10px rgba(254, 243, 199, 0.8)" : "none",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default App;
