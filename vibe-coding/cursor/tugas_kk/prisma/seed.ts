import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Nasi Goreng Spesial',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar. Dihidangkan dengan kerupuk dan acar.',
        category: 'Makanan',
        price: 25000,
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Ayam Bakar Madu',
        description: 'Ayam bakar dengan bumbu madu yang manis dan gurih. Dihidangkan dengan lalapan segar.',
        category: 'Makanan',
        price: 35000,
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Sate Kambing',
        description: 'Sate kambing dengan bumbu kacang yang khas. Dihidangkan dengan ketupat dan sambal.',
        category: 'Makanan',
        price: 30000,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Es Teh Manis',
        description: 'Es teh manis segar dengan perasan jeruk nipis. Menyegarkan di siang hari.',
        category: 'Minuman',
        price: 8000,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan susu dan gula. Kaya akan nutrisi dan vitamin.',
        category: 'Minuman',
        price: 15000,
        imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Kopi Tubruk',
        description: 'Kopi tubruk tradisional yang diseduh dengan teknik manual. Aroma dan rasa yang autentik.',
        category: 'Minuman',
        price: 12000,
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Gado-gado',
        description: 'Sayuran segar dengan bumbu kacang yang lezat. Makanan sehat dan bergizi.',
        category: 'Makanan',
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=500&h=300&fit=crop',
      },
    }),
    prisma.product.create({
      data: {
        title: 'Es Jeruk',
        description: 'Es jeruk segar dengan potongan jeruk asli. Vitamin C yang menyegarkan.',
        category: 'Minuman',
        price: 10000,
        imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=300&fit=crop',
      },
    }),
  ])

  console.log('Seeded products:', products.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

