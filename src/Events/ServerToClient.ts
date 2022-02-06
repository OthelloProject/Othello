import IMessage from "../Interfaces/IMessage";

export default interface ServerToClient {
  emitMessage: (Message: IMessage) => void;
  anounceJoin: (Username: string) => void;
  listUsers: () => void;
}
