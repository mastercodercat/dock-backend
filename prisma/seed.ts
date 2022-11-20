import db from "../src/db";

async function main() {
  console.log(`Start seeding ...`);

  const users = await db.user.createMany({
    data: [
      {
        name: "Ben",
        password: "12345678",
      },
      {
        name: "Flick",
        password: "12345678",
      },
      {
        name: "Tom",
        password: "12345678",
      },
    ],
  });

  await db.rating.createMany({
    data: [
      {
        rating: 4,
        userId: 1,
        peerId: 2,
      },
      {
        rating: 3,
        userId: 1,
        peerId: 3,
      },
      {
        rating: 4,
        userId: 2,
        peerId: 3,
      },
    ],
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
