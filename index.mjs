import { Chess } from "chess.js";

function convertMovesToFriendlyNames(fen, moves) {
  // console.log(fen, moves)
  const board = new Chess(fen);
  // board.load(fen);
  console.log("board.turn()", board.turn());
  const moveList = moves.split(" ");
  const sanMoves = moveList.map((move) => {
    const parsedMove = board.move(move);
    // console.log(move, parsedMove)
    return parsedMove ? parsedMove.san : null;
  });

  const validSanMoves = sanMoves.filter((move) => move !== null);
  const result = validSanMoves.join(" ");
  // console.log(board.history())
  // return board.history().join(' ')
  return result;
}

const fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const moves = "e4 e5 f1c4 f8c5 Nf3 Nf6 e1g1 e8g8";

const friendlyNames = convertMovesToFriendlyNames(
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  moves
);
console.log(friendlyNames);
