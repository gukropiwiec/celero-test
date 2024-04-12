export interface IPlacar {
    player1: IPlacarPlayer,
    player2: IPlacarPlayer
}

interface IPlacarPlayer {
    score: string;
    name: string;
    thumbnail: string;
}