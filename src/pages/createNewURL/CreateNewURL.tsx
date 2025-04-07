import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FieldValues } from "react-hook-form";
import linkSchema from "./LinkValidator.ts";
import api from "../../services/domain.ts";
import { AxiosError } from "axios";

export default function CreateNewURL() {
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({ resolver: joiResolver(linkSchema), mode: "onChange" });

    const onSubmit = async (data: FieldValues) => {
        setError("");
        try {
            await api.post("/create", data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const backendMessage = err.response?.data?.message || err.response?.data || "Something went wrong";
                setError(backendMessage);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    const isPrivate = watch("private_status");

    return (
        <div className="flex items-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-8"
            >
                <div className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    Create Short Link
                </div>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="raw_link" className="block font-medium mb-1">Raw Link</label>
                        <input
                            {...register("raw_link")}
                            id="raw_link"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="url"
                        />
                        {errors.raw_link?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.raw_link.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="new_domain" className="block font-medium mb-1">Custom Domain</label>
                        <input
                            {...register("new_domain")}
                            id="new_domain"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        {errors.new_domain?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.new_domain.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="new_path" className="block font-medium mb-1">Custom Path</label>
                        <input
                            {...register("new_path")}
                            id="new_path"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        {errors.new_path?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.new_path.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            {...register("title")}
                            id="title"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        {errors.title?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.title.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="tag" className="block font-medium mb-1">Tag</label>
                        <input
                            {...register("tag")}
                            id="tag"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        {errors.tag?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.tag.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="start_expiration" className="block font-medium mb-1">Start Expiration</label>
                        <input
                            {...register("start_expiration")}
                            id="start_expiration"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="datetime-local"
                        />
                        {errors.start_expiration?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.start_expiration.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="end_expiration" className="block font-medium mb-1">End Expiration</label>
                        <input
                            {...register("end_expiration")}
                            id="end_expiration"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="datetime-local"
                        />
                        {errors.end_expiration?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.end_expiration.message)}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Private Link?</label>
                        <div className="flex items-center h-12">
                            <input
                                type="checkbox"
                                {...register("private_status")}
                                className="h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">Enable password protection</span>
                        </div>
                        {errors.private_status?.message && (
                            <p className="text-red-600 text-sm mt-1">{String(errors.private_status.message)}</p>
                        )}
                    </div>

                    {isPrivate && (
                        <div>
                            <label htmlFor="password" className="block font-medium mb-1">Password</label>
                            <input
                                {...register("password")}
                                id="password"
                                className="w-full border border-gray-300 rounded-lg px-3 h-12"
                                type="password"
                            />
                            {errors.password?.message && (
                                <p className="text-red-600 text-sm mt-1">{String(errors.password.message)}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Create Link
                    </button>
                </div>
            </form>
        </div>
    );
}
