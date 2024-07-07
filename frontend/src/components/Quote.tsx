import { useTypewriter, Cursor } from "react-simple-typewriter";
import 'react-simple-typewriter';

const quotes = [
  "It's not about having lots of money. It's about knowing how to manage it.",
  "A budget is telling your money where to go instead of wondering where it went.",
  "Wealth consists not in having great possessions, but in having few wants.",
  "The art is not in making money, but in keeping it.",
  "Beware of little expenses; a small leak will sink a great ship."
];

export const Quote = () => {
  const [text, count] = useTypewriter({
    words: quotes,
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-300 to-gray-400 p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800">
          <span>{text}</span>
          <span>
            <Cursor cursorColor="#000" />
          </span>
        </h1>
      </div>
    </div>
  );
};
