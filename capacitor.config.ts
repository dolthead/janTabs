import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.mtec.thale.jantabs',
  appName: 'Awesomeness',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      sound: "assets/sounds/beep.wav",
    },
  }
};

export default config;
