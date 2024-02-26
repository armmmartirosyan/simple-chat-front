class SharedUtils {
  public scrollToTheBottom() {
    const messagesListElement = document.getElementById("messages-list");
    messagesListElement.scrollTop = messagesListElement.scrollHeight;
  }
}

export const sharedUtils = new SharedUtils();
