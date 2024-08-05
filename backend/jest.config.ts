import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  automock: false,
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
