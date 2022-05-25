import type { Rect } from '@src/interfaces';

export class SimpleObject implements Rect {
  x: number;

  y: number;

  width: number;

  height: number;

  oldX: number;

  oldY: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.oldX = x;
    this.oldY = y;
  }

  getBottom() {
    return this.y + this.height;
  }

  getLeft() {
    return this.x;
  }

  getRight() {
    return this.x + this.width;
  }

  getTop() {
    return this.y;
  }

  getOldBottom() {
    return this.oldY + this.height;
  }

  getOldLeft() {
    return this.oldX;
  }

  getOldRight() {
    return this.oldX + this.width;
  }

  getOldTop() {
    return this.oldY;
  }

  setBottom(y: number) {
    this.y = y - this.height;
  }

  setLeft(x: number) {
    this.x = x;
  }

  setRight(x: number) {
    this.x = x - this.width;
  }

  setTop(y: number) {
    this.y = y;
  }

  setOldBottom(y: number) {
    this.oldY = y - this.height;
  }

  setOldLeft(x: number) {
    this.oldX = x;
  }

  setOldRight(x: number) {
    this.oldX = x - this.width;
  }

  setOldTop(y: number) {
    this.oldY = y;
  }
}
