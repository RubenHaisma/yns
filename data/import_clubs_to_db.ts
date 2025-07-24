// Convert all imports to require syntax for CommonJS compatibility
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parse/sync');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'Clubs_met_Alle_Steden.csv');
  if (!fs.existsSync(filePath)) {
    console.error('CSV file not found:', filePath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Expecting columns: Land, Competitie, Club, Website, Stad
  for (const row of records) {
    const country = row['Land'];
    const league = row['Competitie'];
    const name = row['Club'];
    const website = row['Website'];
    const city = row['Stad'];
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
      },
      create: {
        name: String(name),
        league: String(league),
        country: String(country),
        website: String(website || ''),
        city: String(city || ''),
        stadium: '',
      },
    });
    console.log(`Upserted: ${country} | ${league} | ${name} | ${city}`);
  }

  await prisma.$disconnect();
  console.log('Import complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}); 