import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createApplication as apiCreateApplication,
  uploadAttachment as apiUploadAttachment,
  deleteAttachment as apiDeleteAttachment,
  updateApplication,
  getApplicationAttachments,
} from "../api/applications";
import { getCall } from "../api/calls";
import { Call } from "../types/global";
import { Attachment } from "../types/application";
import { useToast } from "./ToastProvider";


interface ApplicationContextValue {
  call: Call | null;
  applicationId: string | null;
  attachments: Attachment[];
  createApplication: () => Promise<boolean>;
  uploadAttachment: (file: File) => Promise<boolean>;
  deleteAttachment: (id: string) => Promise<boolean>;
  submitApplication: () => Promise<boolean>;
}

const ApplicationContext = createContext<ApplicationContextValue>({
  call: null,
  applicationId: null,
  attachments: [],
  createApplication: async () => false,
  uploadAttachment: async () => false,
  deleteAttachment: async () => false,
  submitApplication: async () => false,
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
  const { show } = useToast();

  useEffect(() => {
    if (!callId) return;
    const fetchCall = async () => {
      try {
        const data = await getCall(callId);
        setCall(data);
      } catch {
        show("Failed to load call");
      }
    };
    fetchCall();
  }, [callId, show]);

  useEffect(() => {
    if (!applicationId) {
      localStorage.removeItem(`applicationId_${callId}`);
      setAttachments([]);
      return;
    }
    localStorage.setItem(`applicationId_${callId}`, applicationId);
    const fetchAttachments = async () => {
      try {
        const data = await getApplicationAttachments(applicationId);
        setAttachments(data);
      } catch {
        setAttachments([]);
        show("Failed to load attachments");
      }
    };
    fetchAttachments();
  }, [applicationId, callId, show]);

  const createApplication = async () => {
    if (applicationId) return true;
    try {
      const data = await apiCreateApplication(callId);
      setApplicationId(data.id as string);
      return true;
    } catch {
      show("Failed to create application");
      return false;
    }
  };

  const uploadAttachment = async (file: File) => {
    if (!applicationId) return false;
    try {
      const data = await apiUploadAttachment(applicationId, file);
      setAttachments((prev) => [...prev, data]);
      return true;
    } catch {
      show("Failed to upload file");
      return false;
    }
  };

  const deleteAttachment = async (id: string) => {
    try {
      await apiDeleteAttachment(id);
      setAttachments((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch {
      show("Failed to delete file");
      return false;
    }
  };

  const submitApplication = async () => {
    if (!applicationId) return false;
    try {
      await updateApplication(applicationId, {
        call_id: callId,
        status: "SUBMITTED",
      });
      return true;
    } catch {
      show("Failed to submit application");
      return false;
    }
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
