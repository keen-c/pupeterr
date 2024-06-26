import { launch } from "puppeteer";
import { resolve } from "path";

async function downloadPdfFromHtmlFile(htmlFilePath, outputPath) {
	const browser = await launch({ headless: "new" });
	const page = await browser.newPage();

	// Load HTML content from the file
	const absolutePath = resolve(htmlFilePath);
	await page.goto(`file://${absolutePath}`, { waitUntil: "networkidle0" });

	// Generate PDF from the page content
	await page.pdf({ path: outputPath, format: "A4" });

	// Close the browser
	await browser.close();
}
const inputHtmlFile = "index.html";
const outputFile = "downloaded_from_html.pdf";

downloadPdfFromHtmlFile(inputHtmlFile, outputFile)
	.then(() => console.log(`PDF downloaded successfully at: ${outputFile}`))
	.catch((error) => console.error("Error:", error));
