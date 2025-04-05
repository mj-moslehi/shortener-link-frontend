import {Link} from "react-router";
import {useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import UserSchema from './SignUpValidation.ts';
import {FieldValues, useForm} from "react-hook-form";
import api from "../../services/domain.ts";

export default function SignUp() {
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({resolver: joiResolver(UserSchema), mode: "onChange"});

    const onSubmit = async (data: FieldValues) => {
        setError("");
        try {
            await api.post("/user/create", data);
        } catch (err: unknown) {
            if (err instanceof Error && (err as any).response?.data?.message) {
                setError((err as any).response.data.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-7 bg-gray-100  ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full min-h-[600px] max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col justify-center"
            >
                <div className="text-2xl sm:text-3xl font-bold text-center mb-10">
                    Sign Up
                </div>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}



                <div className="mb-4">
                    <label
                        className="text-lg sm:text-xl font-medium block mb-2"
                        htmlFor="first_name"
                    >
                        First Name
                    </label>
                    <input
                        {...register("first_name")}
                        id="first_name"
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 text-lg sm:text-xl"
                        type="text"
                    />
                    {errors.first_name?.message && (
                        <p className="text-red-600 text-sm mt-1">{String(errors.first_name.message)}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="text-lg sm:text-xl font-medium block mb-2"
                        htmlFor="last_name"
                    >
                        Last Name
                    </label>
                    <input
                        {...register("last_name")}
                        id="last_name"
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 text-lg sm:text-xl"
                        type="text"
                    />
                    {errors.last_name?.message && (
                        <p className="text-red-600 text-sm mt-1">{String(errors.last_name.message)}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="text-lg sm:text-xl font-medium block mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 text-lg sm:text-xl"
                        type="email"
                    />
                    {errors.email?.message && (
                        <p className="text-red-600 text-sm mt-1">{String(errors.email.message)}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="text-lg sm:text-xl font-medium block mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        {...register("username")}
                        id="username"
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 text-lg sm:text-xl"
                        type="text"
                    />
                    {errors.username?.message && (
                        <p className="text-red-600 text-sm mt-1">{String(errors.username.message)}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label
                        className="text-lg sm:text-xl font-medium block mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        {...register("password")}
                        id="password"
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 text-lg sm:text-xl"
                        type="password"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{String(errors.password.message)}</p>
                    )}
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className=" w-full cursor-pointer bg-blue-600 hover:shadow-lg hover:bg-blue-700 text-white font-medium text-lg sm:text-xl py-3 rounded-lg transition disabled:opacity-50"
                    >
                        Sign Up
                    </button>
                </div>

                <p className="text-center text-lg mt-4">
                    Let's Logging In ;){" "}
                    <Link
                        className="text-blue-600 hover:underline"
                        to="/"
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
}