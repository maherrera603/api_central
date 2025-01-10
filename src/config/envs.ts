import "dotenv/config";
import { get } from "env-var";


export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    MONGO_URL: get("MONGO_URL").required().asString(),
    DB_NAME: get("DB_NAME").required().asString(),
    DURATION: get("DURATION").required().asString(),
    JWT_SEED: get("JWT_SEED").required().asString(),
    ACCOUNT_ACTION: get("ACCOUNT_ACTION").required().asString(),
    WEB_FRONTEND_URL: get("WEB_FRONTEND_URL").required().asString(),
    MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),    
    MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),    
    MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),        
}