export type DebugValueType = {
  isCollide: boolean;
  isHitBoxes: boolean;
  isCamera: boolean;
};

export type DebugValuesKeys = keyof DebugValueType;

export type DebugEvent = { type: DebugValuesKeys; checked: boolean };

export type StopEvent = { stop: boolean };

export type DebugInfoEvent = { data: string };

export interface DebugProps {
  debugInfo?: string;
}
