
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  role: z.enum(['admin', 'employee'], {
    required_error: "You need to select a role.",
  }),
});

export const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const shipmentBookingSchema = z.object({
    // Sender
    sender_name: z.string().min(3, "Sender name is required"),
    sender_address_street: z.string().min(5, "Sender address is required"),
    sender_address_city: z.string().min(2, "Sender city is required"),
    sender_address_state: z.string().min(2, "Sender state is required"),
    sender_address_pincode: z.string().min(5, "Sender pincode is required"),
    sender_address_country: z.string().min(2, "Sender country is required"),
    sender_phone: z.string().min(10, "A valid phone number is required"),
    save_sender_address: z.boolean().optional(),
    sender_address_nickname: z.string().optional(),
    // Receiver
    receiver_name: z.string().min(3, "Receiver name is required"),
    receiver_address_street: z.string().min(5, "Receiver address is required"),
    receiver_address_city: z.string().min(2, "Receiver city is required"),
    receiver_address_state: z.string().min(2, "Receiver state is required"),
    receiver_address_pincode: z.string().min(5, "Receiver pincode is required"),
    receiver_address_country: z.string().min(2, "Receiver country is required"),
    receiver_phone: z.string().min(10, "A valid phone number is required"),
    save_receiver_address: z.boolean().optional(),
    receiver_address_nickname: z.string().optional(),
    // Package
    package_weight_kg: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
    package_width_cm: z.coerce.number().min(1, "Width must be at least 1 cm"),
    package_height_cm: z.coerce.number().min(1, "Height must be at least 1 cm"),
    package_length_cm: z.coerce.number().min(1, "Length must be at least 1 cm"),
    pickup_date: z.date({ required_error: "Pickup date is required" }),
    service_type: z.string().min(1, "Service type is required"),
}).refine(data => !data.save_sender_address || (data.save_sender_address && data.sender_address_nickname), {
    message: "Nickname is required to save sender address",
    path: ["sender_address_nickname"],
}).refine(data => !data.save_receiver_address || (data.save_receiver_address && data.receiver_address_nickname), {
    message: "Nickname is required to save receiver address",
    path: ["receiver_address_nickname"],
});
