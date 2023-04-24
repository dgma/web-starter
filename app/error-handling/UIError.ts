export default class UIError extends Error {
  constructor(msg: string, public originalError?: unknown) {
    super(msg);
  }
}
