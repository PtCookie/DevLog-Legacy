export function generatePagination(current: number, pages: number): Pagination[] {
  return Array.from({ length: pages }, (_, index) => index + 1)
    .filter((page) => page === 1 || page === pages || Math.abs(current - page) <= 2)
    .map((page) => ({
      page: Math.abs(current - page) === 2 && page !== 1 && page !== pages ? 0 : page,
      current: page === current,
      excerpt: Math.abs(current - page) === 2 && page !== 1 && page !== pages,
    }));
}
