
import sharp from "sharp";
import fs from "fs";
import path from "path";
import ttf2woff2 from "ttf2woff2";

const paths = {
  img: {
    in: "src/assets/img/raw",
    out: "src/assets/img/webp",
  },
  fonts: {
    in: "src/assets/fonts/raw",
    out: "src/assets/fonts/woff2",
  },
};

// Creating folders
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Cleaning folders before build
const cleanOutputDirs = () => {
  [paths.img.out, paths.fonts.out].forEach((dir) => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        //Do not delete hidden files like .gitkeep if they exist.
        if (file !== ".gitkeep") {
          fs.unlinkSync(path.join(dir, file));
        }
      }
    }
  });
  console.log("🧹 Output folders cleaned (webp & woff2)");
};

// 1. Image conversion
async function convertImages() {
  ensureDir(paths.img.out);
  const files = fs.readdirSync(paths.img.in);

  for (const file of files) {
    if (/\.(png|jpe?g|tif)$/i.test(file)) {
      const fileName = path.parse(file).name;
      await sharp(`${paths.img.in}/${file}`)
        .webp({ quality: 80 })
        .toFile(`${paths.img.out}/${fileName}.webp`);
      console.log(`✅ Image: ${file} -> webp`);
    }
  }
}

// 2. Font conversion
function convertFonts() {
  ensureDir(paths.fonts.out);
  const files = fs.readdirSync(paths.fonts.in);

  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === ".ttf") {
      const input = fs.readFileSync(path.join(paths.fonts.in, file));
      const fileName = path.parse(file).name;
      fs.writeFileSync(
        path.join(paths.fonts.out, `${fileName}.woff2`),
        ttf2woff2(input),
      );
      console.log(`✅ Font: ${file} -> woff2`);
    }
  });
}

// Running the entire process
(async () => {
  console.log("🚀 Starting assets preparation...");
  try {
    // First, we clean out the old
    cleanOutputDirs();

    // Then we generate a new one
    await convertImages();
    convertFonts();

    console.log(" All assets are ready!");
  } catch (err) {
    console.error("❌ Error during preparation:", err);
  }
})();














