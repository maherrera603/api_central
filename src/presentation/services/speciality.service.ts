import { SpecialityModel } from "../../data";
import { CustomError } from "../../domain";
import { SpecialityCreateDTO } from "../../domain/dtos";

export class SpecialityService {

    constructor() {}


    public async create ( specialityDto: SpecialityCreateDTO ) {

        const existsSpeciality = await SpecialityModel.findOne({ speciality: specialityDto.speciality });
        if( existsSpeciality ) throw CustomError.badRequest( "Specility has exist" );

        try {

            const speciality = await SpecialityModel.create( specialityDto );
            speciality.save();

            return { speciality }    
        } catch (error) {
            throw CustomError.intenalServer( `${error}`);
        }
    }

    public async allSpecialities ( active: boolean | undefined ) {

        const specialities = ( active === undefined ) 
            ? await SpecialityModel.find()
            : await SpecialityModel.find({ active })

        return specialities;
    }

    public async getSpeciality( id: string ) {

        try {
            const speciality = await SpecialityModel.findById(id);
            return speciality;
        } catch (error) {
            throw CustomError.notFount( "Speciality not exists" );
        }
    }

}