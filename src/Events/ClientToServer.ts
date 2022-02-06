import IMessage from "../Interfaces/IMessage";

export default interface ClientToServer {
  handshake: () => void;
  joinRoom: (username: string, room: string) => void;
  sendMessage: (Message: IMessage) => void;
  disconnect: () => void;
}
