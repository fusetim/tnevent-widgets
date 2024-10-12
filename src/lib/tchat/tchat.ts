export interface TchatMessage {
    id: string;
    author: string;
    content: string;
};

export interface TchatProps {
    messages: TchatMessage[];
    maxMessages?: number;
};