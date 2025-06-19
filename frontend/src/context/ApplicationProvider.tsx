import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createApplication as apiCreateApplication,
  uploadAttachment as apiUploadAttachment,
  deleteAttachment as apiDeleteAttachment,
  updateApplication,
  getApplicationAttachments,
} from "../lib/api/applications";
import { getCall } from "../lib/api/calls";
import { Call } from "../types";
import { Attachment } from "../types/application";


interface ApplicationContextValue {
  call: Call | null;
  applicationId: string | null;
  attachments: Attachment[];
  createApplication: () => Promise<void>;
  uploadAttachment: (file: File) => Promise<void>;
  deleteAttachment: (id: string) => Promise<void>;
  submitApplication: () => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextValue>({
  call: null,
  applicationId: null,
  attachments: [],
  createApplication: async () => {},
  uploadAttachment: async () => {},
  deleteAttachment: async () => {},
  submitApplication: async () => {},
});

export function useApplication() {
  return useContext(ApplicationContext);
}

export function ApplicationProvider({
  callId,
  children,
}: {
  callId: string;
  children: ReactNode;
}) {
  const [call, setCall] = useState<Call | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(() =>
    localStorage.getItem(`applicationId_${callId}`)
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    if (callId) {
      getCall(callId)
        .then(setCall)
        .catch(() => {});
    }
  }, [callId]);

  useEffect(() => {
    if (!applicationId) {
      localStorage.removeItem(`applicationId_${callId}`);
      setAttachments([]);
      return;
    }
    localStorage.setItem(`applicationId_${callId}`, applicationId);
    getApplicationAttachments(applicationId)
      .then(setAttachments)
      .catch(() => setAttachments([]));
  }, [applicationId, callId]);

  const createApplication = async () => {
    if (applicationId) return;
    const data = await apiCreateApplication(callId);
    setApplicationId(data.id as string);
  };

  const uploadAttachment = async (file: File) => {
    if (!applicationId) return;
    const data = await apiUploadAttachment(applicationId, file);
    setAttachments((prev) => [...prev, data]);
  };

  const deleteAttachment = async (id: string) => {
    await apiDeleteAttachment(id);
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const submitApplication = async () => {
    if (!applicationId) return;
    await updateApplication(applicationId, {
      call_id: callId,
      status: "SUBMITTED",
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        call,
        applicationId,
        attachments,
        createApplication,
        uploadAttachment,
        deleteAttachment,
        submitApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
