import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return await this.prisma.users.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string) {
        return await this.prisma.users.findUnique({
            where: { email },
        });
    }

    async findByUsername(username: string) {
        return await this.prisma.users.findUnique({
            where: { username },
        });
    }

    async findByEmailOrUsername(identifier: string) {
        return await this.prisma.users.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
    }

    async create(data: any) {
        return await this.prisma.users.create({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data,
        });
    }

    async update(id: string, data: any) {
        return await this.prisma.users.update({
            where: { id },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data,
        });
    }

    async delete(id: string) {
        return await this.prisma.users.delete({
            where: { id },
        });
    }

    async updateLastLogin(id: string) {
        return await this.prisma.users.update({
            where: { id },
            data: {
                last_login_at: new Date(),
            },
        });
    }
}
