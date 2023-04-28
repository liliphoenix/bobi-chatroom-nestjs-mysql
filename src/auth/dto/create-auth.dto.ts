import {  IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message:"用户名不能为空"})
    username:string
    @IsNotEmpty({message:"密码能为空"})
    password:string
}

