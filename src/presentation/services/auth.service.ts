import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { RegisterDTO } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";


export class AuthService {

    constructor(){}


    public async register( registerDto: RegisterDTO ) {

        const existsUser = await UserModel.findOne({ email: registerDto.email });
        if( existsUser ) throw CustomError.badRequest( "User already exist" );

        try {
            const user = await UserModel.create(registerDto);
            user.password = BcryptAdapter.hash( registerDto.password );
            await user.save();
            
            const newUser = UserEntity.fromObject( user );

            // TODO: implement logic for send mail of activation account

            return { user: newUser };

        } catch (error) {
            // TODO: implement logic for logger file
            throw CustomError.intenalServer( `${error}` );
        }
    }

}