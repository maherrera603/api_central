import { DoctorModel, SpecialityModel } from "../../data";
import { CustomError } from "../../domain";
import { CreateDoctorDTO } from "../../domain/dtos";


export class DoctorService {


    constructor(){}


    public async createDoctor( createDoctorDto: CreateDoctorDTO ){

        const existDoctor = await DoctorModel.findOne({ document: createDoctorDto.document });
        if ( existDoctor ) throw CustomError.badRequest( "the doctor exists" );

        try {
            const doctor = await DoctorModel.create( createDoctorDto );
            doctor.save();

            return { doctor }

        } catch (error) {
            throw CustomError.intenalServer( "Internal Server Error" );
        }
    }

    public async allDoctors( speciality: string ){
       
        if ( speciality !== "" ){

            let special = await SpecialityModel.findOne({ speciality });
            const doctors = await DoctorModel.find({ speciality: special });
            return doctors;

        }
        
        
        const doctors = await DoctorModel.find();
        return doctors;
    }


}