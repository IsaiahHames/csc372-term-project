export default function Home({ params }) {
    return (
        <main>
            <h1>{params.slug}</h1>
        </main>
    )
}