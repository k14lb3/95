import { castDraft } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type SplashAudio = {
  state: {
    audio: HTMLAudioElement | null;
  };
  action: {
    set: (args: { audio: HTMLAudioElement }) => void;
    play: () => void;
  };
};

const store = create<SplashAudio>()(
  immer((set, get) => {
    return {
      state: {
        audio: null,
      },
      action: {
        set: async ({ audio }) => {
          await audio.play();
          audio.pause();
          audio.currentTime = 0;

          set((store) => {
            store.state.audio = castDraft(audio);
          });
        },
        play: () => {
          const audio = get().state.audio;

          if (!audio) {
            console.error('useSplashAudioAction: audio is not defined.');
            return;
          }

          audio.play();
        },
      },
    };
  }),
);

export const useSplashAudioState = (): SplashAudio['state'] => {
  return store((store) => {
    return store.state;
  });
};

export const useSplashAudioAction = (): SplashAudio['action'] => {
  return store((store) => {
    return store.action;
  });
};
