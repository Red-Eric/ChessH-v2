import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

let trackerLength = 999

// Blue Green yellow orange Red
const colors = 
["#0000FF",
 "#00FF00",
 "#FFFF00",
 "#FF4D00",
 "#FF0000"
]

const App = ()=>{
  const [posFen, setFenPos] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  const [side, setSide] = useState("white")
  const [engineEvaluation, setengineEvaluation] = useState({
    evals : ["5","4","3","2","1"]
  })
  const [arrows, setArrows] = useState([["a1","h8","#0000ff"],["h1","h8","#ff0000"]])
  const [orient, setOrient] =  useState("white")
  // {evalScore: -0.01, evalType: 'mate', from: 'a2', to: 'a1'}
  useEffect(()=>{
     chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
      setSide(request.side)
      console.log(`${request.movelist.length} === ${trackerLength}`)
      if(trackerLength === request.movelist.length){ // 999 / 0
        console.log("no Updt")
      }
      else{
        trackerLength = request.movelist.length
        console.log(" update")
        let moveList = request.movelist
       setSide(request.side)
       if(moveList.length > 0){
        let game = new Chess()
         moveList.forEach(e => game.move(e))
         setFenPos(game.fen())
       }
      }
      })
     
    },[])

  useEffect(()=>{
    //{evalScore: -0.01, evalType: 'mate', from: 'a2', to: 'a1'}
    fetch("http://127.0.0.1:5000/best",{
      method: "POST",
      headers : {
          'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        fen : posFen
      })
    })
    .then((res)=> res.json())
    .then(data => setengineEvaluation(data))

  },[posFen])

  const [promote, setPromote] = useState(0);

  useEffect(()=>{
    
    //[[from to colors],[]]

    // Promotion  e7e8q
    if(engineEvaluation.bestmoves && engineEvaluation.evals){
      console.log(engineEvaluation.bestmoves)
      console.log(engineEvaluation.evals)
      let tupleArrow = []
      for(let i = 0; i < colors.length; i++){
        tupleArrow.push([
          engineEvaluation.bestmoves[i]?.slice(0,2),
          engineEvaluation.bestmoves[i]?.slice(2,4),
          colors[i]
        ])
      }
      setArrows(tupleArrow)
    }
  },[engineEvaluation])


  return (
    <div className="w-96 border-solid bg-slate-600">
      <h1 className="text-white bg-slate-950 text-center text-3xl pt-2 pb-2 font-bold">Chess Helper</h1>
      <div className="w-80 ml-auto mr-auto mt-3" onClick={()=> promote == 0 ? setPromote(1) : setPromote(0)}>
        <Chessboard id="board1" position={posFen} boardOrientation={side} 
        arePiecesDraggable = {false}
        customArrows={arrows}
        key={`promoteXXX${promote}`}
        />
        <p className="text-white text-3xl text-center font-mono pt-3 pb-3 bg-slate-900 rounded-2xl mt-4">{engineEvaluation.score}</p>
        
        <div className="flex gap-2 mt-3">
          <div className="bg-[#0000FF] rounded-md">
            <h2 className="text-center font-bold font-mono">{engineEvaluation.evals[0]}</h2>
          </div>
          <div className="bg-[#00FF00] rounded-md">
            <h2 className="text-center font-bold font-mono">{engineEvaluation.evals[1]}</h2>
          </div>
          <div className="bg-[#FFFF00] rounded-md">
            <h2 className="text-center font-bold font-mono">{engineEvaluation.evals[2]}</h2>
          </div>
          <div className="bg-[#FF4D00] rounded-md">
            <h2 className="text-center font-bold font-mono">{engineEvaluation.evals[3]}</h2>
          </div>
          <div className="bg-[#FF0000] rounded-md">
            <h2 className="text-center font-bold font-mono">{engineEvaluation.evals[4]}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
