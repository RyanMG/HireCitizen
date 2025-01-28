/**
 * Store a stack of URI paths for navigting back
 * Users can step into multiple links where we offer a back arrow to get to the previous page
 * In some instances they can navigate in two or three levels deep, and we still want to
 *
 */
export class BackPathStack {
  private previousPaths: string[] = [];

  push(path: string) {
    if (this.previousPaths[this.previousPaths.length - 1] !== path) {
      this.previousPaths.push(path);
    }
  }

  pop() {
    return this.previousPaths.pop();
  }

  get length() {
    return this.previousPaths.length;
  }

  get lastPath() {
    return this.previousPaths[this.previousPaths.length - 1];
  }
}

const backPathStack = new BackPathStack();

export default backPathStack;
