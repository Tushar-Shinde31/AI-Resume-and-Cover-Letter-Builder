import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// PDF Generation
export const generatePDF = async (contentRef, fileName = 'document') => {
  try {
    // Capture the content as an image using html2canvas
    const canvas = await html2canvas(contentRef, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    // Calculate dimensions to fit the page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName.toLowerCase().replace(/\s+/g, '-')}.pdf`);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Save draft to Firestore
export const saveDraft = async (content, type) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const draftData = {
      userId: user.uid,
      content,
      type,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    const draftsCollection = collection(db, 'drafts');
    const docRef = await addDoc(draftsCollection, draftData);

    return { success: true, id: docRef.id, message: 'Draft saved successfully' };
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
};

// Update existing draft
export const updateDraft = async (draftId, content) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const draftRef = doc(db, 'drafts', draftId);
    await updateDoc(draftRef, {
      content,
      lastUpdated: new Date().toISOString(),
    });

    return { success: true, message: 'Draft updated successfully' };
  } catch (error) {
    console.error('Error updating draft:', error);
    throw error;
  }
};
