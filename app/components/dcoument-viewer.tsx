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
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  const renderPDF = (file: File) => {
    const url = URL.createObjectURL(file);
    pdfjsLib.getDocument(url).promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = pdfCanvasRef.current;
        const context = canvas?.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
          canvasContext: context,
          viewport,
        });
      });
    });
  };

  const renderDOCX = (file: File) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        mammoth.convertToHtml({ arrayBuffer })
          .then((result) => {
            const docxContainer = docxContainerRef.current;
            if (docxContainer) {
              docxContainer.innerHTML = result.value;
            }
          })
          .catch((err) => console.error(err));
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
        <canvas ref={pdfCanvasRef} className={styles.pdfCanvas}></canvas>
      )}
      {fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
        <div ref={docxContainerRef} className={styles.docxContainer}></div>
      )}
    </div>
  );
};

export default DocumentViewer;
