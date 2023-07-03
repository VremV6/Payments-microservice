import { IsEnum } from 'class-validator';

export class PlansDTO {
    @IsEnum(['Basic', 'Pro', 'AI'])
    readonly name: string;
}
