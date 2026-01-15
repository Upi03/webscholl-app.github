import { NextResponse } from 'next/server';

const MOCK_DATA = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    type: i % 3 === 0 ? 'video' : 'image',
    src: i % 3 === 0 ? 'https://www.youtube.com/embed/lB8ASupNtlw' : '/next.svg',
    title: i % 3 === 0 ? `Video Responsive ${i + 1}` : `Gambar Optimasi ${i + 1}`,
    description: i % 3 === 0
        ? 'Video ini juga dioptimasi dan responsif untuk berbagai ukuran layar.'
        : 'Gambar ini otomatis di lazy load dan dioptimasi untuk performa terbaik.'
}));

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const items = MOCK_DATA.slice(startIndex, endIndex);
    const hasMore = endIndex < MOCK_DATA.length;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
        data: items,
        page,
        hasMore,
    });
}
