
export default function Home() {
  return (
    <section>
      <div className="container py-2 h-100 mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-3">
                                <h1 className="text-center mt-3">Triviq</h1>
                                  <a href="/login" className="btn btn-outline-light btn-lg px-5 mt-5">Login</a>
                                  <a href="/signup" className="btn btn-outline-light btn-lg px-5 ms-3 mt-5">Sign Up</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}