import { TypeOf, z } from 'zod';
export const signupinput  = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(4).max(20),
})
export const signininput  = z.object({
    email : z.string().email(),
    password : z.string().min(4).max(20),
})
export type signup =  z.infer<typeof signupinput>;
export type signin =  z.infer<typeof signininput>;
