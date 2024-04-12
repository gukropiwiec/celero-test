import { IThumbnail } from "./thumbnail.interface";

export interface ICharacter {
    comics: any;
    description: string;
    events: any;
    id: number;
    modified: string;
    name: string;
    resourceURI: string;
    series: any
    stories: any;
    thumbnail: IThumbnail;
    urls: any[];
}