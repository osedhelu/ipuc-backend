import { ApiProperty } from '@nestjs/swagger';

export class Login {
    @ApiProperty({ default: 'Isabella' })
    username: string
    @ApiProperty({ default: '' })
    password: string
}
export class userCunsult {
    @ApiProperty({
        default: 'nuevo'
    })
    username: string;
}

export class iToken {
    @ApiProperty({
        default: ''
    })
    token: string
}