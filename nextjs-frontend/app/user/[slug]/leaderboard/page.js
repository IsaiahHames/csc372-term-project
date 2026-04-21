"use client";

import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import TriviaService from "@/services/TriviaService";
import { useRouter } from "next/navigation";

export default function Leaderboard({ params }) {
    const { slug } = use(params);
    const router = useRouter();

    const [category, setCategory] = useState("any");
    const [scores, setScores] = useState([]);

    const loadLeaderboard = async () => {

        const res = await TriviaService.getLeaderboard(category);

        if (res.data.success) {
            setScores(res.data.scores);
        }

    };


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" href={`/user/${slug}/home`} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" href={`/user/${slug}/leaderboard`}>Leaderboard</Link>
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
            <div className="container mt-4">

            <h2>Leaderboard</h2>

            <select
                className="form-select w-25"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="any">Any Category</option>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Entertainment: Books">Entertainment: Books</option>
                <option value="Entertainment: Film">Entertainment: Film</option>
                <option value="Entertainment: Music">Entertainment: Music</option>
                <option value="Entertainment: Musicals & Theatres">Entertainment: Musicals & Theatres</option>
                <option value="Entertainment: Television">Entertainment: Television</option>
                <option value="Entertainment: Video Games">Entertainment: Video Games</option>
                <option value="Entertainment: Board Games">Entertainment: Board Games</option>
                <option value="Science & Nature">Science & Nature</option>
                <option value="Science: Computers">Science: Computers</option>
                <option value="Science: Mathematics">Science: Mathematics</option>
                <option value="Mythology">Mythology</option>
                <option value="Sports">Sports</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Politics">Politics</option>
                <option value="Art">Art</option>
                <option value="Celebrities">Celebrities</option>
                <option value="Animals">Animals</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Entertainment: Comics">Entertainment: Comics</option>
                <option value="Science: Gadgets">Science: Gadgets</option>
                <option value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
                <option value="Entertainment: Cartoon & Animations">Entertainment: Cartoon & Animations</option>
            </select>

            <button
                className="btn btn-primary mt-2"
                onClick={loadLeaderboard}
            >
                Load Top 10
            </button>

            <table className="table mt-4">

                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <tbody>

                    {scores.map((s, i) => (

                        <tr key={i}>

                            <td>{i + 1}</td>
                            <td>{s.username}</td>
                            <td>{s.category}</td>
                            <td>{s.score}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
        </>
    );
}