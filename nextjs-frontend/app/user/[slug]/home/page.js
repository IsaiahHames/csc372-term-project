"use client";

import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import TriviaService from "@/services/TriviaService";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
    const { slug } = use(params);
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});


    const categories = [
        { id: "9", name: "General Knowledge" },
        { id: "10", name: "Entertainment: Books" },
        { id: "11", name: "Entertainment: Film" },
        { id: "12", name: "Entertainment: Music" },
        { id: "13", name: "Entertainment: Musicals & Theatres" },
        { id: "14", name: "Entertainment: Television" },
        { id: "15", name: "Entertainment: Video Games" },
        { id: "16", name: "Entertainment: Board Games" },
        { id: "17", name: "Science & Nature" },
        { id: "18", name: "Science: Computers" },
        { id: "19", name: "Science: Mathematics" },
        { id: "20", name: "Mythology" },
        { id: "21", name: "Sports" },
        { id: "22", name: "Geography" },
        { id: "23", name: "History" },
        { id: "24", name: "Politics" },
        { id: "25", name: "Art" },
        { id: "26", name: "Celebrities" },
        { id: "27", name: "Animals" },
        { id: "28", name: "Vehicles" },
        { id: "29", name: "Entertainment: Comics" },
        { id: "30", name: "Science: Gadgets" },
        { id: "31", name: "Entertainment: Japanese Anime & Manga" },
        { id: "32", name: "Entertainment: Cartoon & Animations" }
    ];

    const types = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True / False" }
    ];

    const steps = [
        {
            question: "Choose difficulty!",
            options: ["easy", "medium", "hard"]
        },
        {
            question: "Choose Number of Questions!",
            options: ["5", "10", "15", "20"]
        },
    ];

    const keys = ["category", "difficulty", "amount", "type"];

    const handleAnswer = async (value) => {

        const updated = {
            ...answers,
            [keys[step]]: value
        };
    
        setAnswers(updated);
    
        const next = step + 1;
        setStep(next);
    
        if (next === keys.length) {
    
            const signature =
                `${updated.category}|${updated.difficulty}|${updated.amount}|${updated.type}`;
    
            console.log("FINAL PARAMS:", updated);
    
            const res = await TriviaService.getTrivia(updated);
    
            if (!res.data.success) {
                alert(res.data.message);
                setStep(0);
                setAnswers({});
                return;
            }
    
            await TriviaService.addQuestions({
                id: signature,
                questions: res.data.questions
            });
    
            router.push(`/user/${slug}/trivia?key=${signature}`);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link active" href={`/user/${slug}/home`} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href={`/user/${slug}/leaderboard`}>Leaderboard</Link>
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" href="/login">Logout</Link>
                    </li>
                </ul>
            </nav>

            <h1 className="text-center mt-5">TriviaChallenger</h1>

            {step === 0 && (
                <>
                    <h3 className="text-center mt-5">
                        Choose a category!
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
                        {categories.map(category => (
                            <button
                                className="btn btn-dark"
                                key={category.id}
                                onClick={() => handleAnswer(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {step > 0 && step <= steps.length && (
                <>
                    <h3 className="text-center mt-5">
                        {steps[step - 1].question}
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
                        {steps[step - 1].options.map(option => (
                            <button
                                className="btn btn-dark"
                                key={option}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {step === steps.length + 1 && (
                <>
                    <h3 className="text-center mt-5">
                        Choose a question type!
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
                        {types.map(type => (
                            <button
                                className="btn btn-dark"
                                key={type.id}
                                onClick={() => handleAnswer(type.id)}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </>
            )}


        </>
    );
}