import zod from "zod";

export const signUpSchema = zod.object({
  name: zod.string().nonempty(),
  surname: zod.string().optional(),
  email: zod.email(),
});

export const isPassowrdValid = (password: string) => {
  return zod
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .safeParse(password).success;
};
