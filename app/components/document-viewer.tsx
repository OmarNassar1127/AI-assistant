"use client";
import React, { useRef, useState, useEffect } from "react";
import mammoth from "mammoth";
import styles from "./document-viewer.module.css";

type DocumentViewerProps = {
  chatId: number;
  highlightedQuotes: string[];
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  chatId,
  highlightedQuotes,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (docxContainerRef.current) {
      const docxContainer = docxContainerRef.current;
      highlightedQuotes.forEach((quote) => {
        const regex = new RegExp(quote, "g");
        docxContainer.innerHTML = docxContainer.innerHTML.replace(
          regex,
          `<span class="${styles.highlight}">${quote}</span>`
        );
      });
    }
  }, [highlightedQuotes]);

  const renderDOCX = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            styleMap: [
              "p[style-name='Normal'] => p",
              "h1 => h1",
              "h2 => h2",
              "h3 => h3",
              "h4 => h4",
              "h5 => h5",
              "h6 => h6",
              "img => img",
            ],
            convertImage: mammoth.images.imgElement((image) => {
              return image.read("base64").then((imageBuffer) => {
                return {
                  src: `data:${image.contentType};base64,${imageBuffer}`,
                };
              });
            }),
          }
        );
        if (docxContainerRef.current) {
          docxContainerRef.current.innerHTML = result.value;
          const images = docxContainerRef.current.querySelectorAll("img");
          images.forEach((img) => {
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.display = "block";
            img.style.margin = "10px 0";
          });

          highlightedQuotes.forEach((quote) => {
            const regex = new RegExp(quote, "g");
            docxContainerRef.current.innerHTML =
              docxContainerRef.current.innerHTML.replace(
                regex,
                `<span class="${styles.highlight}">${quote}</span>`
              );
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

    if (
      file?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      renderDOCX(file);
    }
  };

  return (
    <div className={styles.documentViewer}>
      <input type="file" onChange={handleFileChange} />
      {fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
        <div ref={docxContainerRef} className={styles.docxContainer}></div>
      )}
    </div>
  );
};

export default DocumentViewer;
