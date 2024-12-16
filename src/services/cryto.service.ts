import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import RandExp = require("randexp");

@Injectable()
export class CrytoService {
    async doHash(pw: string) {
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash(pw, salt);
        return { hash, salt }
    }

    compare(pw: string, hash) {
        return bcrypt.compare(pw, hash)
    }

    compareSync(pw: string, hash) {
        return bcrypt.compareSync(pw, hash)
    }

    randomStr() {
        const randexUpper = new RandExp(/[A-Z]{2}/);
        const randexLower = new RandExp(/[a-z]{4}/);
        // eslint-disable-next-line no-useless-escape
        const randexSpec = new RandExp(/[~!@#$%^&*_\-+=`|(){}'<>,.?\/]{3}/);
        const randexpDigit = new RandExp(/[0-9]{2}/);

        const upperStr = randexUpper.gen();
        const lowerStr = randexLower.gen();
        const specStr = randexSpec.gen();
        const digitStr = randexpDigit.gen();
        
        const str = `${upperStr}${lowerStr}${specStr}${digitStr}`
        return str;
    }
}