"use client";

import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import TriviaService from "@/services/TriviaService";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
    const { id } = use(params);
    const router = useRouter();

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});


    const categories = [
        { id: "9", name: "General Knowledge", description: "Mixed trivia from all topics." },
        { id: "10", name: "Books", description: "Questions about novels, authors, and literature." },
        { id: "11", name: "Film", description: "Movies, actors, and film trivia." },
        { id: "12", name: "Music", description: "Songs, artists, and music culture." },
        { id: "13", name: "Musicals & Theatres", description: "Stage shows and theatrical productions." },
        { id: "14", name: "Television", description: "TV shows, series, and characters." },
        { id: "15", name: "Video Games", description: "Games, consoles, and gaming history." },
        { id: "16", name: "Board Games", description: "Classic and modern tabletop games." },
        { id: "17", name: "Science & Nature", description: "General science and natural world facts." },
        { id: "18", name: "Science: Computers", description: "Technology, coding, and computers." },
        { id: "19", name: "Mathematics", description: "Math concepts and problem-solving." },
        { id: "20", name: "Mythology", description: "Gods, legends, and ancient myths." },
        { id: "21", name: "Sports", description: "Teams, athletes, and sporting events." },
        { id: "22", name: "Geography", description: "Countries, maps, and world locations." },
        { id: "23", name: "History", description: "Past events and historical figures." },
        { id: "24", name: "Politics", description: "Governments, leaders, and policies." },
        { id: "25", name: "Art", description: "Paintings, artists, and creative works." },
        { id: "26", name: "Celebrities", description: "Famous people from various industries." },
        { id: "27", name: "Animals", description: "Wildlife, pets, and animal facts." },
        { id: "28", name: "Vehicles", description: "Cars, planes, and transportation." },
        { id: "29", name: "Comics", description: "Comic books, heroes, and stories." },
        { id: "30", name: "Science: Gadgets", description: "Devices, inventions, and tech gear." },
        { id: "31", name: "Japanese Anime & Manga", description: "Anime series and manga stories." },
        { id: "32", name: "Cartoon & Animations", description: "Animated shows and films." }
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

            router.push(`/user/${id}/trivia?key=${signature}`);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <Link className="navbar-brand fw-bold fs-2" href={`/user/${id}/home`}>Triviq</Link>
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link active" href={`/user/${id}/home`} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href={`/user/${id}/leaderboard`}>Leaderboard</Link>
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" href="/login">Logout</Link>
                    </li>
                </ul>
            </nav>

            {step === 0 && (
                <>
                    <h3 className="text-center mt-3 fw-bold fs-2">
                        Choose a category!
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                        {categories.map(category => (
                            <button
                                className="btn btn-dark"
                                key={category.id}
                                onClick={() => handleAnswer(category.id)}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{category.name}</h5>
                                        <p className="card-text">{category.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {step > 0 && step <= steps.length && (
                <>
                    <h3 className="text-center mt-5 fw-bold fs-2">
                        {steps[step - 1].question}
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
                        {steps[step - 1].options.map(option => (
                            <button
                                className="btn btn-dark"
                                key={option}
                                onClick={() => handleAnswer(option)}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{option}</h5>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {step === steps.length + 1 && (
                <>
                    <h3 className="text-center mt-5 fw-bold fs-2">
                        Choose a question type!
                    </h3>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
                        {types.map(type => (
                            <button
                                className="btn btn-dark"
                                key={type.id}
                                onClick={() => handleAnswer(type.id)}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{type.name}</h5>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}


        </>
    );
}