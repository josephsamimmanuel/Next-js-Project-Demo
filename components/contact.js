'use client'

import { useState } from "react";

export const metadata = {
    title: 'Contact Us',
    description: 'Contact Us Page'
}

export default function Contact() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Message sent successfully');
        } else {
            alert('Failed to send message');
        }
    }
    return (
        <div>
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <label for="name" className="w-1/4">Name:</label>
                        <input type="text" id="name" className="border rounded px-2 py-1 w-3/4" name="name" value={formData.name ?? ''} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center mb-4">
                        <label for="email" className="w-1/4">Email:</label>
                        <input type="email" id="email" className="border rounded px-2 py-1 w-3/4" name="email" value={formData.email ?? ''} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center mb-4">
                        <label for="message" className="w-1/4">Message:</label>
                        <textarea id="message" className="border rounded px-2 py-1 w-3/4" rows="4" name="message" value={formData.message ?? ''} onChange={handleChange} required></textarea>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}
