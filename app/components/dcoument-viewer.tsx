"use client";

import React, { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import styles from "./document-viewer.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type DocumentViewerProps = {
  chatId: number;
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ chatId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  const renderPDF = async (file: File) => {
    const url = URL.createObjectURL(file);
    const pdf = await pdfjsLib.getDocument(url).promise;
    if (pdfContainerRef.current) {
      pdfContainerRef.current.innerHTML = ''; 
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        pdfContainerRef.current.appendChild(canvas);
      }
    }
  };

  const renderDOCX = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        const result = await mammoth.convertToHtml({ arrayBuffer }, {
          styleMap: [
            "p[style-name='Normal'] => p",
            "h1 => h1",
            "h2 => h2",
            "h3 => h3",
            "h4 => h4",
            "h5 => h5",
            "h6 => h6",
            "img => img"
          ],
          convertImage: mammoth.images.imgElement((image) => {
            return image.read("base64").then((imageBuffer) => {
              return {
                src: `data:${image.contentType};base64,${imageBuffer}`,
              };
            });
          }),
        });
        if (docxContainerRef.current) {
          docxContainerRef.current.innerHTML = result.value;
          // Ensure images are styled correctly
          const images = docxContainerRef.current.querySelectorAll('img');
          images.forEach((img) => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '10px 0';
          });
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFile(file);
    setFileType(file?.type);

    if (file?.type === "application/pdf") {
      renderPDF(file);
    } else if (
      file?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      renderDOCX(file);
    }
  };

  return (
    <div className={styles.documentViewer}>
      <input type="file" onChange={handleFileChange} />
      {fileType === "application/pdf" && (
        <div ref={pdfContainerRef} className={styles.pdfContainer}></div>
      )}
      {fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
        <div ref={docxContainerRef} className={styles.docxContainer}></div>
      )}
    </div>
  );
};

export default DocumentViewer;
