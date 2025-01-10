import nodemailer, { Transporter } from "nodemailer";


export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailpassword: string,
        
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailpassword
            }
        });
    }

    public sendEmail = async ( options: SendEmailOptions ): Promise<boolean> => {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            
            return true;
        } catch (error) {
            return false;
        }
 
    }
}