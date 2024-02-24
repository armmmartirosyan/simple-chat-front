import { IMessage } from "../models/shared-types";
import { v4 as uuid } from "uuid";

class MessageUtils {
  public creatMessage(message: string, from: any, to: any): IMessage {
    return {
      date: new Date(),
      id: uuid(),
      message,
      from,
      to,
    };
  }
}

export const messageUtils = new MessageUtils();
