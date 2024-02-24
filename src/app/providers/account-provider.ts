import { SESSION_TOKEN_KEY, USERS_LIST } from "../constants/global-constants";
import { IUser } from "../models/shared-types";

class AccountProvider {
  public getUser = () => {
    let username = "";
    const token = this.getSessionToken();

    if (token) {
      username = token.split("-")[2];
    }

    return { username };
  };

  public signIn(username: string, password: string): boolean {
    const isValidCredentials = this.isValidCredentials(username, password);

    if (!isValidCredentials) {
      return false;
    }

    const token = this.generateUserToken(username, password);

    this.setSessionToken(token);

    return true;
  }

  public signOut() {
    this.removeSessionToken();
  }

  public getSessionToken(key = SESSION_TOKEN_KEY): string {
    return sessionStorage.getItem(key);
  }

  private isValidCredentials(username: string, password: string): boolean {
    return !!USERS_LIST.find(
      (user) => user.username === username && user.password === password
    );
  }

  private generateUserToken(login: string, password: string): string {
    return password.length + "-" + Math.random() * 1000 + "-" + login;
  }

  private setSessionToken(token: string, key = SESSION_TOKEN_KEY): void {
    sessionStorage.setItem(key, token);
  }

  private removeSessionToken(key = SESSION_TOKEN_KEY): void {
    sessionStorage.removeItem(key);
  }
}

export const account = new AccountProvider();
