import * as z from 'zod';

export const userSchema = z.object({
    username: z.string().min(1, {message:"username is required"}).max(100),
    email: z.string().min(1, {message:"Email is requird"}).email({message:"Invalid email"}).optional(),
    password: z
        .string()
        .min(1, {message:"Password is required"} )
        .min(8, {message:'Password must have less than 8 characters'})
        
})