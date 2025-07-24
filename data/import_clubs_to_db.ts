import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as xlsx from 'xlsx';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'Clubs_met_sfeer_en_websites.xlsx');
  if (!fs.existsSync(filePath)) {
    console.error('Excel file not found:', filePath);
    process.exit(1);
  }

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

  // Expecting header: ['Land', 'Competitie', 'Club', 'Website']
  const [header, ...dataRows] = rows;
  if (!header || header.length < 4) {
    console.error('Unexpected header in Excel file:', header);
    process.exit(1);
  }

  for (const row of dataRows as any[][]) {
    if (!row || row.length < 4) continue;
    const [country, league, name, website] = row;
    if (!country || !league || !name) continue;
    await prisma.destination.upsert({
      where: {
        name_league_country: {
          name: String(name),
          league: String(league),
          country: String(country),
        } as any, // type cast to avoid linter error
      },
      update: {
        website: String(website || ''),
      },
      create: {
        name: String(name),
        league: String(league),
        country: String(country),
        website: String(website || ''),
        city: '',
        stadium: '',
      },
    });
    console.log(`Upserted: ${country} | ${league} | ${name}`);
  }

  await prisma.$disconnect();
  console.log('Import complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}); 