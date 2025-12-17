
import { PDFDocument } from 'pdf-lib';

/**
 * Retorna metadados básicos do PDF como número de páginas.
 */
export async function getPDFMetadata(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  return {
    pageCount: pdf.getPageCount(),
  };
}

/**
 * Mescla vários arquivos PDF em um só.
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
}

/**
 * Divide um PDF por intervalos específicos ou cada página individualmente.
 */
export async function splitPDF(file: File, ranges: string): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: Uint8Array[] = [];
  const totalPages = pdf.getPageCount();
  
  const parsedRanges = ranges.split(',').map(r => r.trim());
  
  for (const range of parsedRanges) {
    const newPdf = await PDFDocument.create();
    let pagesToCopy: number[] = [];
    
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        if (i > 0 && i <= totalPages) pagesToCopy.push(i - 1);
      }
    } else {
      const pageNum = Number(range);
      if (pageNum > 0 && pageNum <= totalPages) pagesToCopy.push(pageNum - 1);
    }
    
    if (pagesToCopy.length > 0) {
      const copiedPages = await newPdf.copyPages(pdf, pagesToCopy);
      copiedPages.forEach((page) => newPdf.addPage(page));
      results.push(await newPdf.save());
    }
  }
  
  return results;
}

/**
 * Utilitário para download de Uint8Array como arquivo
 */
export function downloadFile(data: Uint8Array, fileName: string) {
  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
