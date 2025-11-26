import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@shared/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        super({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: { sub: string; email: string }) {
        const user = await this.userRepository.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.status !== 'active') {
            throw new UnauthorizedException('Account is not active');
        }

        return {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        };
    }
}
