import {
  PieceObjectType,
  PositionType,
} from "../components/chess_components/Board";

// path is clear function
const isPathClear = (
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  const rowDirection =
    targetPos.row > currentPos.row
      ? 1
      : targetPos.row < currentPos.row
      ? -1
      : 0;
  const colDirection =
    targetPos.col > currentPos.col
      ? 1
      : targetPos.col < currentPos.col
      ? -1
      : 0;

  let row = currentPos.row + rowDirection;
  let col = currentPos.col + colDirection;

  while (row !== targetPos.row || col !== targetPos.col) {
    if (board[row][col]) return false;
    row += rowDirection;
    col += colDirection;
  }

  return true;
};

// Pawn Rules
export const validatePawnMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  const direction = piece.player === "Player 1" ? -1 : 1; // Pawns move up for Player 1, down for Player 2
  const startRow = piece.player === "Player 1" ? 6 : 1;

  // Forward move: Must be empty
  if (
    targetPos.col === currentPos.col && // Same column
    targetPos.row === currentPos.row + direction && // One row forward
    !board[targetPos.row][targetPos.col] // Target tile must be empty
  ) {
    return true;
  }

  // Double forward move
  if (
    currentPos.row === startRow &&
    targetPos.col === currentPos.col &&
    targetPos.row === currentPos.row + 2 * direction &&
    !board[targetPos.row][targetPos.col] &&
    !board[currentPos.row + direction][currentPos.col]
  ) {
    return true;
  }

  // Diagonal capture
  if (
    Math.abs(targetPos.col - currentPos.col) === 1 &&
    targetPos.row === currentPos.row + direction &&
    board[targetPos.row][targetPos.col]?.player !== piece.player &&
    board[targetPos.row][targetPos.col]
  ) {
    return true;
  }

  return false;
};

// Rook Rules
export const validateRookMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  // Rooks can only move in a straight line
  if (currentPos.row !== targetPos.row && currentPos.col !== targetPos.col) {
    return false;
  }
  return isPathClear(currentPos, targetPos, board);
};

// Knight Rules
export const validateKnightMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  const rowDiff = Math.abs(currentPos.row - targetPos.row);
  const colDiff = Math.abs(currentPos.col - targetPos.col);

  // Knights move in an "L" shape (2 squares in one direction and 1 in the other)
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

// Bishop Rules
export const validateBishopMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  // Bishops must move diagonally
  const rowDiff = Math.abs(currentPos.row - targetPos.row);
  const colDiff = Math.abs(currentPos.col - targetPos.col);
  if (rowDiff !== colDiff) return false;
  return isPathClear(currentPos, targetPos, board);
};

// Queen Rules
export const validateQueenMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  return (
    validateRookMove(piece, currentPos, targetPos, board) ||
    validateBishopMove(piece, currentPos, targetPos, board)
  );
};

// King Rules
export const validateKingMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  const rowDiff = Math.abs(currentPos.row - targetPos.row);
  const colDiff = Math.abs(currentPos.col - targetPos.col);
  // Kings can move only one square in any direction
  return rowDiff <= 1 && colDiff <= 1;
};
