import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    try {
        const hash = await bcrypt.hash(password, 12);
        return hash;
    } catch (error) {
        console.log(error);
    }
};

const comparePassword = async (pass1: string, pass2: string) => {
    try {
        const compare = await bcrypt.compare(pass1, pass2);
        return compare;
    } catch (error) {
        console.log(error);
    }
};

export { hashPassword, comparePassword };
