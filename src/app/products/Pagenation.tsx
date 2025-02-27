// 'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

export default function PaginationComponent({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  // 서버 컴포넌트? 클라이언트 컴포넌트?
  // 서버 컴포넌트? 클라이언트 컴포넌트?

  // 몇 페이진지 파라미터로 받아와서, 걔만 isActive를 PaginationLink에다가 달아주기
  // 동적으로 렌더링을 해야할듯. 현재 페이지를 가지고 (1,2,3 ...) 이거나 (..., 4, 5, 6, ...) 등등
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(total / 30);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // ... 구현하기

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/products?page=${page - 1}`} />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={`/products?page=${p}`} isActive={page === p}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext href={`/products?page=${page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
