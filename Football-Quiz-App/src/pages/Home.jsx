import Quiz from "../components/Quiz";
function Home(){

    return(
        <>
        <div className="main-container">
            <h1 className="container-title">Quiz App</h1>
            <div className="quiz-container">
                <Quiz />
            </div>
        </div>
        </>
    )
}

export default Home