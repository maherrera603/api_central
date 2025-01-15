import { Validators } from "../../config";
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

            const special = await SpecialityModel.findOne({ speciality });
            const doctors = await DoctorModel.find({ speciality: special });
            return doctors;

        }
                
        const doctors = await DoctorModel.find();
        return doctors;
    }


    public async getDoctor( id: string ) {

        if( !Validators.isMongoID( id ) ) throw CustomError.badRequest( "Parameter id is not valid" );

        try {
            const doctor = await DoctorModel.findById( id );
            if ( !doctor ) throw CustomError.notFount( "The doctor does not exist" );

            return { doctor }

        } catch (error) {
            throw CustomError.notFount( "The doctor does not exist" );
        }

    }


    public async updateDoctor( id: string, createDoctorDto: CreateDoctorDTO ){

        if( !Validators.isMongoID( id ) ) throw CustomError.badRequest( "Parameter id is not valid" );

    
        try {
            
            const existDoctor = await DoctorModel.findById( id );
            if( !existDoctor ) throw CustomError.badRequest( "The doctor does not exists" );

            const doctor = await DoctorModel.findByIdAndUpdate( {  _id: id }, createDoctorDto, { new: true } );
            return { doctor }

        } catch (error) {
            throw CustomError.badRequest( "The doctor does not exists" );
        }

    }

}