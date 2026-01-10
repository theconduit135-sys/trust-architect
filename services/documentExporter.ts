import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

export async function exportToPdf(title: string, content: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25; // Standard 1 inch approx
  const maxLineWidth = pageWidth - margin * 2;
  
  // Set Font to Times New Roman style
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  
  // Centered Title
  doc.text(title.toUpperCase(), pageWidth / 2, margin, { align: "center" });
  
  // Content
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  
  // Split content by lines first to preserve explicit newlines
  const rawLines = content.split('\n');
  let cursorY = margin + 15;
  const lineHeight = 6;

  rawLines.forEach((rawLine) => {
    // Check if line looks like a header (All Caps and short)
    const isHeader = rawLine.trim().length > 0 && rawLine === rawLine.toUpperCase() && rawLine.length < 50;
    
    if (isHeader) {
        doc.setFont("times", "bold");
        cursorY += 4; // Extra space before header
    } else {
        doc.setFont("times", "normal");
    }

    const wrappedLines = doc.splitTextToSize(rawLine, maxLineWidth);

    wrappedLines.forEach((line: string) => {
      if (cursorY > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });
  });
  
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

export async function exportToDocx(title: string, content: string) {
  const paragraphs = content.split('\n').map(line => {
    const cleanLine = line.trim();
    
    // Heuristic: If line is all caps and not empty, treat as Heading/Emphasis
    const isHeader = cleanLine.length > 0 && cleanLine === cleanLine.toUpperCase() && /[A-Z]/.test(cleanLine);
    
    return new Paragraph({
        children: [new TextRun({
            text: line, // Keep original whitespace/indent if any
            bold: isHeader,
            font: "Times New Roman",
            size: 24, // 12pt
        })],
        spacing: {
            after: 120, // Small spacing between lines
        }
    });
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
            children: [new TextRun({ 
                text: title.toUpperCase(), 
                bold: true, 
                font: "Times New Roman",
                size: 28 
            })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        }),
        ...paragraphs
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.docx`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToMarkdown(title: string, content: string) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    a.click();
}