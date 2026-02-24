import {PrismaClient, Prisma}  from "@prisma/client";

export class BaseRepository<T extends keyof PrismaClient>{
    private prisma: PrismaClient;
    private model: T;

    constructor(prisma: PrismaClient, model: T){
        this.prisma = prisma;
        this.model = model;
    }

    async findAll(options?: unknown){
        return await (this.prisma[this.model] as any).findMany(options);
    }

    async findById(id: string, options?: any){
        return await (this.prisma[this.model] as any).findUnique({
            where: {id},
            ...options,
        })
    }; 

    async create(data: unknown){
        return await (this.prisma[this.model] as any).create({data});
    } 

    async update(id: string, data: unknown){
        return await (this.prisma[this.model] as any).update({
            where: {id},
            data,
        });
    }

    async delete(id: string){
        return await (this.prisma[this.model] as any).delete({
            where: {id},
        });
    }
}




