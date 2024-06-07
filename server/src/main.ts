import { NestFactory } from "@nestjs/core";
import { log } from "console"
import { AppModule } from "./app.module";


const start = async () => {
    try{
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        app.enableCors()

        await app.listen(PORT, () => log('Server started on PORT' + PORT))
    } catch(e){
        log(e);
    }
}

start();