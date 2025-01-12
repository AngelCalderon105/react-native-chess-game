import {
  PieceObjectType,
  PositionType,
} from "../components/chess_components/Board";

import {
  validatePawnMove,
  validateRookMove,
  validateKnightMove,
  validateBishopMove,
  validateQueenMove,
  validateKingMove,
} from "./pieceValidators";

const moveValidators: Record<
  PieceObjectType["pieceType"],
  (
    piece: PieceObjectType,
    currentPos: PositionType,
    targetPos: PositionType,
    board: (PieceObjectType | null)[][]
  ) => boolean
> = {
  Pawn: validatePawnMove,
  Rook: validateRookMove,
  Knight: validateKnightMove,
  Bishop: validateBishopMove,
  Queen: validateQueenMove,
  King: validateKingMove,
};

export const isValidMove = (
  piece: PieceObjectType,
  currentPos: PositionType,
  targetPos: PositionType,
  board: (PieceObjectType | null)[][]
): boolean => {
  const targetPiece = board[targetPos.row][targetPos.col];

  // Invalid to capture own pieces
  if (targetPiece?.player === piece.player) {
    return false;
  }

  const validator = moveValidators[piece.pieceType];
  if (!validator) {
    console.warn(`No validator found for piece type: ${piece.pieceType}`);
    return false;
  }

  return validator(piece, currentPos, targetPos, board);
};
