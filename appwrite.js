// appwrite.js
import { Client, Storage, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('690cbc750001ae465885');

export const storage = new Storage(client);
export const databases = new Databases(client);

export const BUCKET_ID = '690cbd9100161fe0ef26';
export const DATABASE_ID = '690cc2620003f3aa832a'; 
export const COLLECTION_ID = 'tests';         // Create this collection

// Upload file + save metadata
export const uploadTest = async (file, className, subject, teacher, topic) => {
    const fileResponse = await storage.createFile(BUCKET_ID, ID.unique(), file);
    
    await databases.createDocument(
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
    
    return fileResponse;
};

// Get all tests for a class
export const getTestsForClass = async (className) => {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('class', className)]
    );
    return response.documents;
};
