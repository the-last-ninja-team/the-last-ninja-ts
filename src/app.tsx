import React, { FC, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Debug, DebugEvent, DebugInfoEvent, StopEvent } from '@src/components/Debug';
import { AppController } from '@src/modules/app';
import { DEBUG_EVENT, STOP_EVENT, DEBUG_INFO_EVENT } from '@src/constants';

import './styles.css';

interface AppProps {
  appController: AppController;
}

const App: FC<AppProps> = ({ appController }) => {
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const debugHandler = (event: CustomEventInit<DebugEvent>) => {
      if (event.detail) {
        appController.debug(event.detail);
      }
    };

    const stopHandler = (event: CustomEventInit<StopEvent>) => {
      if (event.detail) {
        if (event.detail.stop) {
          appController.stop();
        } else {
          appController.start();
        }
      }
    };

    const debugInfoHandler = (event: CustomEventInit<DebugInfoEvent>) => {
      if (event.detail) {
        setDebugInfo(event.detail.data);
      }
    };

    window.addEventListener('load', appController.load);
    window.addEventListener('resize', appController.resize);
    window.addEventListener('keydown', appController.input);
    window.addEventListener('keyup', appController.input);
    window.addEventListener(DEBUG_EVENT, debugHandler);
    window.addEventListener(STOP_EVENT, stopHandler);
    window.addEventListener(DEBUG_INFO_EVENT, debugInfoHandler);

    return () => {
      window.removeEventListener('load', appController.load);
      window.removeEventListener('resize', appController.resize);
      window.removeEventListener('keydown', appController.input);
      window.removeEventListener('keyup', appController.input);
      window.removeEventListener(DEBUG_EVENT, debugHandler);
      window.removeEventListener(STOP_EVENT, stopHandler);
      window.removeEventListener(DEBUG_INFO_EVENT, debugInfoHandler);
    };
  }, [appController]);

  return <Debug debugInfo={debugInfo} />;
};

const container = document.getElementById('root');
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

if (!container || !canvas) {
  throw new Error("Can't get root or canvas container");
}

const root = createRoot(container);
root.render(<App appController={new AppController(canvas)} />);
