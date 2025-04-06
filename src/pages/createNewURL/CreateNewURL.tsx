import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, FieldValues } from "react-hook-form";
import linkSchema from "./LinkValidator.tsx";
import api from "../../services/domain.ts";

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
            await api.post("/link/create", data);
        } catch (err: unknown) {
            if (err instanceof Error && (err as any).response?.data?.message) {
                setError((err as any).response.data.message);
            }
        }
    };

    const isPrivate = watch("private_status");

    return (
        <div className="flex items-center justify-center min-h-screen p-7 bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-8"
            >
                <div className="text-2xl sm:text-3xl font-bold text-center mb-8">
                    Create Short Link
                </div>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Raw Link */}
                    <div>
                        <label htmlFor="raw_link" className="block font-medium mb-1">Raw Link</label>
                        <input
                            {...register("raw_link")}
                            id="raw_link"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="url"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600 ">
                            {errors.raw_link?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* New Domain */}
                    <div>
                        <label htmlFor="new_domain" className="block font-medium mb-1">Custom Domain</label>
                        <input
                            {...register("new_domain")}
                            id="new_domain"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.new_domain?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* New Path */}
                    <div>
                        <label htmlFor="new_path" className="block font-medium mb-1">Custom Path</label>
                        <input
                            {...register("new_path")}
                            id="new_path"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.new_path?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            {...register("title")}
                            id="title"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.title?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* Tag */}
                    <div>
                        <label htmlFor="tag" className="block font-medium mb-1">Tag</label>
                        <input
                            {...register("tag")}
                            id="tag"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="text"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.tag?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* Start Expiration */}
                    <div>
                        <label htmlFor="start_expiration" className="block font-medium mb-1">Start Expiration</label>
                        <input
                            {...register("start_expiration")}
                            id="start_expiration"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="datetime-local"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.start_expiration?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* End Expiration */}
                    <div>
                        <label htmlFor="end_expiration" className="block font-medium mb-1">End Expiration</label>
                        <input
                            {...register("end_expiration")}
                            id="end_expiration"
                            className="w-full border border-gray-300 rounded-lg px-3 h-12"
                            type="datetime-local"
                        />
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.end_expiration?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* Private Status */}
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
                        <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                            {errors.private_status?.message ?? '\u00A0'}
                        </div>
                    </div>

                    {/* Password */}
                    {isPrivate && (
                        <div>
                            <label htmlFor="password" className="block font-medium mb-1">Password</label>
                            <input
                                {...register("password")}
                                id="password"
                                className="w-full border border-gray-300 rounded-lg px-3 h-12"
                                type="password"
                            />
                            <div className="min-h-[1.25rem] mt-1 text-sm text-red-600">
                                {errors.password?.message ?? '\u00A0'}
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit */}
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
