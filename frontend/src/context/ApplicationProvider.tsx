import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiFetch } from "../lib/api";

interface Call {
  id: string;
  title?: string;
  description?: string | null;
}

interface Attachment {
  id: string;
  doc_name: string;
}

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
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    if (callId) {
      apiFetch(`/calls/${callId}`)
        .then(setCall)
        .catch(() => {});
    }
  }, [callId]);

  const createApplication = async () => {
    if (applicationId) return;
    const data = await apiFetch(`/applications/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_id: callId }),
    });
    setApplicationId(data.id as string);
  };

  const uploadAttachment = async (file: File) => {
    if (!applicationId) return;
    const formData = new FormData();
    formData.append("upload", file);
    const data = await apiFetch(
      `/applications/${applicationId}/upload_file`,
      {
        method: "POST",
        body: formData,
      }
    );
    setAttachments((prev) => [...prev, data]);
  };

  const deleteAttachment = async (id: string) => {
    await apiFetch(`/attachments/${id}`, { method: "DELETE" });
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const submitApplication = async () => {
    if (!applicationId) return;
    await apiFetch(`/applications/${applicationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ call_id: callId, status: "SUBMITTED" }),
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
