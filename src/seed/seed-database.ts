import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  // 1. Borrar REGISTROS PREVIOS
  //await Promise.all([prisma.productImage.deleteMany(), prisma.product.deleteMany(), prisma.category.deleteMany()]);
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Usuarios
  //const { users } = initialData;
  /*   const usersData = users.map((user) => ({
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
  })); */
  //await prisma.user.createMany({ data: usersData });

  // 2. creando usuarios
  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

  await prisma.country.createMany({ data: countries });

  // 3. creando categorías
  const categoriesData = categories.map((cat) => ({
    name: cat,
  }));
  await prisma.category.createMany({ data: categoriesData });

  // 4. ubicando categorías para colocar en cada producto
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryId>

  // 5. Creando productos
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
