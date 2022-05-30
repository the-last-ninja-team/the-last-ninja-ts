import React, { FC, useEffect, useState } from 'react';
import { Checkbox } from '@src/components/Checkbox';
import { useCustomState } from '@src/hooks';
import { DEBUG_EVENT, STOP_EVENT } from '@src/constants';

import type { DebugValueType, DebugValuesKeys, DebugEvent, StopEvent, DebugProps } from './interfaces';

export const Debug: FC<DebugProps> = ({ debugInfo = '' }) => {
  const [stop, setStop] = useState(false);
  const [state, setState] = useCustomState<DebugValueType>();

  const handleChecked = (field: DebugValuesKeys) => (checked: boolean) => {
    setState({ [field]: checked });
    const debugEvent = new CustomEvent<DebugEvent>(DEBUG_EVENT, {
      detail: { type: field, checked },
    });
    window.dispatchEvent(debugEvent);
  };

  useEffect(() => {
    const stopEvent = new CustomEvent<StopEvent>(STOP_EVENT, {
      detail: { stop },
    });
    window.dispatchEvent(stopEvent);
  }, [stop]);

  return (
    <div className="app__debug">
      <div className="debug__main-block">
        <Checkbox id="collide" checked={state?.isCollide} onChecked={handleChecked('isCollide')}>
          Collide
        </Checkbox>
        <Checkbox id="hitboxes" checked={state?.isHitBoxes} onChecked={handleChecked('isHitBoxes')}>
          HitBoxes
        </Checkbox>
        <Checkbox id="camera" checked={state?.isCamera} onChecked={handleChecked('isCamera')}>
          Camera
        </Checkbox>
        <Checkbox id="stop" checked={stop} onChecked={setStop}>
          Stop
        </Checkbox>
      </div>

      <label htmlFor="debug-info" style={{ width: '100%', height: '10rem' }}>
        <textarea id="debug-info" className="debug__info" readOnly value={debugInfo} />
      </label>
    </div>
  );
};
