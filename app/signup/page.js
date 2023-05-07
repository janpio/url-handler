import prisma from "@/app/utils/prismaClient";
import { hash } from "bcrypt";

export default function Signup() {
    const createUser = async (email, password) => {
        "use server";
        const hashedPassword = await hash(password, 10);

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return { message: "Email already in use" };
            }

            const newUser = await prisma.user.create({
                data: { email, password: hashedPassword },
            });

            return {
                message: "User created successfully",
                user: newUser.id,
            };
        } catch (error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const handleSubmit = async (event) => {
        "use server";
        const emailInput = "";

        const passwordInput = "";

        const result = await createUser(emailInput, passwordInput);

        console.log(result); // Handle the result or update the UI accordingly
    };

    return (
        <form>
            <label>Email: </label>
            <input type="text" name="email" />
            <label>Password: </label>
            <input type="password" name="password" />
            <button formAction={handleSubmit} type="submit">
                Signup
            </button>
        </form>
    );
}
