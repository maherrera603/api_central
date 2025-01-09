import { env } from "process";
import { BcryptAdapter, envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { RegisterDTO, SingInDTO } from "../../domain/dtos";
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
            
            const { active, role, ...newUser } = UserEntity.fromObject( user );

            const payload = { user: newUser.id, active, account_action: envs.ACCOUNT_ACTION};
            
            // TODO: implement logic for send mail of activation account
            

            return { user: newUser };

        } catch (error) {
            // TODO: implement logic for logger file
            throw CustomError.intenalServer( `${error}` );
        }
    }

    public async singIn( singInDto: SingInDTO ){

        const existsUser = await UserModel.findOne({ email: singInDto.email });
        if( !existsUser ) throw CustomError.badRequest( "email or/and password incorrect" );

        const  { active, role, ...user }  = UserEntity.fromObject( existsUser );
        if( !active ) throw CustomError.unathorized( "active your account" );

        const payload = { user: user.id, role: role }

        const token = await JWTAdapter.generateToken({ payload, jwtSeed: envs.JWT_SEED, duration: envs.DURATION });
        if(!token) throw CustomError.intenalServer( "Error while creating JWT" );

        return { user, token }
    }

    public async validateAccount( token:string ) {
        const payload = await JWTAdapter.validateToken( token, envs.JWT_SEED );
        const { user, account_action } = payload as { user: string, account_action: string};
        
        const existsUser = await UserModel.findById( user );
        if( !existsUser ) throw CustomError.unathorized( "token is invalid" );
        if( envs.ACCOUNT_ACTION !== account_action  ) throw CustomError.unathorized( "token is invalid" );

        if( existsUser.active ) throw CustomError.unathorized( "Account activated" )
        

        const userEntity = UserEntity.fromObject( existsUser );
        userEntity.active = true;


        const userUpdate = await UserModel.findByIdAndUpdate( user, userEntity, { new: true});
        
        return { user: userUpdate}        
    }

}