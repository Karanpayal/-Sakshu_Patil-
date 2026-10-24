import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student, TestResult, Test, getStudents, getTests } from './storage';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export function generateStudentReport(student: Student, results: TestResult[]) {
  const doc = new jsPDF();
  const tests = getTests();
  
  doc.setFontSize(20);
  doc.setTextColor(82, 125, 242);
  doc.text('SK_EXAM - Student Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 105, 28, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Student Details', 14, 42);
  
  doc.autoTable({
    startY: 46,
    head: [],
    body: [
      ['SK ID', student.skId],
      ['Roll No', student.rollNo],
      ['Name', student.name],
      ['Class', student.className],
      ['Mobile', student.mobile],
      ['Email', student.email || 'N/A'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [82, 125, 242] },
    styles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } },
  });
  
  doc.setFontSize(14);
  doc.text('Test Results', 14, (doc as any).lastAutoTable?.finalY + 15 || 120);
  
  const resultRows = results.map(r => {
    const test = tests.find(t => t.id === r.testId);
    return [
      test?.title || 'Unknown Test',
      test?.subject || '-',
      test?.date || '-',
      `${r.score}/${r.totalQuestions}`,
      `${r.percentage.toFixed(1)}%`,
      `#${r.rank}`,
    ];
  });
  
  doc.autoTable({
    startY: ((doc as any).lastAutoTable?.finalY || 120) + 20,
    head: [['Test', 'Subject', 'Date', 'Score', 'Percentage', 'Rank']],
    body: resultRows.length > 0 ? resultRows : [['No tests taken yet', '', '', '', '', '']],
    theme: 'striped',
    headStyles: { fillColor: [82, 125, 242] },
    styles: { fontSize: 9 },
  });
  
  const avgPercentage = results.length > 0
    ? results.reduce((sum, r) => sum + r.percentage, 0) / results.length
    : 0;
  
  const finalY = (doc as any).lastAutoTable?.finalY || 200;
  doc.setFontSize(12);
  doc.text(`Total Tests: ${results.length}`, 14, finalY + 15);
  doc.text(`Average Score: ${avgPercentage.toFixed(1)}%`, 14, finalY + 23);
  doc.text(`Best Rank: #${results.length > 0 ? Math.min(...results.map(r => r.rank)) : '-'}`, 14, finalY + 31);
  
  doc.save(`${student.skId}_${student.name}_Report.pdf`);
}

export function generateAllStudentsReport() {
  const doc = new jsPDF();
  const students = getStudents();
  const results = JSON.parse(localStorage.getItem('sk_results') || '[]') as TestResult[];
  
  doc.setFontSize(20);
  doc.setTextColor(82, 125, 242);
  doc.text('SK_EXAM - All Students Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 105, 28, { align: 'center' });
  
  const rows = students.map(s => {
    const studentResults = results.filter(r => r.studentId === s.id);
    const avgScore = studentResults.length > 0
      ? (studentResults.reduce((sum, r) => sum + r.percentage, 0) / studentResults.length).toFixed(1) + '%'
      : 'N/A';
    const testsTaken = studentResults.length.toString();
    const bestRank = studentResults.length > 0
      ? '#' + Math.min(...studentResults.map(r => r.rank))
      : 'N/A';
    
    return [s.skId, s.rollNo, s.name, s.className, testsTaken, avgScore, bestRank];
  });
  
  doc.autoTable({
    startY: 38,
    head: [['SK ID', 'Roll No', 'Name', 'Class', 'Tests', 'Avg Score', 'Best Rank']],
    body: rows.length > 0 ? rows : [['No students registered', '', '', '', '', '', '']],
    theme: 'striped',
    headStyles: { fillColor: [82, 125, 242] },
    styles: { fontSize: 9 },
  });
  
  doc.save('SK_EXAM_All_Students_Report.pdf');
}

export function generateTestResultPDF(test: Test, results: TestResult[]) {
  const doc = new jsPDF();
  const students = getStudents();
  
  doc.setFontSize(20);
  doc.setTextColor(82, 125, 242);
  doc.text('SK_EXAM - Test Results', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Test: ${test.title}`, 14, 35);
  doc.text(`Subject: ${test.subject}`, 14, 43);
  doc.text(`Date: ${test.date}`, 14, 51);
  doc.text(`Total Questions: ${test.questions.length}`, 14, 59);
  
  const rows = results.map(r => {
    const student = students.find(s => s.id === r.studentId);
    return [
      `#${r.rank}`,
      student?.skId || '-',
      student?.name || 'Unknown',
      student?.className || '-',
      `${r.score}/${r.totalQuestions}`,
      `${r.percentage.toFixed(1)}%`,
    ];
  });
  
  rows.sort((a, b) => parseInt(a[0].replace('#', '')) - parseInt(b[0].replace('#', '')));
  
  doc.autoTable({
    startY: 68,
    head: [['Rank', 'SK ID', 'Name', 'Class', 'Score', 'Percentage']],
    body: rows.length > 0 ? rows : [['No results yet', '', '', '', '', '']],
    theme: 'striped',
    headStyles: { fillColor: [82, 125, 242] },
    styles: { fontSize: 9 },
  });
  
  doc.save(`${test.title}_Results.pdf`);
}
