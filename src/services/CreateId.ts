import { v4 } from "uuid"

const id = v4();
export class CreateId{
    public create(){
        return v4();
    }
}
