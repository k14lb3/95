import { fileSystemObjectFactory } from '@lib';
import type { FileSystemObject } from '@types';

const socials = fileSystemObjectFactory.createFolder({
  parentId: 'desktop',
  label: 'Socials',
  position: {
    x: 16,
    y: 72,
  },
});

export const FILE_SYSTEM_OBJECTS = [
  fileSystemObjectFactory.createRecycleBin({
    parentId: 'desktop',
    position: {
      x: 4,
      y: 8,
    },
  }),
  socials,
  fileSystemObjectFactory.createLink({
    parentId: socials.id,
    label: 'GitHub',
    iconSrc: '/images/icons/github.png',
    url: 'https://github.com/k14lb3',
    position: {
      x: 4,
      y: 0,
    },
  }),
  fileSystemObjectFactory.createLink({
    parentId: socials.id,
    label: 'LinkedIn',
    iconSrc: '/images/icons/linkedin.png',
    url: 'https://www.linkedin.com/in/karlivanalberto/',
    position: {
      x: 52,
      y: 0,
    },
  }),
  fileSystemObjectFactory.createLink({
    parentId: 'desktop',
    label: 'CV',
    iconSrc: '/images/icons/cv.png',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    position: {
      x: 22,
      y: 136,
    },
  }),
  fileSystemObjectFactory.createLink({
    parentId: 'desktop',
    label: 'Minecraft',
    iconSrc: '/images/icons/minecraft.png',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    position: {
      x: 10,
      y: 200,
    },
  }),
] as const satisfies FileSystemObject[];
