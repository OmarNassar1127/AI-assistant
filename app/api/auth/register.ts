import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function register(req, res) {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });
    
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
    
    res.status(201).json(user);
}
