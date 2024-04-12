import { ICharacter } from "./character.interface";

export interface IApiResponse {
    code: number;
    data: {
        limit: number;
        results: ICharacter[]
    },
    message?: string;
}