declare module "pdf-parse" {
  interface PDFPageMeta {
    /** page number (starting at 1) */
    pageIndex: number;
  }

  interface PDFData {
    /** number of pages */
    numpages: number;
    /** number of rendered pages */
    numrender: number;
    /** PDF meta information */
    info: Record<string, unknown>;
    /** PDF meta data */
    metadata: Record<string, unknown>;
    /** PDF text */
    text: string;
    /** PDF version */
    version: string;
  }

  function pdfParse(dataBuffer: Buffer | Uint8Array, options?: Record<string, unknown>): Promise<PDFData>;
  export = pdfParse;
}
