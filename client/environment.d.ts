declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_BACKEND_URL: string
            NODE_ENV: 'development' | 'production'
            PORT?: string
            PWD?: string
        }
    }
}

export {}