import { hash, compare } from "bcryptjs";
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
    },
});

async function createUserSession(userId, redirectPath) {
    const session = await sessionStorage.getSession();
    session.set('userId', userId);
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    });
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    const userId = session.get('userId');
    return userId || null;
}

export async function detroyUserSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session) // destroy in BE and clear in FE
        }
    })
}

export async function requireUserSession(request) {
    const userId = await getUserFromSession(request);
    if (!userId) {
        throw redirect('/auth?mode=login');
    }
}

export async function signup({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
        const error = new Error('Email is alredy used.');
        error.status = 422;
        throw error;
    }

    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
        }
    });

    return createUserSession(user.id, '/expenses')
}

export async function login({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (!existingUser) {
        const error = new Error('Invalid credetials.');
        error.status = 401;
        throw error;
    }

    const passwordCorrect = await compare(password, existingUser.password);

    if (!passwordCorrect) {
        const error = new Error('Invalid credetials.');
        error.status = 401;
        throw error;
    }

    return createUserSession(existingUser.id, '/expenses')
}