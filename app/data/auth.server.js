import { hash } from "bcryptjs";
import { prisma } from "./database.server";

export async function signup({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
        const error = new Error('Email is alredy used.');
        error.status = 422;
        throw error;
    }


    try {
        const passwordHash = await hash(password, 12);
        await prisma.user.create({
            data: {
                email: email,
                password: passwordHash,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create new user");
    }
}