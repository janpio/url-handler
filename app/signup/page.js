import prisma from "@/app/utils/prismaClient";
import { hash } from "bcrypt";

export function Signup() {
    const createUser = async (email, password) => {
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
        event.preventDefault();

        const emailInput = event.target.elements.email.value;
        const passwordInput = event.target.elements.password.value;

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
