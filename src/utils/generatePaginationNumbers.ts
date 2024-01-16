export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // si el numero totald e paginas es 7 o menos, mostramos todas las páginas sin los 3 puntos (...)
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // si la pagina actuale stá entre las primeras 3 páginas, mostramos las primeras 3 y "..." y las últimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; //[1,2,3,...,49,50]
  }

  // si la pagina actual este entre las últimas 3 páginas, mostrar las primeras 2, puntos suspensivos "..." y las últimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]; //[1,2,3,...,49,50]
  }

  // si la página actual está en otro lugar, mostramos la primera página y "..." y pagina actrual y vecinos
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
