const z = require("zod");

const login = {
  body: z.object({
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .min(5, "Username minimum 5 characters")
      .max(20, "Username maximum 20 characters"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password minimum 6 characters"),
  }),
};

const signup = {
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email"),
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .regex(/^\S*$/, "Space not allow")
      .min(5, "Username minimum 5 characters")
      .max(20, "Username maximum 20 characters"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password minimum 6 characters"),
    role: z.enum(["user", "admin"]),
    gender: z.enum(["male", "female", "others"], {
      required_error: "Gender is required",
      invalid_type_error: "Invalid gender option",
    }),
    instituteName: z.string({
      required_error: "Institute name is required",
      invalid_type_error: "Institute name must be a string",
    }),
    course: z.string({
      required_error: "Course is required",
      invalid_type_error: "Course must be a string",
    }),
    rollNumber: z.string({
      required_error: "Roll number is required",
      invalid_type_error: "Roll number must be a string",
    }),
  })
};

module.exports = {
  login,
  signup,
};
