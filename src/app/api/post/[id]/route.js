import Post from "../../../../../models/postModel";
import { connect, disconnect } from "../../../../../utils/database";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connect();
        const post = await Post.findById(params.id);
        console.log('post', post);
        
        if (!post) {
            return NextResponse.json({ error: "No post found" }, { status: 404 });
        }

        await disconnect();
        return NextResponse.json({ message: "Post fetched successfully", post }, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post", details: error.message }, { status: 500 });
    }
}



