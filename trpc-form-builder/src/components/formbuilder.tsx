"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function FormBuilder() {
    const [newField, setNewField] = useState({ label: "", type: "text" });
    const utils = trpc.useContext();
    const { data: fields, isLoading } = trpc.getFields.useQuery();
    const addField = trpc.addField.useMutation({
        onSuccess: () => utils.getFields.invalidate(),
    });

    const handleAddField = () => {
        if (!newField.label.trim()) return;
        addField.mutate(newField);
        setNewField({ label: "", type: "text" });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Formulier Bouwer</h2>

            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 w-full"
                    type="text"
                    placeholder="Veldnaam"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                />
                <select
                    className="border p-2"
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                >
                    <option value="text">Tekst</option>
                    <option value="number">Nummer</option>
                    <option value="email">E-mail</option>
                </select>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddField}>
                    +
                </button>
            </div>

            {isLoading ? (
                <p>Laden...</p>
            ) : (
                <form className="space-y-4">
                    {fields?.map((field) => (
                        <div key={field.id}>
                            <label className="block text-sm font-medium">{field.label}</label>
                            <input className="border p-2 w-full" type={field.type} />
                        </div>
                    ))}
                </form>
            )}
        </div>
    );
}
