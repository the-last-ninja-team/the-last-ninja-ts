import React, { FC } from 'react';
import { Checkbox } from '@src/components/Checkbox';
import { useCustomState } from '@src/hooks';

type DebugValueType = {
  isDebug: boolean;
  isRects: boolean;
  isCollide: boolean;
  isHitBoxes: boolean;
  isCamera: boolean;
  isStop: boolean;
};

export const Debug: FC = () => {
  const [state, setState] = useCustomState<DebugValueType>();

  const handleChecked = (field: keyof DebugValueType) => (checked: boolean) => {
    setState({ [field]: checked });
  };

  return (
    <div className="app__debug">
      <Checkbox id="debug" checked={state?.isDebug} onChecked={handleChecked('isDebug')}>
        Debug
      </Checkbox>
      <Checkbox id="rects" checked={state?.isRects} onChecked={handleChecked('isRects')}>
        Rects
      </Checkbox>
      <Checkbox id="collide" checked={state?.isCollide} onChecked={handleChecked('isCollide')}>
        Collide
      </Checkbox>
      <Checkbox id="hitboxes" checked={state?.isHitBoxes} onChecked={handleChecked('isHitBoxes')}>
        HitBoxes
      </Checkbox>
      <Checkbox id="camera" checked={state?.isCamera} onChecked={handleChecked('isCamera')}>
        Camera
      </Checkbox>
      <label htmlFor="debug-info">
        <input id="debug-info" type="text" readOnly />
      </label>
      <Checkbox id="stop" checked={state?.isStop} onChecked={handleChecked('isStop')}>
        Stop
      </Checkbox>
    </div>
  );
};
