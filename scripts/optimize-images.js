#!/usr/bin/env node
import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "app/images");
const OUTPUT_DIR = path.join(process.cwd(), "app/images/optimized");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imageConfigs = [
  {
    input: "home-hero-background.webp",
    output: "home-hero-background.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "building.webp",
    output: "building.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "product_hero_bg.webp",
    output: "product_hero_bg.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "solution_hero.webp",
    output: "solution_hero.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "founders_about.webp",
    output: "founders_about.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "employee_working.webp",
    output: "employee_working.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "bussiness.webp",
    output: "bussiness.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "EYD_referance.webp",
    output: "EYD_referance.webp",
    width: 1200,
    quality: 80,
  },
  {
    input: "eyd.webp",
    output: "eyd.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "lecom.webp",
    output: "lecom.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "boowa.webp",
    output: "boowa.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "aura.webp",
    output: "aura.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "founder_OS.webp",
    output: "founder_OS.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "build_products.webp",
    output: "build_products.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "Solving.webp",
    output: "Solving.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "connect.webp",
    output: "connect.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "working_pic.webp",
    output: "working_pic.webp",
    width: 800,
    quality: 80,
  },
  {
    input: "bg-what-we-do.webp",
    output: "bg-what-we-do.webp",
    width: 1920,
    quality: 70,
  },
  {
    input: "founder.webp",
    output: "founder.webp",
    width: 400,
    quality: 80,
  },
  {
    input: "Co-founder(Maniyarasan).webp",
    output: "cofounder-maniyarasan.webp",
    width: 400,
    quality: 80,
  },
  {
    input: "employee_working.webp",
    output: "employee_working.webp",
    width: 1920,
    quality: 75,
  },
  {
    input: "horizontal-logo.png",
    output: "horizontal-logo.webp",
    width: 800,
    quality: 85,
  },
  {
    input: "logo_updated.png",
    output: "logo_updated.webp",
    width: 400,
    quality: 85,
  },
  {
    input: "PSM_WordMark.webp",
    output: "PSM_WordMark.webp",
    width: 800,
    quality: 85,
  },
  {
    input: "favicon.png",
    output: "favicon.webp",
    width: 512,
    quality: 90,
  },
];

async function optimizeImages() {
  console.log("Starting image optimization...\n");

  for (const config of imageConfigs) {
    const inputPath = path.join(IMAGES_DIR, config.input);
    const outputPath = path.join(OUTPUT_DIR, config.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${config.input} - file not found`);
      continue;
    }

    try {
      const stats = fs.statSync(inputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      
      await sharp(inputPath)
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: config.quality, effort: 6 })
        .toFile(outputPath);

      const outStats = fs.statSync(outputPath);
      const outSizeKB = (outStats.size / 1024).toFixed(1);
      const savings = ((1 - outStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`✅ ${config.input} (${sizeKB}KB) → ${config.output} (${outSizeKB}KB) - ${savings}% smaller`);
    } catch (error) {
      console.error(`❌ Error processing ${config.input}:`, error.message);
    }
  }

  console.log("\nOptimizing PNG solution images to WebP...");

  const solutionImages = [
    "1_solution.png",
    "2_solution.png",
    "3_solution.png",
    "4_solution.png",
    "5_solution.png",
    "6_solution.png",
  ];

  for (const img of solutionImages) {
    const inputPath = path.join(IMAGES_DIR, img);
    const outputName = img.replace(".png", ".webp");
    const outputPath = path.join(OUTPUT_DIR, outputName);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${img} - file not found`);
      continue;
    }

    try {
      const stats = fs.statSync(inputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      
      await sharp(inputPath)
        .resize(800, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const outStats = fs.statSync(outputPath);
      const outSizeKB = (outStats.size / 1024).toFixed(1);
      const savings = ((1 - outStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`✅ ${img} (${sizeKB}KB) → ${outputName} (${outSizeKB}KB) - ${savings}% smaller`);
    } catch (error) {
      console.error(`❌ Error processing ${img}:`, error.message);
    }
  }

  console.log("\n✨ Image optimization complete!");
  console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
}

optimizeImages().catch(console.error);