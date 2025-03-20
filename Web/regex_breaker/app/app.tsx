import React from "react";
import "./app.css";
import { useState } from "react";
import RegexTester from "./RegexTester";
import ChallengeDescription from "./ChallengeDescription";

const HomePage: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Regex Breaker</h1>
      <ChallengeDescription />
      <RegexTester />
    </div>
  </div>
  );
};

export default HomePage;
