// script.js

document.getElementById("invoiceForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const studentName = document.getElementById("studentName").value;
  const parentName = document.getElementById("parentName").value;
  const phone = document.getElementById("phone").value;
  const courseType = document.getElementById("courseType").value;
  const fees = document.getElementById("fees").value;

  // Generate PDF using jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Header Section
  doc.setFillColor(0);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("codeNest Bootcamp Invoice", 105, 20, { align: "center" });

  // Invoice Details
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.rect(10, 40, 190, 90);

  let y = 50;
  const lineHeight = 10;

  doc.text("Invoice Date:", 15, y);
  doc.text(date, 80, y); y += lineHeight;

  doc.text("Student Name:", 15, y);
  doc.text(studentName, 80, y); y += lineHeight;

  doc.text("Parent Name:", 15, y);
  doc.text(parentName, 80, y); y += lineHeight;

  doc.text("Phone Number:", 15, y);
  doc.text(phone, 80, y); y += lineHeight;

  doc.text("Course Type:", 15, y);
  doc.text(courseType, 80, y); y += lineHeight;

  doc.text("Fees Paid:", 15, y);
  doc.text(`Rs. ${fees}`, 80, y); y += lineHeight;

  // Footer Section
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for enrolling in codeNest Bootcamp!", 105, 150, { align: "center" });

  doc.save(`${studentName}_Invoice.pdf`);

  // Send data to Google Form
  const formData = new FormData();
  formData.append("entry.1504846741", studentName);
  formData.append("entry.1660029606", parentName);
  formData.append("entry.225457930", phone);
  formData.append("entry.659575146_year", date.split("-")[0]);
  formData.append("entry.659575146_month", date.split("-")[1]);
  formData.append("entry.659575146_day", date.split("-")[2]);
  formData.append("entry.1424909569", courseType);
  formData.append("entry.1752753602", fees);

try {
  await fetch("https://docs.google.com/forms/d/e/1FAIpQLSemtRk1hy5q2qCAolNN1fot1dx6NxIqk1NK4H5Oi8NLbwqgAA/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
  alert("Invoice generated and data submitted successfully!");
} catch (error) {
  alert("Failed to submit data to Google Form.");
  console.error(error);
}

});