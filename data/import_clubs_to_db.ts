// Convert all imports to require syntax for CommonJS compatibility
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parse/sync');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'Clubs_met_Steden_en_Luchthavens.csv');
  if (!fs.existsSync(filePath)) {
    console.error('CSV file not found:', filePath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Expecting columns: Land, Competitie, Club, Website, Stad, Luchthaven
  for (const row of records) {
    const country = row['Land'];
    const league = row['Competitie'];
    const name = row['Club'];
    const website = row['Website'];
    const city = row['Stad'];
    const airport = row['Luchthaven'];
    if (!country || !league || !name) continue;
    await prisma.destination.upsert({
      where: {
        name_league_country: {
          name: String(name),
          league: String(league),
          country: String(country),
        },
      },
      update: {
        website: String(website || ''),
        city: String(city || ''),
        airport: String(airport || ''),
      },
      create: {
        name: String(name),
        league: String(league),
        country: String(country),
        website: String(website || ''),
        city: String(city || ''),
        airport: String(airport || ''),
        stadium: '',
      },
    });
    console.log(`Upserted: ${country} | ${league} | ${name} | ${city} | ${airport}`);
  }

  await prisma.$disconnect();
  console.log('Import complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}); 