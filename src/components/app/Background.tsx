import React from 'react';
import dynamic from 'next/dynamic';

const Particles = dynamic(async () => await import('react-tsparticles'));

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-blue-900" style={{ zIndex: -1 }}>
      <Particles
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
};

export default Background;
