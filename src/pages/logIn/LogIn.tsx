import {FieldValues, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import Schema from "./LogInValidation.ts";
import {useState} from "react";
import api from "../../services/domain.ts"
import {Link, useNavigate} from "react-router";

export default function LogIn() {

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({resolver: joiResolver(Schema), mode: "onChange"});

    const onSubmit = async (data: FieldValues) => {
        setError("");
        try {
            await api.post("/user/login", data);
            navigate("/home");
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
                    Log in :)
                </div>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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
                        Log In
                    </button>
                </div>

                <p className="text-center text-lg mt-4">
                    Don't have an account?{" "}
                    <Link
                        className="text-blue-600 hover:underline"
                        to="/sign-up"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}
