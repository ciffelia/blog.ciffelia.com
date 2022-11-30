import React from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

const Background: React.FC = () => (
  <div className="fixed inset-0 bg-blue-900" style={{ zIndex: -1 }}>
    <Particles
      init={particlesInit}
      options={{
        particles: {
          color: {
            value: '#fff',
          },
          links: {
            color: '#fff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 2,
          },
        },
        detectRetina: true,
      }}
    />
  </div>
);

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

export default Background;
