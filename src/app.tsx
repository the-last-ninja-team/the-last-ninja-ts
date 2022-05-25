import React, { FC, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Debug } from '@src/components/Debug';
import { AppController } from '@src/modules/app';

import './styles.css';

interface AppProps {
  appController: AppController;
}

const App: FC<AppProps> = ({ appController }) => {
  useEffect(() => {
    window.addEventListener('load', appController.load);
    window.addEventListener('resize', appController.resize);
    window.addEventListener('keydown', appController.input);
    window.addEventListener('keyup', appController.input);

    return () => {
      window.removeEventListener('load', appController.load);
      window.removeEventListener('resize', appController.resize);
      window.removeEventListener('keydown', appController.input);
      window.removeEventListener('keyup', appController.input);
    };
  }, [appController]);

  return <Debug />;
};

const container = document.getElementById('root');
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

if (container && canvas) {
  const root = createRoot(container);
  root.render(<App appController={new AppController(canvas)} />);
} else {
  throw new Error("Can't get root or canvas container");
}
