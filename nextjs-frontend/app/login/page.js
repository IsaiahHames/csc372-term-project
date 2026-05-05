'use client';
import { useRouter } from "next/navigation";
import UsersService from "@/services/UsersService";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.Username.value;
        const password = e.target.Password.value;

        try {
            const res = await UsersService.loginUser({ username, password });
            const user = res.data.user;
            router.push(`/user/${user.id}/home`);
        } catch (err) {
            alert('Login failed!');
        }
    }




    return (
        <section>
            <h1 className="text-center mt-3">Triviq</h1>

            <div className="container py-2 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your username and password!</p>

                                    <form onSubmit={handleSubmit}>

                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input type="text" id="Username" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="Username">Username</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input type="password" id="Password" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="Password">Password</label>
                                        </div>

                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    </form>

                                </div>

                                <div>
                                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}