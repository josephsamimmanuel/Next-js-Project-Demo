import Contact from '../../../../models/contactModel'
import { NextResponse } from 'next/server'
import { connect, disconnect } from "../../../../utils/database";

export async function POST(req) {
    try {
        await connect();
        const { name, email, message } = await req.json();
        const contact = await Contact.create({ name, email, message });
        if (!contact) {
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }
        await disconnect();
        return NextResponse.json({ contact }, { status: 201 }, {message: 'Message sent successfully'});
    } catch (error) {
        await disconnect();
        console.error('Contact form error:', error._message);
        return NextResponse.json({ error: error._message }, { status: 500 }, {message: 'Failed to send message'});
    }
}


