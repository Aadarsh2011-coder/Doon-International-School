import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("690cbc750001ae465885");

const storage = new Storage(client);

export const uploadPDF = async (file) => {
  return await storage.createFile(
    "690cbd9100161fe0ef26",
    ID.unique(),
    file
  );
};

export const downloadPDF = (fileId) => {
  return storage.getFileDownload("690cbd9100161fe0ef26", fileId);
};

export default storage;
