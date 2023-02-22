import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.nextUrl)
    if (request.nextUrl.pathname.startsWith('/signout')) {
        return NextResponse.redirect('/auth/signout')
    }
}

export const config = {
    matcher: '/:path*',
}