import GameBoard from "./GameBoard";
import '../App.css'


function App (){
    return (
        <div className="app-container">
            {GameBoard()}
        </div>
    )
}
export default App