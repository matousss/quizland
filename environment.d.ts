declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FAUNA_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
    }
  }
}