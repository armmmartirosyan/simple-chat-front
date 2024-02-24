export interface IListener {
  id: string;
  cb: Function;
}

export type ListenerInfo = {
  [key: string]: IListener[];
};
