// Extends the global ProcessEnv interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      PORT?: number;
      PWD: string;
      NODE_APP_JWT_ACCESS_SECRET: string;
      NODE_APP_JWT_REFRESH_SECRET: string;
      NODE_APP_MONGODB_URI: string;
      NODE_APP_SESSION_SECRET: string;
      NODE_APP_FRONTEND_DOMAIN: string;
      NODE_APP_ALLOWED_HOSTS: string;
      NODE_APP_DEFAULT_CATEGORY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
