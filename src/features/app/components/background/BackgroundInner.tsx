import React from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadCircleShape } from 'tsparticles-shape-circle';
import { loadColorUpdater } from 'tsparticles-updater-color';
import { loadOpacityUpdater } from 'tsparticles-updater-opacity';
import { loadParticlesLinksInteraction } from 'tsparticles-interaction-particles-links';

export const BackgroundInner: React.FC = () => (
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
);

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadCircleShape(engine);
  await loadColorUpdater(engine);
  await loadOpacityUpdater(engine);
  await loadParticlesLinksInteraction(engine);
};
