import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Records the usage of a template for a specific user in Firestore.
 * This prevents the user from using the same template more than once.
 */
export async function recordTemplateUsage(uid: string, templateId: string) {
  try {
    const usageRef = doc(db, 'customers', uid, 'usage', templateId);
    await setDoc(usageRef, {
      usedAt: serverTimestamp(),
      templateId: templateId
    }, { merge: true });
  } catch (error) {
    console.error("Error recording template usage:", error);
  }
}

/**
 * Records usage for a batch of templates.
 */
export async function recordBatchUsage(uid: string, templateIds: string[]) {
    const promises = templateIds.map(id => recordTemplateUsage(uid, id));
    await Promise.all(promises);
}
