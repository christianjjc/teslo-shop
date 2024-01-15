import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrar REGISTROS PREVIOS
  await Promise.all([prisma.productImage.deleteMany(), prisma.product.deleteMany(), prisma.category.deleteMany()]);
  // 2. Categorías
  const { categories, products } = initialData;
  const categoriesData = categories.map((cat) => ({
    name: cat,
  }));
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();
  //console.log({ categoriesDB });

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<strind=shirt, string=categoryId>
  //console.log({ categoriesMap });

  // 3. Productos

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
    // Images
    const imagesData = images.map((img) => ({
      url: img,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
  console.log("seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
