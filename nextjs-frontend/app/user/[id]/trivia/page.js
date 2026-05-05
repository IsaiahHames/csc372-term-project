"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import TriviaService from "@/services/TriviaService";
import { useRouter } from "next/navigation";
import he from "he";

export default function Trivia({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const searchParams = useSearchParams();
    const triviaId = searchParams.get("key");
    const [questions, setQuestions] = useState([]);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function load() {
            const res = await TriviaService.getSavedQuestions(triviaId);

            if (res.data.success) {
                setQuestions(res.data.questions);
            } else {
                alert(res.data.message);
            }

            setLoading(false);
        }

        load();
    }, [triviaId]);

    if (loading) return <h2>Loading...</h2>;
    if (!questions.length) return <h2>No questions found</h2>;

    const current = questions[step];

    const handleAnswer = async (answer) => {
        let newScore = score;

        if (answer === current.correct_answer) {
            newScore++;
            setScore(newScore);
        }

        if (step + 1 < questions.length) {
            setStep(step + 1);
        } else {
            await TriviaService.saveScore({
                user_id: id,
                trivia_id: triviaId,
                category: he.decode(questions[0].category),
                score,
                total: questions.length
            });
            alert(`Quiz finished! Score: ${score}/${questions.length}`);
            router.push(`/user/${id}/home`);
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <Link className="navbar-brand fw-bold fs-2" href={`/user/${id}/home`}>Triviq</Link>
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link " href={`/user/${id}/home`}>Home</Link>
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

            <div className="text-center mt-5">

                <p className="fs-5">
                    Question {step + 1} / {questions.length}
                </p>
                <h2>{he.decode(current.question)}</h2>

                <div className="mt-4">
                    {[
                        ...current.incorrect_answers,
                        current.correct_answer
                    ]
                        .sort()
                        .map((opt, i) => (
                            <button
                                key={i}
                                className="btn btn-dark m-2"
                                onClick={() => handleAnswer(opt)}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{opt}</h5>
                                    </div>
                                </div>
                            </button>
                        ))}
                </div>
            </div>
        </>
    );
}