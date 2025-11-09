// config/appwrite.js
import { Client, Storage, Databases, Account, ID, Query } from 'https://esm.sh/appwrite@16.0.2';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('690cbc750001ae465885');

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export const BUCKET_ID = '690cbd9100161fe0ef26';
export const DATABASE_ID = '690cc2620003f3aa832a';
export const COLLECTION_ID = 'tests';

// Initialize Appwrite session (call this once at app start)
export const initAppwrite = async () => {
    try {
        // Try to get current session
        const user = await account.get();
        console.log('Already authenticated:', user.email || 'Anonymous');
        return user;
    } catch (error) {
        // No active session, create anonymous session
        try {
            const session = await account.createAnonymousSession();
            console.log('Anonymous session created:', session.$id);
            return session;
        } catch (sessionError) {
            console.error('Failed to create session:', sessionError);
            throw new Error('Could not establish connection to Appwrite');
        }
    }
};

// Upload test file + save metadata to database
export const uploadTest = async (file, className, subject, teacher, topic) => {
    try {
        // Step 1: Upload file to storage
        console.log('Uploading file:', file.name);
        const fileResponse = await storage.createFile(BUCKET_ID, ID.unique(), file);
        console.log('File uploaded:', fileResponse.$id);
        
        // Step 2: Save metadata to database
        console.log('Saving metadata...');
        const docResponse = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                class: className,
                subject: subject,
                teacher: teacher,
                topic: topic,
                fileId: fileResponse.$id,
                uploadedAt: new Date().toISOString()
            }
        );
        console.log('Metadata saved:', docResponse.$id);
        
        return { file: fileResponse, document: docResponse };
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};

// Get all tests for a specific class
export const getTestsForClass = async (className) => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('class', className)]
        );
        console.log(`Found ${response.documents.length} tests for ${className}`);
        return response.documents;
    } catch (error) {
        console.error('Failed to fetch tests:', error);
        throw error;
    }
};

// Get file download/view URL
export const getFileUrl = (fileId) => {
  return https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=690cbc750001ae465885;
};

// Delete test (both file and metadata)
export const deleteTest = async (documentId, fileId) => {
    try {
        // Delete file from storage
        await storage.deleteFile(BUCKET_ID, fileId);
        
        // Delete document from database
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
        
        console.log('Test deleted successfully');
    } catch (error) {
        console.error('Failed to delete test:', error);
        throw error;
    }
};
