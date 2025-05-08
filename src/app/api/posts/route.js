

import Post from "../../../../models/postModel";
import { connect, disconnect } from "../../../../utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get('query');
    console.log('query', query);
    try {
        await connect();
        let posts = await Post.find();
        
        if (!posts || posts.length === 0) {
            return NextResponse.json({ error: "No posts found" }, { status: 404 });
        }
        if (query) {
            posts = await Post.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            });
        }

        await disconnect();
        return NextResponse.json({ message: "Posts fetched successfully", posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts", details: error.message }, { status: 500 });
    }
}



